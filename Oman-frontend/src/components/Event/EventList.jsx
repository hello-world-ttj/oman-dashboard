import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { eventList, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "../../store/eventStore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";
import EventView from "./EventView";

const EventList = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(10);
  const [open, setOpen] = useState(false);
  const { deleteEvent, fetchEventById, event } = useEventStore();
  const { fetchEvent } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    let filter = {};
    if (search) {
      filter.search = search;
    }
    filter.pageNo = pageNo;
    filter.limit = row;
    fetchEvent(filter);
  }, [isChange, pageNo, search, row]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteEvent(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteEvent(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  const handleView = async (id) => {
    await fetchEventById(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search"}
            onchange={(e) => {
              setSearch(e.target.value);
            }}
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
          columns={eventList}
          onSelectionChange={handleSelectionChange}
          onView={handleView}
          pageNo={pageNo}
          setPageNo={setPageNo}
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          rowPerSize={row}
          setRowPerSize={setRow}
          onModify={(id) => {
            navigate(`/events/edit/${id}`);
          }}
        />
        <EventView onClose={handleClose} open={open} data={event} />
      </Box>
    </Box>
  );
};

export default EventList;
