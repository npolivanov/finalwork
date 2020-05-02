const { app, BrowserWindow, dialog } = require("electron");

function createWindow() {
  // Создаем окно браузера.
  let win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // и загрузить index.html приложения.
  win.loadFile("app/build/index.html");
}
app.whenReady().then(createWindow);
