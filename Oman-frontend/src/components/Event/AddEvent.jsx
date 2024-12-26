import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack, LinearProgress } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton.jsx";
import StyledInput from "../../ui/StyledInput.jsx";
import { Controller, useForm } from "react-hook-form";
import { StyledEventUpload } from "../../ui/StyledEventUpload.jsx";
import uploadFileToS3 from "../../utils/s3Upload.js";
import { useEventStore } from "../../store/eventStore.js";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StyledSelectField from "../../ui/StyledSelectField.jsx";
import StyledCropImage from "../../ui/StyledCropImage.jsx";

export default function AddEvent({ setSelectedTab, isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();

  const { addEvent, updateEvent, fetchEventById, event, loading } =
    useEventStore();

  useEffect(() => {
    if (isUpdate && id) {
      fetchEventById(id);
    }
  }, [isUpdate, id, fetchEventById]);
  const siteOptions = [
    { value: "gulfchlorine", label: "Gulfchlorine" },
    { value: "unionchlorine", label: "Unionchlorine" },
    { value: "omanchlorine", label: "Omanchlorine" },
  ];
  useEffect(() => {
    if (event && isUpdate) {
      setValue("en_title", event?.title?.en);
      setValue("ar_title", event?.title?.ar);
      const selectedSite = event?.site?.map((Id) =>
        siteOptions.find((option) => option?.value === Id)
      );
      setValue("site", selectedSite || []);
      setValue("image", event.image);
      setValue("video", event.video);
    }
  }, [event, isUpdate, setValue]);

  const [imageFile, setImageFile] = useState(null);

  const handleClear = (event) => {
    event.preventDefault();
    if (isUpdate) {
      navigate("/events/list");
    }
    setSelectedTab(0);

    reset();
  };

  const onSubmit = async (data) => {
    try {
      setLoadings(true);
      let imageUrl = data?.event_image || "";
      if (imageFile) {
        try {
          imageUrl = await new Promise((resolve, reject) => {
            uploadFileToS3(
              imageFile,
              (location) => resolve(location),
              (error) => reject(error)
            );
          });
        } catch (error) {
          console.error("Failed to upload image:", error);
          return;
        }
      }

      const formData = {
        title: {
          en: data?.en_title,
          ar: data?.ar_title,
        },
        video: data?.video,
        image: imageUrl,
        site: data?.site.map((i) => i.value),
      };

      if (isUpdate && id) {
        await updateEvent(id, formData);
        navigate("/events/list");
      } else {
        await addEvent(formData);
        setSelectedTab(0);
      }

      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadings(false);
    }
  };
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
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
                  Name of event
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="en_title"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name of event is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the name of event"
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
                  rules={{ required: "Name of event is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        textAlign="right"
                        placeholder="ادخل الاسم"
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
              <Grid item xs={6}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Event Image
                </Typography>
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Image is required" }}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <StyledCropImage
                        label="Upload image here"
                        onChange={(file) => {
                          setImageFile(file);
                          onChange(file);
                        }}
                        isUpdate={isUpdate}
                        value={value}
                      />
                      {errors.image && (
                        <span style={{ color: "red" }}>
                          {errors.image.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Video
                </Typography>
                <Controller
                  name="video"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Video Url is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the youtube url"
                        {...field}
                      />
                      {errors.video && (
                        <span style={{ color: "red" }}>
                          {errors.video.message}
                        </span>
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
                        <span style={{ color: "red" }}>
                          {errors.site.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
                <Stack direction="row" spacing={2}>
                  <StyledButton
                    type="button"
                    onClick={handleClear}
                    variant={"secondary"}
                    name={"Clear"}
                  />

                  <StyledButton
                    name={loadings ? "Saving..." : "Save"}
                    type="submit"
                    loading={loadings}
                    variant={"primary"}
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}{" "}
    </>
  );
}
