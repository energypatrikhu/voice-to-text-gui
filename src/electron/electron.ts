import { app, BrowserWindow, ipcMain } from 'electron';
import electronContextMenu from 'electron-context-menu';
import electronServe from 'electron-serve';
import electronWindowState from 'electron-window-state';
import { join } from 'path';

import { EventRouter } from './libs/event-router.js';

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

const serveURL = electronServe({
	directory: '.',
});

const port = process.env.PORT || 5173;
const isDev = !app.isPackaged || process.env.NODE_ENV == 'dev';
// const isDev = false;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
	let windowState = electronWindowState({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	mainWindow = new BrowserWindow({
		backgroundColor: 'black',
		titleBarStyle: 'default',
		autoHideMenuBar: false,
		minWidth: 800,
		minHeight: 600,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: true,
			preload: join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	});

	// if (!isDev) mainWindow.removeMenu();
	// else mainWindow.webContents.openDevTools();
	mainWindow.webContents.openDevTools();

	windowState.manage(mainWindow);
	mainWindow.on('close', () => {
		windowState.saveState(mainWindow!);
	});

	return mainWindow;
}

electronContextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
	showCopyLink: true,
	showSelectAll: true,
	showInspectElement: false,
});

function loadVite(port: any) {
	mainWindow!.loadURL(`http://localhost:${port}`).catch((e) => {
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

	if (isDev) loadVite(port);
	else await serveURL(mainWindow);

	new EventRouter(ipcMain, mainWindow!, isDev);
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

// process.on('uncaughtException', function (err: Buffer) {
// 	dialog.showErrorBox('Error - uncaughtException', err.toString());
// 	process.exit(1);
// });
// process.on('uncaughtExceptionMonitor', function (err: Buffer) {
// 	dialog.showErrorBox('Error - uncaughtExceptionMonitor', err.toString());
// 	process.exit(1);
// });
// process.on('unhandledRejection', function (err: Buffer) {
// 	dialog.showErrorBox('Error - unhandledRejection', err.toString());
// 	process.exit(1);
// });
