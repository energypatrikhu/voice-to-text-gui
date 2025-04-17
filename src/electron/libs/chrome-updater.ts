import axios from "axios";
import { createWriteStream, existsSync, renameSync, rmSync } from "fs";
import { join } from "path";

import { parseXml } from "@rgrove/parse-xml";

import { extractArchive } from "./7z.js";
import { __app } from "./app.js";
import { saveManifest } from "./manifest.js";

const listOfUnnecessaryFiles = [
  "default_apps",
  "Extensions",
  "MEIPreload",
  "VisualElements",
  "WidevineCdm",
  "chrome.dll.sig",
  "chrome.exe.sig",
  "chrome_pwa_launcher.exe",
  "chrome_wer.dll",
  "dxcompiler.dll",
  "dxil.dll",
  "elevation_service.exe",
  "eventlog_provider.dll",
  "files.txt",
  "mojo_core.dll",
  "notification_helper.exe",
  "optimization_guide_internal.dll",
  "vk_swiftshader_icd.json",
  "vulkan-1.dll",
];

function cleanupChromeFiles() {
  const filesToDelete = [
    "chrome",
    "Chrome-bin",
    "chrome-installer.exe",
    "chrome.7z",
  ];

  for (const file of filesToDelete) {
    if (existsSync(join(__app.resources, file))) {
      rmSync(join(__app.resources, file), { force: true, recursive: true });
    }
  }
}

function getLatestChrome() {
  try {
    __app.console.log(__app.translations.firstStart.chrome.check);

    const updateUrl = "https://update.googleapis.com/service/update2";
    const updateXML = `<?xml version="1.0" encoding="UTF-8"?><request protocol="3.0"><os platform="win" version="10.0.22635.3061" arch="x64"/><app appid="{8A69D345-D564-463C-AFF1-A69D9E530F96}" version=""><updatecheck/></app></request>`;

    const axiosResponse = axios({
      url: updateUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/xml",
        "User-Agent": "Google Update/1.3.36.352;winhttp;cup-ecdsa",
        "X-Goog-Update-AppId": "{8A69D345-D564-463C-AFF1-A69D9E530F96}",
        "X-Goog-Update-Updater": "Omaha-1.3.36.352",
      },
      data: updateXML,
      responseType: "text",
    });

    axiosResponse.catch(function (reason) {
      __app.console.debugErrorLog(reason.message ?? reason);
    });

    return new Promise<{
      urls: Array<string>;
      version: string;
      filename: string;
      filesize: number;
    }>((promiseResolve) => {
      axiosResponse.then(function (response) {
        const parsedXml: any = parseXml(response.data).toJSON();

        const xml_response = parsedXml.children[0];

        const xml_app = xml_response.children[1];

        const xml_updatecheck = xml_app.children[0];

        const xml_urls = xml_updatecheck.children[0];
        const xml_url = xml_urls.children.map(
          (_url: any) => _url.attributes.codebase,
        );

        const xml_manifest = xml_updatecheck.children[1];
        const xml_version = xml_manifest.attributes.version;

        const xml_packages = xml_manifest.children[1];

        const xml_package = xml_packages.children[0];
        const xml_name = xml_package.attributes.name;
        const xml_size = xml_package.attributes.size;

        promiseResolve({
          urls: xml_url,
          version: xml_version,
          filename: xml_name,
          filesize: xml_size,
        });
      });
    });
  } catch (error: any) {
    __app.console.errorLog(__app.translations.firstStart.chrome.fail);
    __app.console.debugErrorLog(error.message ?? error);
    throw error;
  }
}

async function chromeDownloader() {
  if (!__app.manifest.isFirstStart && !__app.config.update.checkChromeUpdates) {
    return null;
  }

  try {
    const chromeData = await getLatestChrome();
    __app.console.debugLogJson(chromeData);
    __app.console.debugLog("Old Chrome version:", __app.manifest.chromeVersion);

    const chromeFilePath = join(__app.resources, "chrome-installer.exe");

    if (
      chromeData.version === __app.manifest.chromeVersion &&
      !__app.manifest.isFirstStart
    ) {
      return { filename: chromeFilePath, version: chromeData.version };
    }

    __app.console.log(__app.translations.firstStart.chrome.update);

    cleanupChromeFiles();

    return new Promise<{ filename: string; version: string }>(
      async (promiseResolve) => {
        for (const chromeDownloadUrl of chromeData.urls) {
          try {
            const axiosResponse = await axios({
              url: chromeDownloadUrl + chromeData.filename,
              method: "GET",
              headers: {
                "Accept": "*",
                "Accept-Encoding": "*",
                "User-Agent": "Google Update/1.3.36.352;winhttp;cup-ecdsa",
              },
              responseType: "stream",
            });

            const chromeFileStream = createWriteStream(chromeFilePath);
            axiosResponse.data.pipe(chromeFileStream);

            await new Promise<void>((r) => {
              chromeFileStream.on("finish", function () {
                chromeFileStream.close();
                r();
              });
            });

            return promiseResolve({
              filename: chromeFilePath,
              version: chromeData.version,
            });
          } catch (error: any) {
            __app.console.errorLog(__app.translations.firstStart.chrome.fail);
            __app.console.debugErrorLog(error.message ?? error);
          }
        }
      },
    );
  } catch (error: any) {
    __app.console.errorLog(__app.translations.firstStart.chrome.fail);
    __app.console.debugErrorLog(error.message ?? error);
    throw error;
  }
}

export async function chromeUpdater() {
  try {
    const chromeData = await chromeDownloader();

    if (!chromeData) {
      return;
    }

    if (
      chromeData.version === __app.manifest.chromeVersion &&
      !__app.manifest.isFirstStart
    ) {
      __app.console.log(__app.translations.firstStart.chrome.no_update);
      return;
    }

    extractArchive(chromeData.filename);
    rmSync(chromeData.filename, { force: true, recursive: true });

    const chromeArchive = join(__app.resources, "chrome.7z");
    extractArchive(chromeArchive);
    rmSync(chromeArchive, { force: true, recursive: true });

    const chromePath = join(__app.resources, "chrome");
    renameSync(join(__app.resources, "Chrome-bin"), chromePath);

    for (const file of ["chrome_proxy.exe"]) {
      rmSync(join(chromePath, file), { force: true, recursive: true });
    }

    for (const file of listOfUnnecessaryFiles) {
      rmSync(join(chromePath, chromeData.version, file), {
        force: true,
        recursive: true,
      });
    }

    await saveManifest({ chromeVersion: chromeData.version });

    __app.console.log(__app.translations.firstStart.chrome.done);
  } catch (error: any) {
    __app.console.errorLog(__app.translations.firstStart.chrome.fail);
    __app.console.debugErrorLog(error.message ?? error);
    throw error;
  }
}
