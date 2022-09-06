import { Cookies } from "react-cookie";

const cookie = new Cookies();

class CookieService {
  get(key) {
    return cookie.get(key);
  }

  set(key, value) {
    cookie.set(key, value, { path: "/" });
  }

  remove(key) {
    cookie.remove(key, { path: "/" });
  }
}

export default new CookieService();
