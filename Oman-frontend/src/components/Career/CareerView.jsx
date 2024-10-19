import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const CareerView = ({ open, onClose, data }) => {
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
      <DialogContent sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`${baseURL}${data?.image}`}
                alt={data?.title?.en}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {data?.title?.en}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data?.description?.en}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {data?.title?.ar}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data?.description?.ar}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CareerView;
