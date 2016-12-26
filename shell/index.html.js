(function () {
  const electron = require('electron')
  const robotjs = require('robotjs')

  const {getCurrentWindow, Menu, globalShortcut} = electron.remote

  setupMenu()
  setupGlobalShortcuts()

  function setupMenu () {
    getCurrentWindow().setMenu(Menu.buildFromTemplate([
      {
        label: 'Window',
        submenu: [
          {role: 'toggledevtools'},
          {accelerator: 'CmdOrCtrl+W', role: 'close', visible: false},
        ],
      },
    ]))
  }

  function setupGlobalShortcuts () {
    globalShortcut.unregisterAll()
    globalShortcut.register('Ctrl+Alt+/', () => {
      robotjs.keyTap('menu')
    })
  }
})()
