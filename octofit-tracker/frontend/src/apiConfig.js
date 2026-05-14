const isCodespaceHost = (hostname) => hostname.includes('.app.github.dev');

const getCodespaceApiHost = (hostname) => {
  if (!isCodespaceHost(hostname)) {
    return null;
  }

  // Match pattern like "workspace-name-3000.app.github.dev" and convert to port 8000
  const portMatch = hostname.match(/^(.+?)-(\d+)\.app\.github\.dev$/);
  if (portMatch) {
    const baseHost = portMatch[1];
    const port = portMatch[2];
    // Only replace if it's not already 8000
    if (port !== '8000') {
      return `${baseHost}-8000.app.github.dev`;
    }
  }

  return hostname;
};

const getBaseApiUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }

  const { hostname, protocol } = window.location;
  const codespaceHost = getCodespaceApiHost(hostname);

  if (codespaceHost) {
    return `${protocol}//${codespaceHost}`;
  }

  if (hostname.includes('localhost') || hostname.startsWith('127.0.0.1')) {
    const hostWithPort = hostname.includes(':') ? hostname.split(':')[0] : hostname;
    return `${protocol}//${hostWithPort}:8000`;
  }

  return `${protocol}//${hostname}`;
};

export const getApiUrl = (resource) => `${getBaseApiUrl()}/api/${resource}/`;
