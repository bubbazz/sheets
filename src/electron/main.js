const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    // dev 
    //win.loadURL('http://localhost:4200/')
    win.loadFile(__dirname + "/index.html")
}
function createPython() {
    console.log("YOOOOOOOOOOOO");
    console.log(__dirname + "/websocket/python/websocketServer.py")
    var subpy = require("child_process").spawn("python", [__dirname + "/websocket/python/websocketServer.py", __dirname + "/websocket/python/"])
    subpy.stdout.on('data', data => console.log('python stdout:' + data))
    subpy.stderr.on('data', data => console.log('python stderr:' + data))
}
app.whenReady().then(() => {
    createPython()
    createWindow()
    // MacOX
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    app.on('close')
})
// MacOX
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})