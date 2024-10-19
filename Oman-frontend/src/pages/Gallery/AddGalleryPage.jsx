import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import AddGallery from "../../components/Gallery/AddGallery";

const AddGalleryPage = () => {
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
            Gallery List / Add Gallery
          </Typography>
        </Stack>
      </Stack>
      <Grid container padding={"15px"}>
        <Grid item xs={12} md={8}>
          <AddGallery />
        </Grid>
      </Grid>
    </>
  );
};

export default AddGalleryPage;
