const BASE = '/api';

async function fetchJson(url, opts = {}) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  clients: {
    list: () => fetchJson('/clients'),
    get: (id) => fetchJson(`/clients/${id}`),
    create: (data) => fetchJson('/clients', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetchJson(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  },
  trainers: {
    list: () => fetchJson('/trainers'),
  },
  revenue: {
    list: () => fetchJson('/revenue'),
  },
  crm: {
    list: () => fetchJson('/crm'),
    updateStage: (id, stage) => fetchJson(`/crm/${id}`, { method: 'PATCH', body: JSON.stringify({ stage }) }),
  },
  attendance: {
    list: () => fetchJson('/attendance'),
  },
  programs: {
    list: () => fetchJson('/programs'),
  },
  powerlifting: {
    list: () => fetchJson('/powerlifting'),
  },
};
