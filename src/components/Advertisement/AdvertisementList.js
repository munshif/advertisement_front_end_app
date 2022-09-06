import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../../components/Layout/PageHeader";
import { DataGrid } from "@material-ui/data-grid";
import { Context as ProductsContext } from "../../context/AdvertisementContext";
import { Button, Grid, ButtonGroup } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";

// Get all advertisements belongs to specific product from database

const AdvertisementList = ({ product_id }) => {
  const { state, getAdvertisementsyProduct } = useContext(ProductsContext);

  const [page, setPage] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      // call api toget advertisements
      const newRows = product_id
        ? await getAdvertisementsyProduct(product_id, page)
        : null;
      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, product_id]);

  //Advertisements Table Column Headers
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      headerAlign: "center",
      width: 150,
      align: "left",
    },
    {
      field: "valid_until",
      headerName: "Valid Until",
      headerAlign: "center",
      width: 150,
      align: "left",
    },
    {
      field: "discount_percentage",
      headerName: "Discount Percentage",
      type: "number",
      width: 250,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "created_at",
      headerName: "Created Date",
      headerAlign: "center",
      width: 200,
      align: "left",
    },
    {
      field: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button
              color="primary"
              onClick={(event) => {
                // handleActionClick(event, cellValues);
              }}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              onClick={(event) => {
                // handleActionClick(event, cellValues);
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
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
        <div style={{ height: 400, width: "100%" }}>
          {/* Bind the adverstisements data to the  Data Grid(Table Design) */}
          <DataGrid
            rows={state.results ? state.results.data : []}
            columns={columns}
            pagination
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowCount={50}
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

export default AdvertisementList;
