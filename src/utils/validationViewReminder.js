import { openReminderForm } from "../stores/store";

const editButtons = document.querySelectorAll('#btn-editar');

const handleEditReminder = () => {
  openReminderForm.set(true);
}

// abrir desde los botones editar de las vistas, la card de tarea
editButtons.forEach((button) => {
  button.addEventListener('click', handleEditReminder);
});
