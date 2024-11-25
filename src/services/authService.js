import { auth, provider } from '../static/js/firebaseconfig';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth'; 

// Función para manejar el login
export async function loginWithPopup() {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error durante el login:", error);
    throw new Error("Error al iniciar sesión. Inténtalo de nuevo.");
  }
}

// Función para manejar el cambio de estado de autenticación
export function observeAuthState(onUserLoggedIn, onUserLoggedOut) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      onUserLoggedIn(user);
    } else {
      onUserLoggedOut();
    }
  });
}