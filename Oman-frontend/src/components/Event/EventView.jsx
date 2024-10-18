import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  CardMedia,
  Grid,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const EventView = ({ open, onClose, data }) => {
  const extractYouTubeVideoId = (url) => {
    const videoId = new URL(url).pathname.split("/")[1];
    return videoId;
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="end" alignItems="center">
          <Typography
            onClick={onClose}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ height: "auto", padding: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            {data?.title?.en}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {data?.title?.ar}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={data?.image}
                alt={data?.title?.en}
                sx={{
                  borderRadius: "12px",
                  width: "100%",
                  height: 300,
                  objectFit: "cover",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {data?.video && (
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                    data?.video
                  )}`}
                  width="100%"
                  height="300px"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Event Video"
                  sx={{ borderRadius: "12px" }}
                />
              )}
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EventView;
