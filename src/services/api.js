const BASE = '/api';

async function fetchJson(url, opts = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${BASE}${url}`, {
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...opts.headers },
      ...opts,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `API error: ${res.status}`);
    }
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  clients: {
    list: (params) => fetchJson('/clients?' + new URLSearchParams(params || {})),
    get: (id) => fetchJson(`/clients/${id}`),
    create: (data) => fetchJson('/clients', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchJson(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id) => fetchJson(`/clients/${id}`, { method: 'DELETE' }),
  },
  trainers: {
    list: () => fetchJson('/trainers'),
  },
  revenue: {
    list: () => fetchJson('/revenue'),
  },
  crm: {
    list: (params) => fetchJson('/crm?' + new URLSearchParams(params || {})),
    updateStage: (id, stage) => fetchJson(`/crm/${id}`, { method: 'PATCH', body: JSON.stringify({ stage }) }),
  },
  attendance: {
    list: () => fetchJson('/attendance'),
  },
  programs: {
    list: (params) => fetchJson('/programs?' + new URLSearchParams(params || {})),
  },
  powerlifting: {
    list: () => fetchJson('/powerlifting'),
  },
  ai: {
    diet: (data) => fetchJson('/ai/diet', { method: 'POST', body: JSON.stringify(data) }),
    workout: (data) => fetchJson('/ai/workout', { method: 'POST', body: JSON.stringify(data) }),
  },
};
