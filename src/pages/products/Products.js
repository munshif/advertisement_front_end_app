import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/Layout/PageHeader";
import { DataGrid } from "@material-ui/data-grid";
import { Context as ProductsContext } from "../../context/ProductsContext";
import { Button, Grid } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import { useHistory } from "react-router-dom";

/*
 * Prodduct Component Function
 * Fetch all the proucts to the table from API
 */
const Products = (props) => {
  const history = useHistory();

  const { state, getProducts } = useContext(ProductsContext);

  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await getProducts(page); // Get all products from API

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page]);

  const handleActionClick = (event, cellValues) => {
    history.push({
      pathname: "/app/products/advertisements",
      state: { cellValues },
    });
  };

  //Product Table Columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      type: "number",
      width: 350,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "Action",
      width: 150,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              handleActionClick(event, cellValues);
            }}
          >
            Create Ad
          </Button>
        );
      },
    },
  ];

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
            subTitle="Products List"
            icon={<ListIcon fontSize="large" />}
          ></PageHeader>
          <DataGrid
            rows={state.products ? state.products : []}
            columns={columns}
            pagination
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowCount={20}
            alignItems="center"
            paginationMode="server"
            justifyContent="center"
            onPageChange={(newPage) => setPage(newPage + 1)}
            loading={loading}
          />
        </div>
      </Grid>
    </>
  );
};

export default Products;
