import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Divider,
  Stack,
  TablePagination,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";
import { ReactComponent as ViewIcon } from "../assets/icons/ViewIcon.svg";
import { ReactComponent as LeftIcon } from "../assets/icons/LeftIcon.svg";
import { ReactComponent as RightIcon } from "../assets/icons/RightIcon.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledButton } from "./StyledButton";
import moment from "moment";
import { useListStore } from "../store/listStore";

const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 14px;
    padding: 16px;

    text-align: center;

    font-weight: 600;
  }
  &.${tableCellClasses.body} {
    font-size: 14px;
    background-color: #fff;
    padding: 16px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.87);
    text-align: center;
  }
`;

const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
  cursor: ${({ showEdit }) => (showEdit ? "pointer" : "default")};
  &:hover {
    background-color: ${({ showEdit }) => (showEdit ? "#f0f0f0" : "inherit")};
  }
`;

const StyledTable = ({
  columns,
  onSelectionChange,
  onView,
  onDelete,
  onModify,
  onAction,
  menu,
  news,
  pageNo,
  setPageNo,
  onDeleteRow,
  member,
  payment,
  college,
  rowPerSize,
  setRowPerSize,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState(null);
  const baseURL = import.meta.env.VITE_API_IMAGE_URL;
  const { lists, totalCount, rowChange, loading } = useListStore();
  const handleSelectAllClick = (event) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked ? lists.map((row) => row._id) : [];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    const newSelectedIds = isChecked
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };
  const handleRowDelete = (id) => {
    onDeleteRow(id);
    handleMenuClose();
  };
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setRowId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setRowId(null);
  };

  const handleView = (rowId) => {
    onView(rowId);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
    setSelectedIds([]);
    handleMenuClose();
  };
  const handleAction = () => {
    onAction(rowId);
    handleMenuClose();
  };

  const handleModify = () => {
    onModify(rowId);
    handleMenuClose();
  };

  const handleRowClick = (id) => {
    onView(id);
  };

  const isSelected = (id) => selectedIds.includes(id);

  const getStatusVariant = (status) => {
    if (typeof status === "boolean") {
      return status ? "green" : "red";
    }
    switch (status) {
      case "gulfchlorine":
        return "#FF9F00";
      case "omanchlorine":
        return "#C62828";
      case "active":
        return "#4CAF50";
      case "unionchlorine":
        return "#9E9E9E";
      case "cancelled":
        return "#FF5722";
      case "published":
        return "#3F51B5";
      case "unpublished":
        return "#9C27B0";
      case "created":
        return "#FFC107";
      case "live":
        return "#03A9F4";
      default:
        return "#607D8B";
    }
  };
  const formatIndianDate = (date) => {
    return moment.utc(date).format("DD-MM-YYYY");
  };

  const formatTime = (time) => {
    return moment(time).format("h:mm A");
  };

  const pageInc = () => {
    setPageNo((prev) => prev + 1);
  };
  const pageDec = () => {
    setPageNo((prev) => prev - 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowPerSize(parseInt(event.target.value, 10));
    setPageNo(1);
  };
  return (
    <Box bgcolor={"white"} borderRadius={"16px"}>
      <TableContainer sx={{ border: "none" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  checked={
                    lists &&
                    lists.length > 0 &&
                    selectedIds.length === lists.length
                  }
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.field}
                  padding={column.padding || "normal"}
                >
                  {column.title}
                </StyledTableCell>
              ))}
              <StyledTableCell padding="normal"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell padding="checkbox">
                    <Skeleton variant="rectangular" width={24} height={24} />
                  </StyledTableCell>

                  {columns.map((column) => (
                    <StyledTableCell key={column.field}>
                      <Skeleton variant="text" width="100%" height={20} />
                    </StyledTableCell>
                  ))}

                  <StyledTableCell>
                    <Box display="flex" alignItems="center">
                      <Skeleton variant="circular" width={24} height={24} />

                      <Skeleton
                        variant="circular"
                        width={24}
                        height={24}
                        sx={{ marginLeft: 1 }}
                      />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : lists.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={columns.length + 2}>
                  <Typography variant="h7" textAlign="center">
                    No data
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              lists.map((row) => (
                <StyledTableRow
                  role="checkbox"
                  key={row._id}
                  selected={isSelected(row._id)}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row._id)}
                      onChange={(event) =>
                        handleRowCheckboxChange(event, row._id)
                      }
                    />
                  </StyledTableCell>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.field}
                      padding={column.padding || "normal"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRowClick(row._id)}
                    >
                      {[
                        "renewal",
                        "expiryDate",
                        "date",
                        "createdAt",
                        "startDate",
                        "endDate",
                      ].includes(column.field) ? (
                        formatIndianDate(row[column.field])
                      ) : [
                          "startTime",
                          "endtime",
                          "time",
                          "updatedAt",
                        ].includes(column.field) ? (
                        formatTime(row[column.field])
                      ) : [
                          "banner_image_url",
                          "image",
                          "event image",
                          "speaker_image",
                          "media",
                        ].includes(column.field) ? (
                        <>
                          <img
                            src={`${baseURL}${row[column.field]}`}
                            alt={column.title}
                            style={{ width: "50px", height: "50px" }}
                          />{" "}
                        </>
                      ) : column.field === "site" ? (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {Array.isArray(row[column.field]) ? (
                            row[column.field].map((site, index) => (
                              <span
                                key={index}
                                style={{
                                  backgroundColor: getStatusVariant(site),
                                  padding: "3px 8px",
                                  borderRadius: "100px",
                                  color: "#fff",
                                  marginRight: "5px", // Add margin between badges
                                }}
                              >
                                {site === true || site === "activated"
                                  ? "active"
                                  : site === false || site === "deactivated"
                                  ? "inactive"
                                  : site}
                              </span>
                            ))
                          ) : (
                            <span
                              style={{
                                backgroundColor: getStatusVariant(
                                  row[column.field]
                                ),
                                padding: "3px 8px",
                                borderRadius: "100px",
                                color: "#fff",
                              }}
                            >
                              {row[column.field] === true ||
                              row[column.field] === "activated"
                                ? "active"
                                : row[column.field] === false ||
                                  row[column.field] === "deactivated"
                                ? "inactive"
                                : row[column.field]}
                            </span>
                          )}
                        </Box>
                      ) : row[column.field] &&
                        typeof row[column.field] === "object" ? (
                        // Check if the column contains an object with 'en' and 'ar' fields
                        <>
                          {row[column.field].en && (
                            <Typography variant="body1">
                              {row[column.field].en}
                            </Typography>
                          )}
                          {row[column.field].ar && (
                            <Typography variant="body1" sx={{ color: "#888" }}>
                              {row[column.field].ar}
                            </Typography>
                          )}
                        </>
                      ) : (
                        row[column.field]
                      )}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell padding="normal">
                    <Box display="flex" alignItems="center">
                      {onView && (
                        <IconButton
                          aria-controls="simple-view"
                          aria-haspopup="true"
                          onClick={() => handleView(row._id)}
                        >
                          <ViewIcon />
                        </IconButton>
                      )}{" "}
                      {!menu &&
                        row.status !== "rejected" &&
                        row.status !== "approved" && (
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, row._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        )}
                      <Menu
                        id="row-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && rowId === row._id}
                        onClose={handleMenuClose}
                      >
                        {news
                          ? [
                              <>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem onClick={handleAction}>
                                  Publish/Unpublish
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Remove
                                </MenuItem>
                              </>,
                            ]
                          : member
                          ? [
                              <>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Delete
                                </MenuItem>
                              </>,
                            ]
                          : payment
                          ? [
                              <>
                                <MenuItem onClick={handleModify}>
                                  Approve
                                </MenuItem>
                                <MenuItem onClick={handleAction}>
                                  Reject
                                </MenuItem>
                              </>,
                            ]
                          : college
                          ? [
                              <>
                                <MenuItem onClick={handleView}>
                                  View Details
                                </MenuItem>
                                <MenuItem onClick={handleAction}>
                                  Add Member
                                </MenuItem>
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Delete
                                </MenuItem>
                              </>,
                            ]
                          : [
                              <>
                                {" "}
                                <MenuItem onClick={handleModify}>Edit</MenuItem>
                                <MenuItem
                                  onClick={() => handleRowDelete(row._id)}
                                  style={{ color: "red" }}
                                >
                                  Remove
                                </MenuItem>
                              </>,
                            ]}
                      </Menu>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Divider />
        <Stack
          // padding={2}
          component="div"
          direction={"row"}
          justifyContent={selectedIds.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {selectedIds.length > 0 && (
            <Stack direction="row" alignItems="center">
              <Typography paddingRight={3}>
                {`${selectedIds.length} item${
                  selectedIds.length > 1 ? "s" : ""
                } selected`}
              </Typography>
              <StyledButton
                variant="primary"
                name="Delete"
                onClick={() => handleDelete(selectedIds)}
              />
            </Stack>
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <TablePagination
                component="div"
                rowsPerPage={rowPerSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to }) =>
                  `${pageNo}-${Math.ceil(
                    totalCount / rowPerSize
                  )} of ${totalCount}`
                }
                ActionsComponent={({ onPageChange }) => (
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    marginLeft={2}
                  >
                    {" "}
                    <Box
                      onClick={pageDec}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: pageNo > 1 ? "pointer" : "not-allowed",
                        opacity: pageNo > 1 ? 1 : 0.5,
                      }}
                    >
                      <LeftIcon />{" "}
                    </Box>
                    <Box
                      onClick={pageInc}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor:
                          pageNo < Math.ceil(totalCount / rowPerSize)
                            ? "pointer"
                            : "not-allowed",
                        opacity:
                          pageNo < Math.ceil(totalCount / rowPerSize) ? 1 : 0.5,
                      }}
                    >
                      {" "}
                      <RightIcon />{" "}
                    </Box>
                  </Stack>
                )}
              />
            </Box>
          </Stack>
        </Stack>
      </TableContainer>
    </Box>
  );
};

export default StyledTable;
