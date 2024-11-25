import validateForm from "../utils/validationForm";
import sendFormData from "./sendFormData";
import { getFrequencyData, resetFrequencyForm } from "../utils/frecuencySelect";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("taskForm");
    form.addEventListener("submit", handleFormSubmit);
});

// Función para manejar el envío del formulario
export async function handleFormSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const form = document.getElementById("taskForm");
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const formError = document.getElementById("formError");
    const modal = document.querySelector(".modal");
    const viewTasks = document.querySelector('.parent');

    const participants = data.participants
        ? data.participants.split(',').map((item) => item.trim())
        : [];

    const frequencyData = getFrequencyData();

    const requestData = {
        ...data,
        dayEnd: data.dayEnd || null,
        participants,
        frequencyData,
    };

    try {
        await sendFormData(requestData);
        formError.textContent = "";
        resetFrequencyForm();
        form.reset();
         // ocultar el modal de tarea
         modal.classList.remove('is-active');
         // ocultar la vista de la lista de tareas
         viewTasks.classList.add('hidden');
         const successSaveModal = document.getElementById('myModal');
        // mostrar el modal de confirmación de tarea guardada con éxito
        successSaveModal.classList.add("is-active")
        setTimeout(() => {
          successSaveModal.classList.remove("is-active")
          viewTasks.classList.remove('hidden')
        }, 3000);
    } catch (error) {
        if (error.message === "No estás autenticado.") {
            formError.textContent = "Por favor, inicia sesión para crear un recordatorio.";
        } else if (error.message) {
            formError.textContent = error.message;
        } else {
            formError.textContent = "Hubo un error al enviar el formulario. Inténtalo de nuevo más tarde.";
        }
        console.error("Error al enviar los datos:", error);
    }
}