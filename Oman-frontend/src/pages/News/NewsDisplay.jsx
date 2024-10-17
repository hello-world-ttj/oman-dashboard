import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledTable from "../../ui/StyledTable";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { StyledButton } from "../../ui/StyledButton";
import NewsPreview from "../../components/News/NewsPreview";
import { newsColumns } from "../../assets/json/TableData";
import { useNewsStore } from "../../store/newsStore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";

export default function NewsDisplay() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const { deleteNews, fetchNewsById, singleNews } = useNewsStore();
  const { fetchNews } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteNews(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteNews(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    if (search) {
      filter.search = search;
    }
    filter.limit = row;
    if (selectedTab) {
      filter.category = selectedTab;
    }
    fetchNews(filter);
  }, [isChange, pageNo, search,selectedTab,row]);
  const handleEdit = (id) => {
    navigate(`/news/edit/${id}`);
  };
  const handlePreview = async (id) => {
    await fetchNewsById(id);
    setPreviewOpen(true);
  };
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleChange = () => {
    setIsChange(!isChange);
  };
console.log("anjana",search);

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15PX"}
        alignItems={"center"}
        marginRight={2}
      >
        <Stack direction={"row"} spacing={2}>
        <StyledSearchbar placeholder={"Search"} onchange={(e) => setSearch(e.target.value)} />
        </Stack>
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            name="All"
            variant={selectedTab === "All" ? "primary" : "secondary"}
            onClick={() => handleTabChange("All")}
          />
          <StyledButton
            name="Latest"
            variant={selectedTab === "Latest" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Latest")}
          />
          <StyledButton
            name="Business"
            variant={selectedTab === "Business" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Business")}
          />
          <StyledButton
            name="Market"
            variant={selectedTab === "Politics" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Politics")}
          />
          <StyledButton
            name="Economy"
            variant={selectedTab === "Entertainment" ? "primary" : "secondary"}
            onClick={() => handleTabChange("Entertainment")}
          />
        </Stack>
      </Stack>
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <StyledTable
          columns={newsColumns}
          news
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          onSelectionChange={handleSelectionChange}
          onModify={handleEdit}
          pageNo={pageNo}
          setPageNo={setPageNo}
          onAction={handlePreview}
          rowPerSize={row}
          setRowPerSize={setRow}
        />{" "}
        <NewsPreview
          open={previewOpen}
          onClose={handleClosePreview}
          onChange={handleChange}
          data={singleNews}
          onEdit={() => handleEdit(singleNews._id)}
        />
      </Box>
    </>
  );
}
