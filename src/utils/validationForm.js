// Función de validación del formulario
function validateForm() {
    let isValid = true;

    // Validación del título del recordatorio
    const titleInput = document.getElementById("title");
    const titleError = document.getElementById("titleError");
    if (titleInput.value.trim() === "") {
        titleError.textContent = "El título del recordatorio es obligatorio.";
        isValid = false;
    } else {
        titleError.textContent = "";
    }

    // Validación de la fecha de inicio
    const dayStartInput = document.getElementById("dayStar");
    const dayError = document.getElementById("dayError");
    if (dayStartInput.value.trim() === "") {
        dayError.textContent = "Seleccione una fecha de inicio.";
        isValid = false;
    } else {
        dayError.textContent = "";
    }

    // Validación de la fecha de fin (opcional)
    const dayEndInput = document.getElementById("dayEnd");
    if (dayEndInput.value.trim() !== "" && dayStartInput.value > dayEndInput.value) {
        dayError.textContent = "La fecha de fin debe ser posterior a la fecha de inicio.";
        isValid = false;
    } else {
        dayError.textContent = "";
    }

    // Validación de la hora de inicio
    const startTimeInput = document.getElementById("starTime");
    const hourError = document.getElementById("hourError");
    if (startTimeInput.value.trim() === "") {
        hourError.textContent = "Seleccione una hora de inicio.";
        isValid = false;
    } else {
        hourError.textContent = "";
    }

    // Validación de la frecuencia de repetición
    const frequencyError = document.getElementById("repeatError");
    const selectedFrequency = document.querySelector('.freq-btn.active');

    if (!selectedFrequency) {
        frequencyError.textContent = "Seleccione una opción de repetición.";
        isValid = false;
    } else {
        const frequencyValue = parseInt(selectedFrequency.dataset.value, 10);
        frequencyError.textContent = "";

        if (frequencyValue === 2) { // Validación semanal
            const selectedDays = document.querySelectorAll('.day-btn.active'); 
            const weeklyFrequency = document.querySelector('.week-frequency .freq-btn.active'); 

            if (selectedDays.length === 0) {
                frequencyError.textContent = "Seleccione al menos un día de la semana.";
                isValid = false;
            } else if (!weeklyFrequency) {
                frequencyError.textContent = "Seleccione cada cuántas semanas se repite.";
                isValid = false;
            }
        } else if (frequencyValue === 3) { // Validación mensual
            const selectedMonthlyOption = document.querySelector('.monthly-option.active'); 
            if (!selectedMonthlyOption) {
                frequencyError.textContent = "Seleccione una opción mensual válida.";
                isValid = false;
            }
        }
    }

    // Validación de la descripción
    const descriptionInput = document.getElementById("description");
    const descriptionError = document.getElementById("descriptionError");
    if (descriptionInput.value.trim() === "") {
        descriptionError.textContent = "La descripción es obligatoria.";
        isValid = false;
    } else {
        descriptionError.textContent = "";
    }

    // Validación de participantes (opcional)
    const participantInput = document.getElementById("participant");
    const participantError = document.getElementById("participantError");
    if (participantInput.value.trim() !== "") {
        const participants = participantInput.value.split(',').map(item => item.trim());
        if (!participants.every(validateEmailOrName)) {
            participantError.textContent = "Algunos participantes tienen formato inválido.";
            isValid = false;
        } else {
            participantError.textContent = "";
        }
    }

    return isValid;
}

// Función auxiliar para validar si el valor ingresado es un nombre o un correo electrónico válido
function validateEmailOrName(value) {
    // Expresión regular para validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Expresión regular para validar un nombre (letras y espacios)
    const nameRegex = /^[a-zA-Z\s]+$/;

    return emailRegex.test(value) || nameRegex.test(value);
}

// Exportar la función
export default validateForm;
