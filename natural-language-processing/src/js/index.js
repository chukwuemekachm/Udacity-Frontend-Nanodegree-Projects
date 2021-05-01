import { registerSW } from './register-sw';
import { handleFormSubmit } from './main';

form.addEventListener('submit', handleFormSubmit);
registerSW();
