import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "../../assets/img/promptaraLogo.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import DrawerCustom from "./DrawerCustom";

export default function MainNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // Menu items dengan route
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Free Product", path: "/freeProduct" },
    { label: "Digital Produk", path: "/digitalProduk" },
    { label: "Kelas Online", path: "/kelasOnline" },
    { label: "Login", path: "/login" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: `
          0 1px 2px rgba(0, 0, 0, 0.08), 
          0 3px 6px rgba(0, 0, 0, 0.16), 
          0 10px 20px rgba(0,0,0,0.19)`,
        minHeight: isMobile ? "0px" : "70px",
        height: isMobile ? "10%" : "70px",
        alignItems: "center",
        gap: 4,
        position: "fixed",
        width: "100%",
        zIndex: 999,
        bgcolor: "white",
        justifyContent: isMobile ? "space-between" : "left",
        background:
          "white"
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          ml: isMobile ? 0 : 20,
        }}
        onClick={() => navigate("/")}
      >
        <Avatar src={Logo} sx={{ cursor: "pointer" }} />
        <Typography
          sx={{ color: "#42c7ccff", fontWeight: 600, cursor: "pointer" }}
        >
          Promptara.ai
        </Typography>
      </Box>

      {/* Menu */}
      {isMobile && (
        <>
          <DrawerCustom />
        </>
      )}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "space-between",
            ml: 8,
            width: "60%",
            flexWrap: "wrap",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                ":hover": { bgcolor: "inherit" },
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                color:
                  location.pathname === item.path ? "#42c7ccff" : "#777777",
                borderBottom:
                  location.pathname === item.path
                    ? "2px solid #42c7ccff"
                    : "2px solid transparent",
                borderRadius: 0,
                width: "fit-content",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}
