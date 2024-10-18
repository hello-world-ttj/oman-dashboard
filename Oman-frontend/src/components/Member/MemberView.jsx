import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  CardMedia,
  IconButton,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const MemberView = ({ open, onClose, data }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: "20px", boxShadow: 5, overflow: "hidden" },
      }}
    >
      <DialogTitle sx={{ padding: "16px 24px", backgroundColor: "#F5F7FA" }}>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon style={{ fill: "#E71D36" }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ padding: "24px", backgroundColor: "#F9FAFC" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
        >
          {data?.image && (
            <Box
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
                width: { xs: "100%", md: 300 },
              }}
            >
              <CardMedia
                component="img"
                image={data.image}
                alt={data?.name?.en}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          <Box sx={{ flex: 1, textAlign: "left" }}>
            <Typography variant="h4" fontWeight="600" color="primary">
              {data?.name?.en}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {data?.name?.ar}
            </Typography>

            <Box
              sx={{
                padding: "8px 16px",
                backgroundColor: "#E8F0FE",
                borderRadius: "8px",
                margin: "16px 0",
              }}
            >
              <Typography variant="body1" fontWeight="500" color="text.primary">
                {data?.designation?.en}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.designation?.ar}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="body1" color="text.primary">
                {data?.bio?.en}
              </Typography>
              <Divider sx={{ margin: "16px 0" }} />
              <Typography variant="body2" color="text.secondary">
                {data?.bio?.ar}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MemberView;
