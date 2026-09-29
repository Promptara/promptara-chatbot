import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useShowPassword from "../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";
import Logo from "../assets/Logo.png";

export default function Register(): JSX.Element {
  const { showPassword, handleClickShowPassword } = useShowPassword();
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/Register");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        width: "100%",
        flexDirection:"column",
        mt:"250px",
        // height: "100vh", 
        bgcolor: "#ffffffff",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 700,
          bgcolor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 40,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.43)",
          p: 5,
          zIndex: 1,
        }}
      >
         <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src={Logo} alt="Logo" style={{ width: "120px", height: "auto" }} />
    </Box>
        {/* Judul */}
        {/* <Typography
          sx={{
            color: "#1f839cff",
            fontWeight: 700,
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          Belajar
        </Typography> */}
        {/* <Typography
          sx={{
            color: "#000000",
            fontSize: "10px",
            textAlign: "center",
            mb: 3,
            mt: 0.5,
          }}
        >
          Powered by 
        </Typography> */}

        {/* Input */}
        <Stack spacing={3} sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{ color: "#000000", fontWeight: 500, fontSize: "14px" }}
            >
              Enter Your Name
            </Typography>
            <TextField
              type="text"
              placeholder="Enter Your Name"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: { height: "40px",borderRadius:"30px" },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{ color: "#000000", fontWeight: 500, fontSize: "14px" }}
            >
              Enter Your Email Address
            </Typography>
            <TextField
              type="email"
              placeholder="Enter Your Email Address"
              variant="outlined"
              fullWidth
              InputProps={{ sx: { height: "40px",borderRadius:'30px' } }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              sx={{ color: "#000000", fontWeight: 500, fontSize: "14px" }}
            >
              Enter Your Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: { height: "40px" ,borderRadius:"30px"},
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      <VisibilityIcon
                        sx={{
                          color: showPassword ? "#5c008b" : "#cecece",
                          width: 20,
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            onClick={handleClick}
            sx={{
              mt: 3,
              fontSize: "15px",
              boxShadow: "none",
              bgcolor: "#125840",
              color: "#fff",
              textTransform: "none",
              borderRadius: 40,
              width: "50%",
              height: "60%",
              ":hover": { bgcolor: "#298a68ff" },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
