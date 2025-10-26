import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082/api',
  timeout: 10000,
});

// Request interceptor (istek öncesi)
api.interceptors.request.use((config) => {
  // örn: token ekle
  // config.headers.Authorization = `Bearer ${token}`
  return config;
});

// Response interceptor (cevap sonrası)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[Axios Error]', error);

    // Burada global handler’a yönlendirebilirsin
    // örn: logErrorToServer(error)

    // İstersen kullanıcıya toast gösterebilirsin
    // useNotify({ message: 'Sunucu hatası', color: 'negative' })

    return Promise.reject(error);
  }
);

export default api;
