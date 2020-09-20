const {app, Menu, Tray, BrowserWindow} = require('electron')
const path = require('path')


let tray = null
app.whenReady().then(() => {
  tray = new Tray('assets/icons/tray.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', click: openApp }
  ])

  tray.on("click", openApp)
  tray.on("double-click", reloadApp)
})

let activeWindow

function createWindow () {
  console.log("Create window")
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  let bounds = mainWindow.getBounds();
  bounds.y = 40
  bounds.x = bounds.x + 480
  mainWindow.setBounds(bounds)
  mainWindow.loadFile('apps/index.html')
  mainWindow.webContents.openDevTools()

  return mainWindow
}

function reloadApp() {
  console.log("reload app")
  if (activeWindow !== undefined && !activeWindow.isDestroyed()){
    activeWindow.destroy()
  }
  openApp()
}

function openApp() {
  if (activeWindow === undefined || activeWindow.isDestroyed()) {
    activeWindow = createWindow()
  } else {
    activeWindow.show()
  }

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
