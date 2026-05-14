const isCodespaceHost = (hostname) => hostname.endsWith('.app.github.dev');

const getCodespaceApiHost = (hostname) => {
  if (!isCodespaceHost(hostname)) {
    return null;
  }

  if (hostname.endsWith('-3000.app.github.dev')) {
    return hostname.replace(/-3000\.app\.github\.dev$/, '-8000.app.github.dev');
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
    return `${protocol}//${hostname.replace(':3000', ':8000')}`;
  }

  return `${protocol}//${hostname}`;
};

export const getApiUrl = (resource) => `${getBaseApiUrl()}/api/${resource}/`;
