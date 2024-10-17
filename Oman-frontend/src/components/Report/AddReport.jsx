import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import { StyledButton } from "../../ui/StyledButton";
import { useDropDownStore } from "../../store/dropDownStore";
import { useGroupStore } from "../../store/groupstore";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledEventUpload } from "../../ui/StyledEventUpload";

const AddReport = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { user, fetchListofUser } = useDropDownStore();
  const location = useLocation();
  const { groupId, isUpdate } = location?.state || {};
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { addGroups, fetchGroupById, singleGroup, updateGroup } =
    useGroupStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchListofUser();
  }, []);
  const option =
    user && Array.isArray(user)
      ? user?.map((i) => ({
          value: i?._id,
          label: i?.name,
        }))
      : [];
  useEffect(() => {
    if (isUpdate && groupId) {
      fetchGroupById(groupId);
    }
  }, [groupId, isUpdate, fetchGroupById]);
  useEffect(() => {
    if (singleGroup && isUpdate) {
      setValue("groupName", singleGroup?.groupName);
      setValue("groupInfo", singleGroup?.groupInfo);
      const participantOptions =
        singleGroup?.participants?.map((id) => {
          const matchedOption = option.find((opt) => opt?.value === id);
          return matchedOption;
        }) || [];
      setValue("participants", participantOptions);
    }
  }, [singleGroup, isUpdate, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const participants = data?.participants?.map((user) => user?.value);
      const formData = {
        participantIds: participants,
        groupName: data?.groupName,
        groupInfo: data?.groupInfo,
      };
      if (isUpdate && groupId) {
        await updateGroup(groupId, formData);
      } else {
        await addGroups(formData);
      }
      reset();
      navigate("/groups");
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
                      setImageFile(file);
                      onChange(file);
                    }}
                    value={value}
                  />
                  {errors.media && (
                    <span style={{ color: "red" }}>{errors.media.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton name="Cancel" variant="secondary" />
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
