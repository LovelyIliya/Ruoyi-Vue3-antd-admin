export function useBaseConfig() {
  const title = import.meta.env.VITE_APP_TITLE;
  const baseApiPath = import.meta.env.VITE_API_BASE_PATH;
  const baseApiPrefix = import.meta.env.VITE_GLOB_API_URL_PREFIX;
  const basePath = import.meta.env.VITE_PUBLIC_PATH;

  return {
    title,
    baseApiPath,
    baseApiPrefix,
    basePath,
  };
}
