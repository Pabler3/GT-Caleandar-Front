import { loginWithPopup, observeAuthState } from "../services/authService";

// Función para manejar el evento de login
export function setupLoginButton() {
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      try {
        await loginWithPopup();
      } catch (error) {
        alert("No se pudo iniciar sesión. Inténtalo de nuevo.");
      }
    });
  }
}

// Función para redireccionar al usuario según el estado de autenticación
export function handleAuthState() {
  observeAuthState((user) => {
    console.log("Usuario autenticado:", user);
    window.location.href = "/home";
  }, () => { console.log("Usuario no autenticado"); });
}
