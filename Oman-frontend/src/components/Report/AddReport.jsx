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
import { uploadDocs } from "../../api/adminapi";
import StyledSelectField from "../../ui/StyledSelectField";

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
      setValue("media", singleReport?.media);
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
      let imageUrl = data?.image || "";
      let mediaUrl = data?.media || "";

      const uploadFile = async (file) => {
        try {
          const response = await uploadDocs(file);
          return response.data;
        } catch (error) {
          console.error("Failed to upload file:", error);
          throw error;
        }
      };

      if (imageFile) {
        try {
          imageUrl = await uploadFile(imageFile);
        } catch (error) {
          return;
        }
      }

      if (mediaUrl) {
        try {
          mediaUrl = await uploadFile(mediaFile);
        } catch (error) {
          return;
        }
      }

      const formData = {
        image: imageUrl,
        media: mediaUrl,
        site: data?.site.map((i) => i.value),
      };
      if (isUpdate && reportId) {
        await updateReport(reportId, formData);
      } else {
        await addReports(formData);
      }
      reset();
      navigate("/reports");
    } catch (error) {
      toast.error(error.message);
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
                  <StyledEventUpload
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
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Media
            </Typography>
            <Controller
              name="media"
              control={control}
              defaultValue=""
              rules={{ required: "Media is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Pdf here"
                    onChange={(file) => {
                      setMediaFile(file);
                      onChange(file);
                    }}
                    isUpdate={isUpdate}
                    value={value}
                  />
                  {errors.media && (
                    <span style={{ color: "red" }}>{errors.media.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Site
            </Typography>
          </Grid>
          <Grid item xs={12}>
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
