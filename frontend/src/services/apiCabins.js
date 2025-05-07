import api from './api';

export async function getCabins() {
  const { data, error } = await api.query('get', '/cabins');

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}

export async function getCabin(id) {
  const { data, error } = await api.query('get', `/cabins/${id}`);

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}

export async function createCabin(newCabin) {
  const { data, error } = await api.queryFormData('post', '/cabins', newCabin);

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}

export async function updateCabin(id, updatedCabin) {
  const { data, error } = await api.queryFormData('PATCH', `/cabins/${id}`, updatedCabin);

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.data;
}

export async function deleteCabin(id) {
  const { data, error } = await api.query('delete', `/cabins/${id}`);

  if (error) {
    console.error(data.message);
    data.errors && console.error(data.errors);
    throw new Error(data.message);
  }

  return data.message;
}
