import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomTextField = styled(TextField)(({ textAlign }) => ({
  width: "100%",
  backgroundColor: "white",
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
  "& .MuiInputBase-input": {
    textAlign: textAlign, 
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#79747E",
    opacity: 1,
  },
}));

export const StyledMultilineTextField = ({
  label,
  placeholder,
  rows = 4,
  onChange,
  value,
  textAlign = "left",
}) => {
  return (
    <CustomTextField
      label={label}
      placeholder={placeholder}
      multiline
      rows={rows}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      textAlign={textAlign}
    />
  );
};