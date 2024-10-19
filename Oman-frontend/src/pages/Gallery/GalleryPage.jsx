import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";
import { useGalleryStore } from "../../store/galleryStore";
import GalleryView from "../../components/Gallery/GalleryView";
import { galleryColumns } from "../../assets/json/TableData";

const GalleryPage = () => {
  const navigate = useNavigate();
  const { deleteGallerys, fetchGalleryById, singleGallery } = useGalleryStore();
  const { fetchGallery} = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchGallery(filter);
  }, [isChange, pageNo, row]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteGallerys(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteGallerys(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h4" color="textSecondary">
            Gallery
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            variant={"primary"}
            name={"Add Gallery"}
            onClick={() => {
              navigate("/gallery/gallery");
            }}
          />
        </Stack>
      </Stack>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar placeholder={"Search"} />
          </Stack>
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={galleryColumns}
            onModify={(id) => {
              navigate("/gallery/gallery", {
                state: { groupId: id, isUpdate: true },
              });
            }}
            onView={async (id) => {
              await fetchGalleryById(id);
              setOpen(true);
            }}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            rowPerSize={row}
            setRowPerSize={setRow}
            onDeleteRow={handleRowDelete}
          />
          <GalleryView open={open} onClose={handleClose} data={singleGallery} />
        </Box>
      </Box>
    </>
  );
};

export default GalleryPage;
