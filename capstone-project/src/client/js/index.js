import { registerSW } from './register-sw';
import {
  planTripButton,
  closeDialog,
  toggleDialog,
  form,
  handleTripSubmit,
  updateBackgroundImage,
  newTripContainer,
  handleSaveTrip,
} from './main';

updateBackgroundImage();
planTripButton.addEventListener('click', () => toggleDialog(true));
closeDialog.addEventListener('click', () => toggleDialog());
form.addEventListener('submit', handleTripSubmit);
newTripContainer.addEventListener('click', handleSaveTrip);

registerSW();
