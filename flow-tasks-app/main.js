const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 850,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hiddenInset', // Makes Mac window look clean with Apple-style rounded corners
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // FlowTasks HTML file mapped in Electron
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // macOS re-create window when dock icon clicked
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  // macOS typically leaves the app running until cmd+q
  if (process.platform !== 'darwin') app.quit();
});
