import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  CardMedia,
  Button,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const ReportView = ({ open, onClose, data }) => {
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
          {data?.image && (
            <CardMedia
              component="img"
              image={data.image}
              alt="Report Image"
              sx={{
                borderRadius: "12px",
                width: "100%",
                maxHeight: 300,
                objectFit: "cover",
              }}
            />
          )}

          {data?.media && (
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                backgroundColor: "#e30613",
                "&:hover": {
                  backgroundColor: "#c1172b",
                },
              }}
              href={data?.media}
              target="_blank"
            >
              View/Download Report PDF
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ReportView;
