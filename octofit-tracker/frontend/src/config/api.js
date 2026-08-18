export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}/api${normalizedPath}`;
}

export function normalizeArrayResponse(payload, fallback = []) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return fallback;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.users)) {
    return payload.users;
  }

  if (Array.isArray(payload.activities)) {
    return payload.activities;
  }

  if (Array.isArray(payload.teams)) {
    return payload.teams;
  }

  if (Array.isArray(payload.workouts)) {
    return payload.workouts;
  }

  if (payload.data && typeof payload.data === 'object') {
    return normalizeArrayResponse(payload.data, fallback);
  }

  return fallback;
}
