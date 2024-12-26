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
  
  const GalleryView = ({ open, onClose, data }) => {
    const baseURL = import.meta.env.VITE_API_IMAGE_URL;
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: "16px", background: "#f4f6f8", boxShadow: 10 },
        }}
      >
        <DialogTitle sx={{ padding: 3 }}>
          <Box display="flex" justifyContent="end" alignItems="center">
            <Typography
              onClick={onClose}
              color="#E71D36"
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              <CloseIcon />
            </Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card sx={{ boxShadow: 4, borderRadius: "12px", padding: 3 }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={`${data?.image}`}
                    alt={data?.title?.en}
                    sx={{ objectFit: "contain", width: "100%", maxWidth: "400px" }}
                  />
                  <CardContent sx={{ paddingTop: 2 }}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
                    >
                      {data?.title?.en}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "medium", color: "#555", textAlign: "center" }}
                    >
                      {data?.title?.ar}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GalleryView;
  