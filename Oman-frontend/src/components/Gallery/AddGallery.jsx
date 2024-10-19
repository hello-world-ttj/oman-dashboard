import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { uploadDocs } from "../../api/adminapi";
import { useGalleryStore } from "../../store/galleryStore";
import StyledSelectField from "../../ui/StyledSelectField";

const AddGallery = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { groupId, isUpdate } = location?.state || {};
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { addGallerys, fetchGalleryById, singleGallery, updateGallery } =
    useGalleryStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && groupId) {
      fetchGalleryById(groupId);
    }
  }, [groupId, isUpdate, fetchGalleryById]);
  const siteOptions = [
    { value: "gulfchlorine", label: "Gulfchlorine" },
    { value: "unionchlorine", label: "Unionchlorine" },
    { value: "omanchlorine", label: "Omanchlorine" },
  ];
  useEffect(() => {
    if (singleGallery && isUpdate) {
      setValue("en_title", singleGallery?.title?.en);
      setValue("ar_title", singleGallery?.title?.ar);
      setValue("image", singleGallery?.image);
      const selectedSite = singleGallery?.site?.map((Id) =>
        siteOptions.find((option) => option?.value === Id)
      );
      setValue("site", selectedSite || []);
    }
  }, [singleGallery, isUpdate, setValue]);
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";

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

      const formData = {
        title: {
          en: data.en_title,
          ar: data.ar_title,
        },
        image: imageUrl,
        site: data?.site.map((i) => i.value),
      };
      if (isUpdate && groupId) {
        await updateGallery(groupId, formData);
      } else {
        await addGallerys(formData);
      }
      reset();
      navigate("/gallery");
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Title
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="en_title"
              control={control}
              defaultValue=""
              rules={{ required: "Title in English is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the Title in English"
                    {...field}
                  />
                  {errors.en_title && (
                    <span style={{ color: "red" }}>
                      {errors.en_title.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="ar_title"
              control={control}
              defaultValue=""
              rules={{ required: "Title in Arabic is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    textAlign="right"
                    placeholder="أدخل العنوان"
                    {...field}
                  />
                  {errors.ar_title && (
                    <span style={{ color: "red" }}>
                      {errors.ar_title.message}
                    </span>
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

export default AddGallery;
