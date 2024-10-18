import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddEvent from "../../components/Event/AddEvent";
import { StyledButton } from "../../ui/StyledButton";

export default function EditEvent() {
  const { id } = useParams();

  return (
    <>
      {" "}
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
            Edit Event
          </Typography>
        </Stack>
      </Stack>
      <Grid container item xs={12}>
        <Grid item xs={10} padding={2}>
          <AddEvent eventId={id} isUpdate={true} />
        </Grid>
      </Grid>
    </>
  );
}
