export async function apiFetch(path: string, opts: RequestInit = {}) {
  const base = import.meta.env.VITE_API_BASE_URL || '';
  const url = base.endsWith('/') || path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string> || {}),
  };

  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  // try to parse json, otherwise return text
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export default apiFetch;
