const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

export function apiUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const cleanBaseUrl = rawApiBaseUrl.replace(/\/$/, '')

  if (!cleanBaseUrl) {
    return cleanPath
  }

  if (cleanBaseUrl.endsWith('/api') && cleanPath.startsWith('/api/')) {
    return `${cleanBaseUrl}${cleanPath.slice(4)}`
  }

  return `${cleanBaseUrl}${cleanPath}`
}
