import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= AUTH APIs =================
export const authAPI = {
  register: (data: { name: string; email: string; password: string }) =>
    api.post("/api/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/api/auth/login", data),
};

// ================= PREDICTION APIs =================
export const predictionAPI = {
  predict: async (file: File) => {
    const formData = new FormData();

    // 🔥 MUST MATCH BACKEND (multer.single("file"))
    formData.append("file", file);

    const response = await api.post(
      "/api/predict",   // 🔥 correct endpoint
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  history: async () => {
    const response = await api.get("/api/predict/history");
    return response.data;
  },

  getSingle: async (id: string) => {
    const response = await api.get(`/api/predict/${id}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/api/predict/${id}`);
    return response.data;
  },
};

export default api;