(function () {
  const electron = require('electron')
  const robotjs = require('robotjs')

  const {getCurrentWindow, Menu, globalShortcut} = electron.remote

  setupMenu()
  setupGlobalShortcuts()

  function setupMenu () {
    getCurrentWindow().setMenu(Menu.buildFromTemplate([
      {accelerator: 'CmdOrCtrl+R', role: 'reload'},
      {accelerator: 'CmdOrCtrl+Shift+J', role: 'toggledevtools'},
      {accelerator: 'CmdOrCtrl+W', role: 'close'},
    ]))
  }

  function setupGlobalShortcuts () {
    globalShortcut.unregisterAll()
    globalShortcut.register('Ctrl+Alt+/', () => {
      robotjs.keyTap('menu')
    })
  }
})()
