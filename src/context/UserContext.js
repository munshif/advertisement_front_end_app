import createDataContext from "./createDataContext";
import dbapi from "../api/dbapi";
import CookieService from "../utils/CookieService";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: action.payload };
    case "AUTHENTICATE":
      return { ...state, isAuthenticated: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

const userLogin =
  (dispatch) => async (username, password, setError, history) => {
    try {
      if (username && password) {
        const userData = {
          email: username,
          password,
        };
        const apiCall = await dbapi.post("/login", userData);
        const response = apiCall.data;
        if (response && response.status === 200) {
          dispatch({
            type: "LOGIN",
            payload: true,
          });
          setError(false);
          CookieService.set("token", response.results.token);
          history.push("products");
        }
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

const userSignUp = (dispatch) => async (inputField, setLoading) => {
  try {
    setLoading(!false);
    const response = await dbapi.post("/register", inputField);
    setLoading(!true);
  } catch (error) {
    setLoading(!true);
  }
};

const userAuthenticate = (dispatch) => async () => {
  const accessToken = await CookieService.get("token");
  if (accessToken) {
    dispatch({
      type: "AUTHENTICATE",
      payload: true,
    });
  } else {
    dispatch({
      type: "AUTHENTICATE",
      payload: false,
    });
  }
};

const logOut = (dispatch) => async (history) => {
  await CookieService.remove("token");
  dispatch({
    type: "LOGOUT",
    payload: false,
  });
};
export const { Provider, Context } = createDataContext(
  userReducer,
  {
    userLogin,
    userAuthenticate,
    logOut,
    userSignUp,
  },
  []
);
