export function getServerUrl() {
  const backendUrl = import.meta.env.VITE_WELL_EATER_BACKEND_URL;
  const backendPort = import.meta.env.VITE_WELL_EATER_BACKEND_PORT;
  return `${backendUrl}` + `${backendPort && `:${backendPort}`}`;
}
