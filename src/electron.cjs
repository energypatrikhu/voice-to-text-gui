const { app, BrowserWindow, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const windowStateManager = require('electron-window-state');
const { readFileSync, appendFileSync, existsSync, mkdirSync } = require('fs');
const { resolve, join } = require('path');
const { EOL } = require('os');

const { ChromeInstance } = require('./chrome-instance.cjs');
const { SpeechRecognitionEngine } = require('./speech-recognition-engine.cjs');
const { SpeechSynthesisEngine } = require('./speech-synthesis-engine.cjs');

const packageJsonFile = JSON.parse(readFileSync('./package.json', 'utf-8'));

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const isdev = !app.isPackaged || process.env.NODE_ENV == 'dev';

const logsPath = resolve('logs');
if (!existsSync(logsPath)) {
	mkdirSync(logsPath, { recursive: true });
}

/**
 * @type {BrowserWindow | any}
 */
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	mainWindow = new BrowserWindow({
		backgroundColor: 'black',
		titleBarStyle: 'default',
		autoHideMenuBar: false,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: isdev || true,
			preload: join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	if (!isdev) mainWindow.removeMenu();
	else mainWindow.webContents.openDevTools();

	windowState.manage(mainWindow);

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	showCopyLink: true,
	showSelectAll: true,
	showInspectElement: false,
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

async function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (isdev) loadVite(port);
	else await serveURL(mainWindow);

	ipcMain.on('electron', async (_, { event, data }) => {
		console.log('electron:main', { event, data });

		switch (event) {
			case 'ready': {
				if (!isdev) {
					const chromeInstance = new ChromeInstance(isdev);
					const chromePage = await chromeInstance.initPage();

					new SpeechRecognitionEngine(ipcMain, mainWindow, chromePage);

					if (data.synthesis) {
						new SpeechSynthesisEngine(ipcMain, mainWindow, chromePage);
					}
				}

				mainWindow.webContents.send('electron', {
					event,
					data: {
						electronVersion: app.getVersion(),
						version: packageJsonFile.version,
					},
				});
				break;
			}
			case 'log': {
				if (isdev) return;

				appendFileSync(join(logsPath, data.filename), ['[' + data.type + ']', '[' + data.timestamp + ']', '[' + data.severity + ']', EOL, ...data.textArray, EOL].join(' '));
				break;
			}
		}
	});
}

app.once('ready', createMainWindow);
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
