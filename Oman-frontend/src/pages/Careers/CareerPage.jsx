import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useNavigate } from "react-router-dom";
import { careerColumns } from "../../assets/json/TableData";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";
import { useCareerStore } from "../../store/careerStore";
import CareerView from "../../components/Career/CareerView";

const CareerPage = () => {
  const navigate = useNavigate();
  const { deleteCareers, fetchCareerById, singleCareer } = useCareerStore();
  const { fetchCareer } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchCareer(filter);
  }, [isChange, pageNo, row]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteCareers(id)));
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
      await deleteCareers(id);
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
            Careers
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            variant={"primary"}
            name={"Add Career"}
            onClick={() => {
              navigate("/careers/career");
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
            columns={careerColumns}
            onModify={(id) => {
              navigate("/careers/career", {
                state: { groupId: id, isUpdate: true },
              });
            }}
            onView={async (id) => {
              await fetchCareerById(id);
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
          <CareerView
            open={open}
           onClose={handleClose}
            data={singleCareer}
          />
        </Box>
      </Box>
    </>
  );
};

export default CareerPage;
