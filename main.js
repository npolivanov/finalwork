const { app, BrowserWindow, dialog } = require("electron");
const startServer = require("./server");
function createWindow() {
  // Создаем окно браузера.
  let win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  startServer();
  // и загрузить index.html приложения.
  win.loadFile("app/build/index.html");
}
app.whenReady().then(createWindow);
