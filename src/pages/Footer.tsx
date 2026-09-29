import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Logo from "../assets/img/promptaraLogo.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        width: "100%", // full width background
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 40%, #AEFFF1 100%)",
        // boxShadow: "0px -4px 12px 0px rgba(0,0,0,0.1)",
        mt: 8,
      }}
    >
      {/* Konten center */}
      <Container
        maxWidth="lg" // bisa sm, md, lg sesuai kebutuhan
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          py: 4,
        }}
      >
        {/* Logo & Deskripsi */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img src={Logo} style={{ width: "80px" }} />
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#00000078",
              mt: 2,
            }}
          >
            There are many variations passages of Lorem Ipsum available, but the
            majority have
          </Typography>
        </Box>

        {/* Quick Link */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            Quick Link
          </Typography>
          <Typography sx={{ mt: 2 }}>Home</Typography>
          <Typography>About</Typography>
          <Typography>Shop</Typography>
          <Typography>Contact</Typography>
        </Box>

        {/* Contact */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
            Contact
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "16px" }}>
            +62 xxxxxxxxxxxxx <br /> Patricia C. Amedee <br />
            4401 Waldeck Street Grapevine <br />
            Nashville, Tx 76051
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            color: "white",
            display: "flex",
            maxWidth: isMobile ? "45%" : "15%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon sx={{ color: "#42c7ccff" }} />
          </IconButton>

          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon sx={{ color: "#42c7ccff" }} />
          </IconButton>

          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon sx={{ color: "#42c7ccff" }} />
          </IconButton>

          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon sx={{ color: "#42c7ccff" }} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
