import createDataContext from "./createDataContext";
import productsApi from "../api/productsapi";

const productReducer = (state, action) => {
  switch (action.type) {
    case "PRODUCTS":
      return action.payload;
    default:
      return state;
  }
};

const getProducts = (dispatch) => async (page) => {
  const response = await productsApi.get(`/products?page=${page}`);
  dispatch({ type: "PRODUCTS", payload: response.data });
};

export const { Provider, Context } = createDataContext(
  productReducer,
  {
    getProducts,
  },
  []
);
