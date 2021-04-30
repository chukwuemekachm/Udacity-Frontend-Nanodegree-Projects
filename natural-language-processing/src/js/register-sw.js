export function registerSW() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register("/sw.js").then(function () {
    console.log("Service worker registered and ready for use!");
  });
}
