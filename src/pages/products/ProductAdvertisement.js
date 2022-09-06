import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/Layout/PageHeader";
import { DataGrid } from "@material-ui/data-grid";
import { Context as ProductsContext } from "../../context/ProductsContext";
import { Button, Grid } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { useLocation } from "react-router-dom";
import CustomAccordion from "../../components/Common/CustomAccordion";
import ProductDetail from "../../components/Product/ProductDetail";
import AdvertisementList from "../../components/Advertisement/AdvertisementList";
import AdvertisementForm from "../../components/Advertisement/AdvertimentForm";

const ProductAdvertisement = (props) => {
  const location = useLocation();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setProductData(location.state ? location.state.cellValues.row : []);
  }, [location]);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ height: 400, width: "70%" }}>
          <PageHeader
            pageTitle="Products"
            subTitle="Advertisements"
            icon={<ListIcon fontSize="large" />}
          ></PageHeader>
          <Grid container spacing={3} style={{ marginBottom: "5vh" }}>
            <Grid item xs={12} sm={4}>
              <ProductDetail data={productData} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <AdvertisementForm product_id={productData.id} />
            </Grid>
          </Grid>
          <AdvertisementList product_id={productData.id} />
        </div>
      </Grid>
    </>
  );
};

export default ProductAdvertisement;
