import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/Layout/PageHeader";
import { Grid } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { useLocation } from "react-router-dom";
import ProductDetail from "../../components/Product/ProductDetail";
import AdvertisementList from "../../components/Advertisement/AdvertisementList";
import AdvertisementForm from "../../components/Advertisement/AdvertimentForm";

const ProductAdvertisement = (props) => {
  const location = useLocation();
  const [productData, setProductData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editData, setEdit] = useState({});

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
              <AdvertisementForm
                product_id={productData.id}
                setRefresh={setRefresh}
                editData={editData}
              />
            </Grid>
          </Grid>
          <AdvertisementList
            product_id={productData.id}
            refresh={refresh}
            setEdit={setEdit}
          />
        </div>
      </Grid>
    </>
  );
};

export default ProductAdvertisement;
