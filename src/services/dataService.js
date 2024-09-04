import axios from 'axios';

const BASE_URL = 'https://test.v5.pryaniky.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getToken = () => localStorage.getItem('token');

// получение данных
const fetchData = async () => {
  try {
    const token = getToken();
    const response = await apiClient.get('/ru/data/v3/testmethods/docs/userdocs/get', {
      headers: { 'x-auth': token },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch data:', error.response?.data?.message || error.message);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};

// добавление записи
const addRecord = async (record) => {
  try {
    const token = getToken();
    const response = await apiClient.post('/ru/data/v3/testmethods/docs/userdocs/create', record, {
      headers: { 'x-auth': token },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to add record:', error.response?.data?.message || error.message);
    throw new Error('Failed to add record. Please try again later.');
  }
};

// удаление записи
const deleteRecord = async (id) => {
  try {
    const token = getToken();
    const response = await apiClient.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`, {}, {
      headers: { 'x-auth': token },
    });
    if (response.data.error_code !== 0) {
      throw new Error('Failed to delete record');
    }
  } catch (error) {
    console.error('Failed to delete record:', error.response?.data?.message || error.message);
    throw new Error('Failed to delete record. Please try again later.');
  }
};

// обновлене записи
const updateRecord = async (id, updatedRecord) => {
  try {
    const token = getToken();
    const response = await apiClient.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, updatedRecord, {
      headers: { 'x-auth': token },
    });
    if (response.data.error_code !== 0) {
      throw new Error('Failed to update record');
    }
    return response.data.data;
  } catch (error) {
    console.error('Failed to update record:', error.response?.data?.message || error.message);
    throw new Error('Failed to update record. Please try again later.');
  }
};

const fetchChangeLog = async () => {
    try {
      const token = getToken();
      const response = await apiClient.get('/path/to/changelog', {
        headers: { 'x-auth': token },
      });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch change log:', error.response?.data?.message || error.message);
      throw new Error('Failed to fetch change log. Please try again later.');
    }
  };

  const dataService = { fetchData, addRecord, deleteRecord, updateRecord, fetchChangeLog };
  
  export default dataService;
  