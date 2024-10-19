import { Box, Grid, Typography, Stack, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import uploadFileToS3 from "../../utils/s3Upload";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemberStore } from "../../store/Memberstore";
import { uploadDocs } from "../../api/adminapi";

const AddMember = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { memberId, isUpdate } = location.state || {};
  const { addMembers, fetchMemberById, member, updateMember, loading } =
    useMemberStore();

  const [loadings, setLoadings] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (isUpdate && memberId) {
      fetchMemberById(memberId);
    }
  }, [memberId, isUpdate]);
  const typeOptions = [
    { value: "team", label: "Team Member" },
    { value: "board", label: "Board Member" },
  ];
  const siteOptions = [
    { value: "gulfchlorine", label: "Gulfchlorine" },
    { value: "unionchlorine", label: "Unionchlorine" },
    { value: "omanchlorine", label: "Omanchlorine" },
  ];
  useEffect(() => {
    if (isUpdate && member) {
      setValue("en_name", member?.name?.en || "");
      setValue("ar_name", member?.name?.ar || "");

      setValue("en_designation", member?.designation?.en || "");
      setValue("ar_designation", member?.designation?.ar || "");
      const selectedSite = member?.site?.map((Id) =>
        siteOptions.find((option) => option?.value === Id)
      );
      setValue("site", selectedSite || []);
      setValue("en_bio", member?.bio?.en || "");
      setValue("ar_bio", member?.bio?.ar || "");
      setValue("image", member?.image || "");

      const selectedType = typeOptions?.find(
        (item) => item?.value === member?.type
      );
      setValue("type", selectedType || "");
    }
  }, [member, isUpdate, setValue]);

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    setImageFile(null);
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoadings(true);
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
        name: {
          en: data?.en_name,
          ar: data?.ar_name,
        },
        designation: {
          en: data?.en_designation,
          ar: data?.ar_designation,
        },
        site: data?.site.map((i) => i.value),
        type: data?.type.value,
        bio: {
          en: data?.en_bio,
          ar: data?.ar_bio,
        },
        image: imageUrl,
      };
      if (isUpdate) {
        await updateMember(memberId, formData);
      } else {
        await addMembers(formData);
      }
      reset();
      navigate("/members");
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
                  Name
                </Typography>{" "}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="en_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name in English is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the Name in English"
                        {...field}
                      />
                      {errors.en_name && (
                        <span style={{ color: "red" }}>
                          {errors.en_name.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="ar_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name in Arabic is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        textAlign="right"
                        placeholder="ادخل الاسم"
                        {...field}
                      />
                      {errors.ar_name && (
                        <span style={{ color: "red" }}>
                          {errors.ar_name.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Designation
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="en_designation"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Designation in English required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the Designation in English"
                        {...field}
                      />
                      {errors.en_designation && (
                        <span style={{ color: "red" }}>
                          {errors.en_designation.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="ar_designation"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Designation in Arabic required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        textAlign="right"
                        placeholder="ادخل المسمى الوظيفي"
                        {...field}
                      />
                      {errors.ar_designation && (
                        <span style={{ color: "red" }}>
                          {errors.ar_designation.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Photo
                </Typography>
              </Grid>
              <Grid item xs={12}>
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
                        <span style={{ color: "red" }}>
                          {errors.image.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Type
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Choose the Type"
                        options={typeOptions}
                        {...field}
                      />
                      {errors.type && (
                        <span style={{ color: "red" }}>
                          {errors.type.message}
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
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Bio
                </Typography>{" "}
              </Grid>{" "}
              <Grid item xs={6}>
                <Controller
                  name="en_bio"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Bio in English is required" }}
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField placeholder="Bio" {...field} />
                      {errors.en_bio && (
                        <span style={{ color: "red" }}>
                          {errors.en_bio.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="ar_bio"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Bio  in Arabic is required" }}
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        textAlign="right"
                        placeholder="أدخل السيرة الذاتية"
                        {...field}
                      />
                      {errors.ar_bio && (
                        <span style={{ color: "red" }}>
                          {errors.ar_bio.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    onClick={(event) => handleClear(event)}
                  />
                  <StyledButton
                    name={loadings ? "Saving..." : "Save"}
                    variant="primary"
                    type="submit"
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}{" "}
    </>
  );
};

export default AddMember;
