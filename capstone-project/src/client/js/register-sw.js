// eslint-disable-next-line import/prefer-default-export
export function registerSW() {
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service worker registered and ready for use!');
  });
}
