
import data from "../static/js/dataTarea.json";
import { updatePagination } from "./paginationScript";

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-button');
  const tareasContainer = document.getElementById("tareas-container");
  const results = data.tareas;

  // Función para actualizar el DOM con las tareas
  function actualizarDOM(tasks) {
    tareasContainer.innerHTML = ''; // Limpiar el contenedor
    tasks.forEach(tarea => {
      const taskElement = document.createElement('li');

      taskElement.innerHTML = `
        <div class="small-reminder">
          <div class="content-reminder">
            <div class="header-view">
              <div class="status-circle"></div>
              <p class="status-text">${tarea.estado}</p>
            </div>

            <div class="task-name">
              <h3>${tarea.titulo}</h3>
            </div>
            <div class="task-details">
              <div class="time-reminder">
                <img class="clock-icon" alt="icono de un reloj" src="icons/icon-clock.svg">
                <div class="hour">${tarea.hora}</div>
              </div>
              <div class="participants">
                <img class="participants-icon" alt="icono de usuarios o participantes" src="icons/icon-users.svg">
                <div class="number-participants">${tarea.email_responsables.length}</div>
              </div>
            </div>
          </div>
        </div>
      `;
      tareasContainer.appendChild(taskElement);
    });

    // Cargar y ejecutar el script después de que el componente se haya renderizado
    import("/src/utils/validationViewReminder.js").then(() => {
        }).catch(err => console.error("Error al cargar el script:", err));
    updatePagination();
  }

  // Función para filtrar las tareas
  function filtrarTareas(filter) {
    let filteredTasks
    if (filter === 'todas') {
      filteredTasks = results; // Mostrar todas las tareas
    } else {
      filteredTasks = results.filter(tarea => tarea.estado === filter); // Filtrar por estado
    }
    actualizarDOM(filteredTasks);
  }

  // Función para manejar la clase activa en los botones
  function actualizarClaseActiva(activeButton) {
    // Eliminar la clase activa de todos los botones
    filterButtons.forEach(button => button.classList.remove('active'));
    // Añadir la clase activa al botón clicado
    activeButton.classList.add('active');
  }

  // Establecer los eventos en los botones de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter'); // Obtener el filtro seleccionado
      actualizarClaseActiva(button); // Actualizar la clase activa en el botón
      filtrarTareas(filter); // Filtrar tareas según el botón clicado
    });
  });

  // Mostrar todas las tareas al cargar la página
  filtrarTareas('todas');
});

