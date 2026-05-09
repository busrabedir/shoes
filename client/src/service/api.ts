import axios from "axios";
import { authService } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // temel api url
  withCredentials: true, // çerezleri backende göndermeye yarar
});

// axios interceptor (middleware)
// api'a atılan her istekte veya api'dan gelen her cevapta fonksiyon çalıştırmaya yarar
api.interceptors.response.use(
  // api'dan olumlu cevap gelince çalışır
  (res) => res,
  // api'nda olumsuz cevap gelince çalışır
  async (err) => {
    // hata aldığımız api isteğinin bilgilerini değişkkene aktar
    const originalRequest = err.config;

    // hata access tokenin süresi dolmasından kaynaklı bir hata ise
    if (
      err.response.status === 401 &&
      err.response.data?.message === "Access token expired"
    ) {
      try {
        // access tokenini yenile
        await authService.refresh();

        // hata aldığımız api isteğini tekrar et
        return api.request(originalRequest);
      } catch (error) {
        // refresh token geçersiz ise çıkış yap
        await authService.logout();

        // login sayfasına yönlendir
        window.location.href = "/login";
      }
    }

    // hatayı fırlat
    return Promise.reject(err);
  },
);
export default api;
