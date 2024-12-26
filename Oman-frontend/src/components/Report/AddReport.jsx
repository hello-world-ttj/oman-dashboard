import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { useReportStore } from "../../store/reportStore";
import StyledSelectField from "../../ui/StyledSelectField";
import uploadFileToS3 from "../../utils/s3Upload";
import StyledCropImage from "../../ui/StyledCropImage";

const AddReport = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { reportId, isUpdate } = location?.state || {};
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaFileAr, setMediaFileAr] = useState(null);
  const { addReports, fetchReportById, singleReport, updateReport } =
    useReportStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && reportId) {
      fetchReportById(reportId);
    }
  }, [reportId, isUpdate, fetchReportById]);

  const siteOptions = [
    { value: "gulfchlorine", label: "Gulfchlorine" },
    { value: "unionchlorine", label: "Unionchlorine" },
    { value: "omanchlorine", label: "Omanchlorine" },
  ];

  useEffect(() => {
    if (singleReport && isUpdate) {
      setValue("image", singleReport?.image);
      setValue("media.en", singleReport?.media?.en);
      setValue("media.ar", singleReport?.media?.ar);
      const selectedSite = singleReport?.site?.map((Id) =>
        siteOptions.find((option) => option?.value === Id)
      );
      setValue("site", selectedSite || []);
    }
  }, [singleReport, isUpdate, setValue]);

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
  
      const uploadFileSafely = async (file) => {
        if (!file) return "";
        try {
          const location = await new Promise((resolve, reject) => {
            uploadFileToS3(file, resolve, reject);
          });
          return location;
        } catch (error) {
          toast.error(`Failed to upload file: ${file.name || "unknown file"}`);
          throw error;
        }
      };
  
      // Upload files if provided
      const imageUrl = await uploadFileSafely(imageFile) || data.image;
      const mediaEnUrl = await uploadFileSafely(mediaFile) || data.media?.en;
      const mediaArUrl = await uploadFileSafely(mediaFileAr) || data.media?.ar;
  
      // Construct the formData
      const formData = {
        image: imageUrl,
        media: {
          en: mediaEnUrl,
          ar: mediaArUrl,
        },
        site: data.site.map((i) => i.value),
      };
  
      if (isUpdate && reportId) {
        await updateReport(reportId, formData);
      } else {
        await addReports(formData);
      }
  
      reset();
      navigate("/reports");
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{ padding: 3 }}
      bgcolor={"white"}
      borderRadius={"12px"}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {/* Photo Upload */}
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Photo
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Photo is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledCropImage
                    label="Upload Photo here"
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file);
                    }}
                    isUpdate={isUpdate}
                    value={value}
                  />
                  {errors.image && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* English Media Upload */}
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              English Media
            </Typography>
            <Controller
              name="media.en"
              control={control}
              defaultValue=""
              rules={{ required: "English Media is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload PDF here"
                    onChange={(file) => {
                      setMediaFile(file);
                      onChange(file);
                    }}
                    isUpdate={isUpdate}
                    value={value}
                  />
                  {errors.media?.en && (
                    <span style={{ color: "red" }}>
                      {errors.media.en.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Arabic Media Upload */}
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Arabic Media
            </Typography>
            <Controller
              name="media.ar"
              control={control}
              defaultValue=""
              rules={{ required: "Arabic Media is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload PDF here"
                    onChange={(file) => {
                      setMediaFileAr(file);
                      onChange(file);
                    }}
                    isUpdate={isUpdate}
                    value={value}
                  />
                  {errors.media?.ar && (
                    <span style={{ color: "red" }}>
                      {errors.media.ar.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Site Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Site
            </Typography>
            <Controller
              name="site"
              control={control}
              defaultValue=""
              rules={{ required: "Site is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    isMulti
                    placeholder="Choose the Site"
                    options={siteOptions}
                    {...field}
                  />
                  {errors.site && (
                    <span style={{ color: "red" }}>{errors.site.message}</span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={(event) => handleClear(event)}
              />
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddReport;
