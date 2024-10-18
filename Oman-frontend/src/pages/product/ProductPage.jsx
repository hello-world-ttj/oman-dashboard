import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";
import { productColumns } from "../../assets/json/TableData";
import { useProductStore } from "../../store/productStore";

const ProductPage = () => {
  const navigate = useNavigate();
  const { deleteProducts } = useProductStore();
  const { fetchProduct } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchProduct(filter);
  }, [isChange, pageNo, row]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteProducts(id)));
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
      await deleteProducts(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
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
            Products
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton
            variant={"primary"}
            name={"Add Product"}
            onClick={() => {
              navigate("/products/product");
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
            columns={productColumns}
            onModify={(id) => {
              navigate("/products/product", {
                state: { productId: id, isUpdate: true },
              });
            }}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            rowPerSize={row}
            setRowPerSize={setRow}
            onDeleteRow={handleRowDelete}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
