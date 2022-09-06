import ReactDOM from "react-dom";
import "./index.css";

import App from "./components/App";
import { Provider as UserProvider } from "./context/UserContext";
import { Provider as ProductProvider } from "./context/ProductsContext";
import { Provider as AdvertisementProvider } from "./context/AdvertisementContext";

ReactDOM.render(
  <UserProvider>
    <ProductProvider>
      <AdvertisementProvider>
        <App />
      </AdvertisementProvider>
    </ProductProvider>
  </UserProvider>,
  document.querySelector("#root")
);
