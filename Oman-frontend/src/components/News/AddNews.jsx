import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import StyledSelectField from "../../ui/StyledSelectField";
import StyledInput from "../../ui/StyledInput";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import { useNewsStore } from "../../store/newsStore";
import uploadFileToS3 from "../../utils/s3Upload";
import { toast } from "react-toastify";
import { uploadDocs } from "../../api/adminapi";

export default function AddNews({ isUpdate, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      category: null,
      title: "",
      image: "",
      content: "",
    },
  });
  const { singleNews, fetchNewsById, addNewses, updateNews } = useNewsStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClear = (event) => {
    event.preventDefault();
    navigate(-1);
  };
  const option = [
    { value: "Latest", label: "Latest" },
    { value: "Business", label: "Business" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Economy", label: "Economy" },
  ];
  const siteOptions = [
    { value: "gulfchlorine", label: "Gulfchlorine" },
    { value: "unionchlorine", label: "Unionchlorine" },
    { value: "omanchlorine", label: "Omanchlorine" },
  ];
  useEffect(() => {
    if (isUpdate && id) {
      fetchNewsById(id);
    }
  }, [id, isUpdate, fetchNewsById]);
  useEffect(() => {
    if (singleNews && isUpdate) {
      const selectedCategory = option.find(
        (item) => item?.value === singleNews.tag
      );
      setValue("category", selectedCategory || "");
      setValue("en_title", singleNews?.title?.en);
      setValue("ar_title", singleNews?.title?.ar);
      setValue("en_content", singleNews?.content?.en);
      setValue("ar_content", singleNews?.content?.ar);
      setValue("image", singleNews.image);
      const selectedSite = singleNews?.site?.map((Id) =>
        siteOptions.find((option) => option?.value === Id)
      );
      setValue("site", selectedSite || []);
      setValue("banner", singleNews.banner);
    }
  }, [singleNews, isUpdate, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = data?.image || "";
      let bannerUrl = data?.banner || "";

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

      if (bannerUrl) {
        try {
          bannerUrl = await uploadFile(bannerUrl);
        } catch (error) {
          return;
        }
      }

      const formData = {
        tag: data.category.value,
        title: {
          en: data.en_title,
          ar: data.ar_title,
        },
        content: {
          en: data.en_content,
          ar: data.ar_content,
        },
        image: imageUrl,
        site: data?.site.map((i) => i.value),
        banner: bannerUrl,
      };
      if (isUpdate && id) {
        await updateNews(id, formData);
      } else {
        await addNewses(formData);
        setSelectedTab(0);
      }

      
      navigate(`/news`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const baseURL = import.meta.env.VITE_API_IMAGE_URL;
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
              Choose Tag
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Latest"
                    options={option}
                    {...field}
                  />
                  {errors.category && (
                    <span style={{ color: "red" }}>
                      {errors.category.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Title
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="en_title"
              control={control}
              rules={{ required: "Title in english required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the news title" {...field} />
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
              rules={{ required: "Title in Arabic required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    textAlign="right"
                    placeholder="أدخل عنوان الخبر"
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
              Upload Photo
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              // rules={{ required: "File is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here" isUpdate={isUpdate}
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file);
                    }}
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
              Upload Banner
            </Typography>
            <Controller
              name="banner"
              control={control}
              defaultValue=""
              // rules={{ required: "File is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Banner here" isUpdate={isUpdate}
                    onChange={(file) => {
                      setBannerFile(file);
                      onChange(file);
                    }}
                    value={value}
                  />
                  {errors.banner && (
                    <span style={{ color: "red" }}>
                      {errors.banner.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary">
              Add content
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="en_content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Description in less than 500 words"
                    {...field}
                  />
                  {errors.en_content && (
                    <span style={{ color: "red" }}>
                      {errors.en_content.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="ar_content"
              control={control}
              rules={{ required: "Content in Arabic required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    textAlign="right"
                    placeholder="أضف وصفًا في أقل من 500 كلمة"
                    {...field}
                  />
                  {errors.ar_content && (
                    <span style={{ color: "red" }}>
                      {errors.ar_content.message}
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
                      <StyledSelectField isMulti
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
          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                onClick={(event) => handleClear(event)}
              />
              <StyledButton
                name={loading ? "Publishing" : "Publish"}
                variant="primary"
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
