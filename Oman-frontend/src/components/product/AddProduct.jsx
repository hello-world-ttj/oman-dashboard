import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { useProductStore } from "../../store/productStore";
import { uploadDocs } from "../../api/adminapi";

const AddProduct = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const { productId, isUpdate } = location?.state || {};
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { addProducts, fetchProductById, singleProduct, updateProduct } =
    useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && productId) {
      fetchProductById(productId);
    }
  }, [productId, isUpdate, fetchProductById]);
  useEffect(() => {
    if (singleProduct && isUpdate) {
      setValue("en_title", singleProduct?.title?.en);
      setValue("ar_title", singleProduct?.title?.ar);
      setValue("en_description", singleProduct?.description?.en);
      setValue("ar_description", singleProduct?.description?.ar);
      setValue("image", singleProduct?.image);
    }
  }, [singleProduct, isUpdate, setValue]);
const handleClear = (event) => {
  event.preventDefault();
  navigate(-1);
}
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
          en: data?.en_title,
          ar: data?.ar_title,
        },
        description: {
          en: data?.en_description,
          ar: data?.ar_description,
        },
        image: imageUrl,
      };
      if (isUpdate && productId) {
        await updateProduct(productId, formData);
      } else {
        await addProducts(formData);
      }
      reset();
      navigate("/products");
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
            <Typography variant="h6" color="textSecondary">
              Description
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="en_description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Type the content here"
                    {...field}
                  />
                  {errors.en_description && (
                    <span style={{ color: "red" }}>
                      {errors.en_description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="ar_description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    textAlign="right"
                    placeholder="اكتب المحتوى هنا"
                    {...field}
                  />
                  {errors.ar_description && (
                    <span style={{ color: "red" }}>
                      {errors.ar_description.message}
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

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton name="Cancel" variant="secondary" onClick={(event) => handleClear(event)} />
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

export default AddProduct;
