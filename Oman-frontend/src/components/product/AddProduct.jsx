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

      const formData = {
        title: {
          en: data?.en_title,
          ar: data?.ar_title,
        },
        description: {
          en: data?.en_description,
          ar: data?.ar_description,
        },
        image:
          "data:image/jpeg;base64,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",
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
