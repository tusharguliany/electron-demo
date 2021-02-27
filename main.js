const { app, BrowserWindow, ipcMain, dialog, ipcRenderer } = require('electron')

const createWindow = () => {

    const window = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        title: 'Electron Demo',
        frame: true
    })
    window.loadFile('index.html')

    window.on('closed', () => {
        app.quit()
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

ipcMain.on('performActions', (event, args) => {
    dialog.showMessageBox({
        title: 'Your Details',
        message: 'Full Name : ' + args.firstName + ' ' + args.lastName
    });
})