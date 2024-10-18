import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AddCareer from "../../components/Career/AddCareer";

const AddCareerPage = () => {
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
            Career List / Add Career
          </Typography>
        </Stack>
      </Stack>
      <Grid container padding={"15px"}>
        <Grid item xs={12} md={8}>
          <AddCareer />
        </Grid>
      </Grid>
    </>
  );
};

export default AddCareerPage;
