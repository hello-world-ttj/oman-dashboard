import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Collapse,
  Dialog,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactComponent as ExpandMoreIcon } from "../assets/icons/ExpandMoreIcon.svg";
import { ReactComponent as LogoutIcon } from "../assets/icons/LogoutIcon.svg";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ApprovalOutlinedIcon from "@mui/icons-material/ApprovalOutlined";
import { useAdminStore } from "../store/adminStore";
const drawerWidth = 250;
const subNavigation = [
  // { name: "Dashboard", to: "/dashboard", icon: <GridViewIcon /> },
  { name: "Members", to: "/members", icon: <PeopleAltOutlinedIcon /> },
  { name: "Products", to: "/products", icon: <ScienceIcon /> },
  {
    name: "Events",
    icon: <EventNoteOutlinedIcon />,
    to: "/events/list",
  },

  { name: "Reports", to: "/reports", icon: <ApprovalOutlinedIcon /> },
  {
    name: "Careers",
    to: "/careers",
    icon: <CalendarMonthIcon />,
  },

  { name: "News and Updates", to: "/news", icon: <NewspaperOutlinedIcon /> },
];
const SimpleDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { singleAdmin, fetchAdminById } = useAdminStore();
  const handleLogout = () => {
    localStorage.removeItem("4ZbQwXtY8uVrN5mP7kL3JhF6");
    navigate("/");
  };
  useEffect(() => {
    fetchAdminById();
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          position: "fixed",
          top: 50,
          right: 50,
          m: 0,
          width: "270px",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Stack spacing={2} borderRadius={3} padding="10px" paddingTop={"20px"}>
        <Stack alignItems="center">
          <Typography variant="h7" color="#292D32" paddingBottom={1}>
            {singleAdmin?.name}
          </Typography>
          <Typography variant="h7" color="rgba(41, 45, 50, 0.44)">
            Admin
          </Typography>
        </Stack>{" "}
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          onClick={handleLogout}
          sx={{ cursor: "pointer" }}
        >
          <LogoutIcon />
          <Typography variant="h4" color="#000">
            Logout
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
};

const Layout = (props) => {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { singleAdmin } = useAdminStore();
  const location = useLocation();
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleClick = () => {
    setOpen(!open);
  };
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("4ZbQwXtY8uVrN5mP7kL3JhF6");
    navigate("/");
  };
  const drawer = (
    <div style={{ position: "relative", height: "100%" }}>
      <Toolbar
        sx={{
          height: "148px",
        }}
      >
        <Stack justifyContent={"flex-start"} spacing={2}>
          {/* <img src={logo} alt="Logo" width={"100%"} height="100%" /> */}
          <Typography fontWeight={600} fontSize={"16px"} color="#0C93D3">OMAN CHLORINE S.A.O.G</Typography>
        </Stack>
      </Toolbar>
      <List
        sx={{
          height: "600px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: 0,
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#a1a1a1",
            },
          },
        }}
      >
        {subNavigation.map((item) => (
          <ListItem
            sx={{ paddingBottom: "10px" }}
            key={item.name}
            disablePadding
          >
            <ListItemButton
              component={Link}
              to={item.to}
              sx={{
                marginLeft: "20px",
                marginRight: "10px",
                color: location.pathname === item.to ? "#2C2829" : "#5F6368",
                backgroundColor:
                  location.pathname === item.to ? "#F7F7F7" : "transparent",
                "&:hover": { color: "#2C2829", backgroundColor: "#F7F7F7" },
                "&:hover .MuiListItemIcon-root": { color: "#2C2829" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 24,
                  marginRight: 1,
                  color: location.pathname === item.to ? "#2C2829" : "#686465",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: "h7" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "left",
        }}
      ></List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: `white`,
          boxShadow: `none`,
        }}
      >
        <Toolbar
          sx={{
            height: "88px",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              alignItems: "flex-start",
              padding: "15px",
            }}
          >
            <IconButton
              color="#000"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box display={isMobile && "none"}> </Box>
            {/* <NotificationIcon /> */}
            <Box
              borderRadius="24px"
              padding={"5px 20px 5px 5px"}
              bgcolor={"#F7F7F7"}
              width={"200px"}
              color={"#000"}
              gap={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              onClick={handleDialogOpen}
              sx={{ cursor: "pointer", flexShrink: 0, marginLeft: "10px" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px" }}>
                  <Typography variant="h7" color={"#292D32"} display="block">
                    {singleAdmin?.name}
                  </Typography>
                  <Typography
                    variant="h7"
                    color={"rgba(41, 45, 50, 0.44)"}
                    display="block"
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
              <ExpandMoreIcon />
            </Box>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "#F3F3F3",
          paddingTop: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>{" "}
      <SimpleDialog open={dialogOpen} onClose={handleDialogClose} />
    </Box>
  );
};

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
