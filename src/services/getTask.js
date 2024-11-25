
// 2. Obtener las tareas de un usuario por ID
const getTasksByUserId = async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'GET') return res.status(405).json({ error: 'Método no permitido' });

        const { userId } = req.query;
        if (!userId) return res.status(400).json({ error: 'Falta el parámetro userId' });

        try {
            const tasksRef = admin.database().ref(`/tareas/${userId}`);
            const snapshot = await tasksRef.once('value');
            const tasks = snapshot.val();

            if (!tasks) return res.status(404).json({ error: 'No se encontraron tareas para este usuario' });

            // Convertir los índices de estado y periodicidad a nombres
            const formattedTasks = Object.entries(tasks).map(([taskId, task]) => {
                // Convertir estado a nombre usando la función externa
                const estadoNombre = convertirEstado(task.estado);

                // Convertir periodicidad a nombre usando la función externa
                const periodicidadNombre = task.frecuencia ? convertirPeriodicidad(task.frecuencia) : 'No especificado';

                // Devolver solo los campos que queremos mostrar, excluyendo taskId y frecuencia.tipo
                return {
                    titulo: task.titulo,
                    descripcion: task.descripcion,
                    email_responsables: task.email_responsables,
                    estado: estadoNombre,
                    fecha_fin: task.fecha_fin,
                    fecha_tarea: task.fecha_tarea,
                    hora: task.hora,
                    fecha_recordatorio: task.fecha_recordatorio || "",
                    periodicidad: periodicidadNombre
                };
            });

            return res.status(200).json({ tasks: formattedTasks });
        } catch (error) {
            console.error('Error al recuperar las tareas:', error);
            return res.status(500).json({ error: 'Error al recuperar las tareas' });
        }
    });
};

