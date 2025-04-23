import { ProgressData } from "../interfaces/progressData";

// Función ajustada para generar datos simulados de progreso con mínimo de 56 llaves
export const generateMockData = ({ id }: { id: number }): ProgressData => {
  // Generar datos con variabilidad pero que algunos tengan progreso destacado (alto o bajo)
  const isHighPerformer = id % 5 === 0; // Cada 5to registro es un alto rendimiento
  const isLowPerformer = id % 7 === 0; // Cada 7mo registro es un rendimiento moderado-bajo

  let webinarsCompleted;

  if (isHighPerformer) {
    // Alto rendimiento: entre 45-85 webinars (315-595 llaves)
    webinarsCompleted = Math.floor(Math.random() * 41) + 45;
  } else if (isLowPerformer) {
    // Rendimiento moderado-bajo: entre 8-20 webinars (56-140 llaves)
    webinarsCompleted = Math.floor(Math.random() * 13) + 8;
  } else {
    // Rendimiento promedio: entre 15-45 webinars (105-315 llaves)
    webinarsCompleted = Math.floor(Math.random() * 31) + 15;
  }

  // Exactamente 7 llaves por webinar completado
  const keysCollected = webinarsCompleted * 7;

  // Último webinar completado (para mostrar progreso reciente)
  const completedWebinarIds = [];
  for (let i = 0; i < webinarsCompleted; i++) {
    completedWebinarIds.push(String(i + 1));
  }

  // Calcular progreso general basado en webinars completados
  const progress = webinarsCompleted / 85;

  // Generar fecha de última actividad (más reciente para los de alto rendimiento)
  const daysAgo = isHighPerformer
    ? Math.floor(Math.random() * 3)
    : isLowPerformer
    ? Math.floor(Math.random() * 14) + 7
    : Math.floor(Math.random() * 7);
  const lastActivity = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  return {
    id,
    webinarsCompleted,
    totalWebinars: 85,
    keysCollected,
    totalKeys: 595, // 85 cursos × 7 llaves = 595 llaves totales
    progress,
    lastActivity,
    completedWebinarIds,
    pendingTasks: Math.floor(Math.random() * 3), // 0-2 tareas pendientes
    percentileRanking: Math.floor(Math.random() * 100) + 1, // Ranking percentil 1-100
  };
};
