import api from './api';

export async function getSettings() {
  const { data, error } = await api.query('get', '/settings');

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}

export async function updateSettings(updatedSettings) {
  const { data, error } = await api.query('PATCH', '/settings', updatedSettings);

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}
