import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Divider,
  Card,
  CardMedia,
  Stack,
  Grid,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const NewsPreview = ({ open, onClose, data }) => {
  const baseURL = import.meta.env.VITE_API_IMAGE_URL;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle sx={{ padding: 3 }}>
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
      <CardMedia
        component="img"
        height="120"
        image={`${baseURL}${data?.banner}`}
        alt="News Banner"
        sx={{ objectFit: "cover", borderRadius: "8px", margin: "0px" }}
      />

      <DialogContent sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5}>
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={`${baseURL}${data?.image}`}
                alt="News Image"
                sx={{ objectFit: "cover", borderRadius: "8px" }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Stack spacing={2}>
              <Typography variant="h5" gutterBottom>
                {data?.title?.en}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {data?.title?.ar}
              </Typography>
              <Typography variant="body1" paragraph>
                {data?.content?.en}
              </Typography>
              <Typography variant="body1" paragraph>
                {data?.content?.ar}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tag: {data?.tag}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {data?.status}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewsPreview;
