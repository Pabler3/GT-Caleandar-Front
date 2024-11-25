import { openReminderForm } from "../stores/store";
import { resetFrequencyForm } from "./frecuencySelect";
import { bigReminder } from "../stores/store";

const modal = document.querySelector(".modal");
const cancelModal = document.getElementById('cancelBtn');
const closeModal = document.getElementById('closeBtn');
const reminderButtons = document.querySelectorAll('.new-reminder');
const submitForm = document.getElementById('submit-btn');

const handleCloseModal = () => {
    openReminderForm.set(false);
    resetFrequencyForm();
};

const handleOpenBigReminder = () => {
  submitForm.classList.remove('hidden')
  bigReminder.set(true);
}

cancelModal.addEventListener('click', handleCloseModal);
closeModal.addEventListener('click', handleCloseModal);
submitForm.addEventListener('click', handleOpenBigReminder);

reminderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        openReminderForm.set(true);
        button.blur();
    });
});

openReminderForm.listen(() => {
    if (openReminderForm.get() === true) {
        modal.classList.add('is-active');
    } else {
        modal.classList.remove('is-active');
    }
});
