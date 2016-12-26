'use strict'
const path = require('path')
const electron = require('electron')
const electronDebug = require('electron-debug')
const packageJson = require('../package.json')

const {app, Tray, Menu, BrowserWindow} = electron
const {title, name} = packageJson
const iconPath = path.join(__dirname, 'icon.ico')

electronDebug({showDevTools: 'right'})
process.title = title
app.setName(title)
app
  .on('ready', start)
  .on('activate', start)
  // .on('window-all-closed', () => {}) // Disable default behavior of exiting program (when all windows are closed)

/* --------------------------------------------- */

let tray
let trayMenu
let mainWindow

function start () {
  createTray()
  createMainWindow()
}

function stop () {
  destroyTray()
  destroyMainWindow()
  app.quit()
}

function createTray () {
  if (!tray) {
    tray = new Tray(iconPath)
    tray.setToolTip(title)
    tray.on('click', () => toggleMainWindowVisibile(true))
    trayMenu = Menu.buildFromTemplate([
      {label: 'Visible', type: 'checkbox', click: () => toggleMainWindowVisibile()},
      {type: 'separator'},
      {label: 'Reload', click: reloadMainWindow},
      {type: 'separator'},
      {label: 'Quit', click: stop},
    ])
    tray.setContextMenu(trayMenu)
  }
}

function destroyTray () {
  if (tray) {
    tray.destroy()
    tray = null
  }
}

function createMainWindow () {
  if (!mainWindow) {
    mainWindow = new BrowserWindow({
      show: false,
      icon: iconPath,
      width: 1600,
      height: 800,
    })

    mainWindow.setAppDetails({
      appId: `${name} 2`, // added the " 2" since some previous windows app settings are cached in my environment (don't know how to clear it)
      appIconPath: iconPath,
      relaunchCommand: path.join(__dirname, '..', 'run.cmd'),
      relaunchDisplayName: title,
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('close', event => {
      if (mainWindow) {
        event.preventDefault()
        toggleMainWindowVisibile(false)
      }
    })
  }
}

function toggleMainWindowVisibile (visible = null) {
  if (visible === null) {
    visible = !mainWindow.isVisible()
  }
  trayMenu.items.find(item => item.label === 'Visible').checked = visible
  mainWindow[visible ? 'show' : 'hide']()
}

function reloadMainWindow () {
  mainWindow.reload()
}

function destroyMainWindow () {
  if (mainWindow) {
    mainWindow.close()
    mainWindow = null
  }
}
