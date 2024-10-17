import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AddReport from "../../components/Report/AddReport";

const AddReportPage = () => {
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h4" color="textSecondary">
            Report List / Add Report
          </Typography>
        </Stack>
      </Stack>
      <Grid container padding={"15px"}>
        <Grid item xs={12} md={8}>
          <AddReport />
        </Grid>
      </Grid>
    </>
  );
};

export default AddReportPage;
