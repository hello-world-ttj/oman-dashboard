import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import IconButton from "@mui/material/IconButton";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // PDF icon

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
}));

const MediaPreviewContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10px",
  padding: "10px",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
  width: "150px",
  height: "150px",
  backgroundColor: "#f9f9f9",
  position: "relative",
});

const MediaPreview = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: "4px",
  backgroundColor: "#e0e0e0",
});

const ImagePreview = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const VideoPreview = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const PdfPreviewContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

const FileName = styled("p")({
  marginTop: "10px",
  fontSize: "12px",
  color: "rgba(0, 0, 0, 0.6)",
  textAlign: "center",
  maxWidth: "100%", // Ensure it respects the parent container's width
  whiteSpace: "nowrap", // Prevents the text from wrapping
  overflow: "hidden", // Hides the overflow
  textOverflow: "ellipsis", // Adds the ellipsis when text overflows
});

const PdfLink = styled("a")({
  textDecoration: "none",
  color: "#000",
  fontSize: "14px",
  marginTop: "5px",
  cursor: "pointer",
});

export const StyledEventUpload = ({ label, value, onChange }) => {
  const fileInputRef = useRef(null);
  const [selectedMedia, setSelectedMedia] = useState(value || null);
  const [mediaType, setMediaType] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const mediaUrl = URL.createObjectURL(file);

      if (fileType.startsWith("image/")) {
        setMediaType("image");
      } else if (fileType.startsWith("video/")) {
        setMediaType("video");
      } else if (fileType === "application/pdf") {
        setMediaType("pdf");
        setPdfUrl(mediaUrl);
      }
      setSelectedMedia(mediaUrl);
      setFileName(file.name);
      onChange(file);
    }
  };

  useEffect(() => {
    if (value && typeof value === "string") {
      const fileType = value.split('.').pop().toLowerCase(); // Get the extension of the media

      // Handle different types of existing media based on extension
      if (fileType.match(/(jpg|jpeg|png|gif)/)) {
        setMediaType("image");
      } else if (fileType.match(/(mp4|webm|ogg)/)) {
        setMediaType("video");
      } else if (fileType === "pdf") {
        setMediaType("pdf");
        setPdfUrl(value);
      }
      setSelectedMedia(value); // Set URL or base64 string
    }
  }, [value]);
console.log("vidyo",value);

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,video/*,application/pdf"
      />
      {selectedMedia && (
        <MediaPreviewContainer>
          <MediaPreview>
            {mediaType === "image" ? (
              <ImagePreview src={selectedMedia} alt="Image Preview" />
            ) : mediaType === "video" ? (
              <VideoPreview src={selectedMedia} controls />
            ) : mediaType === "pdf" ? (
              <PdfPreviewContainer>
                <PictureAsPdfIcon style={{ fontSize: 48, color: "#d32f2f" }} />
                <PdfLink href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </PdfLink>
              </PdfPreviewContainer>
            ) : null}
          </MediaPreview>
          {fileName && <FileName>{fileName}</FileName>}
        </MediaPreviewContainer>
      )}
    </>
  );
};
