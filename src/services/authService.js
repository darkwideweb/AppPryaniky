import axios from 'axios';

const BASE_URL = 'https://test.v5.pryaniky.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// выполнение входа
const login = async ({ username, password }) => {
  try {
    const response = await apiClient.post('/ru/data/v3/testmethods/docs/login', { username, password });
    const token = response.data.data.token;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw new Error('Login failed. Please check your credentials and try again.');
  }
};

const authService = { login };

export default authService;
