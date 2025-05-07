export const BACKEND_URL = 'http://127.0.0.1:3500';

async function query(method, endpoint, payload) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1${endpoint}`, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: payload && JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      return { data, error: true };
    }

    return { data, error: false };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

async function queryFormData(method, endpoint, payload) {
  const formData = new FormData();
  if (payload) {
    Object.keys(payload).map((key) => {
      formData.append(`${key}`, payload[key]);
    });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1${endpoint}`, {
      method: method,
      credentials: 'include',
      body: payload && formData,
    });
    const data = await res.json();

    if (!res.ok) {
      return { data, error: true };
    }

    return { data, error: false };
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
}

export default { query, queryFormData };
