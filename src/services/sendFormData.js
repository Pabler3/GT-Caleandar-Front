// Importar los módulos necesarios de Firebase (v9+)
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../static/js/firebaseconfig.js";// Asegúrate de tener este archivo con tu configuración

// Inicializar Firebase con la configuración de tu proyecto
const app = initializeApp(firebaseConfig);

// Función para enviar los datos al backend
export default async function sendFormData(data) {
    // Obtener la instancia de autenticación
    const auth = getAuth(app);  // Inicializa el auth con la app de Firebase
    const user = auth.currentUser;

    if (!user) {
        throw new Error("No estás autenticado.");
    }

    const userId = user.uid;
    const idToken = await user.getIdToken();

    // Procesar participantes (opcional)
    const requestData = {
        ...data,
        userId,
    };

    // Enviar los datos al backend
    try {
      const response = await fetch('https://us-central1-caleandar-leanmind.cloudfunctions.net/endDatos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`,  // Autenticación por token
            },
            body: JSON.stringify(requestData),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al enviar los datos.");
        }

        const responseData = await response.json();
    
        return responseData;
    } catch (error) {
        console.error("Error al enviar los datos al backend:", error);
        throw error;
    }
}
