import createDataContext from "./createDataContext";
import dbApi from "../api/dbapi";

const advertisementReducer = (state, action) => {
  switch (action.type) {
    case "ADS_BY_PRODUCT":
      return action.payload;
    case "CREATE_AD":
      return action.payload;
    default:
      return state;
  }
};

const getAdvertisementsyProduct =
  (dispatch) =>
  async (product_id, page = null) => {
    const response = await dbApi.get(
      `/advertisements/product/${product_id}?page=${page}`
    );
    dispatch({ type: "ADS_BY_PRODUCT", payload: response.data });
  };

const createAdvertisement = (dispatch) => async (inputField, setLoading) => {
  try {
    setLoading(!false);
    const response = await dbApi.post("/advertisements", inputField);
    setLoading(!true);
    // dispatch({ type: "CREATE_AD", payload: response.data });
  } catch (error) {
    setLoading(!true);
  }
};

export const { Provider, Context } = createDataContext(
  advertisementReducer,
  {
    getAdvertisementsyProduct,
    createAdvertisement,
  },
  []
);
