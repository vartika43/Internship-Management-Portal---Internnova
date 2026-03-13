import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
};

// Internships
export const internshipAPI = {
  getAll: () => api.get("/internships"),
  getById: (id) => api.get(`/internships/${id}`),
  create: (data) => api.post("/internships", data),
  update: (id, data) => api.put(`/internships/${id}`, data),
  getMyListings: () => api.get("/internships/my"),
};

// Applications
export const applicationAPI = {
  apply: (internshipId) => api.post("/applications", { internshipId }),
  getMyApplications: () => api.get("/applications/my"),
  getByInternship: (internshipId) => api.get(`/applications/internship/${internshipId}`),
};

// Users
export const userAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getProfile: () => api.get("/users/profile/me"),
  updateProfile: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        if (k === "skills" && Array.isArray(data[k])) {
          formData.append(k, data[k].join(","));
        } else if (k !== "resume" && typeof data[k] === "object") {
          formData.append(k, JSON.stringify(data[k]));
        } else if (k !== "resume") {
          formData.append(k, data[k]);
        }
      }
    });
    if (data.resume instanceof File) formData.append("resume", data.resume);
    return api.put("/users/profile/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Attendance
export const attendanceAPI = {
  getStudents: () => api.get("/attendance/students"),
  getLogsByStudent: (studentId) => api.get(`/attendance/logs/${studentId}`),
  getAllLogs: () => api.get("/attendance"),
  approve: (id) => api.put(`/attendance/approve/${id}`),
  getInternshipAttendance: () => api.get("/attendance/internship-attendance"),
};

// NOC Requests
export const nocAPI = {
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null && k !== "offerLetter") {
        formData.append(k, data[k]);
      }
    });
    if (data.offerLetter instanceof File) formData.append("offerLetter", data.offerLetter);
    return api.post("/noc-requests", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getMyRequests: () => api.get("/noc-requests/my"),
  getPending: () => api.get("/noc-requests/pending"),
  approve: (id) => api.put(`/noc-requests/${id}/approve`),
  reject: (id, remarks) => api.put(`/noc-requests/${id}/reject`, { remarks }),
};

export default api;
