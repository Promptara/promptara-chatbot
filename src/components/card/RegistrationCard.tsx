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
import Logo from "../../assets/Logo.png";
import useShowPassword from "../../hooks/useShowPassword";
import { useNavigate } from "react-router-dom";
import CustomButtonFilled from "../button/CustomButtonFilled";

export default function RegistrationCard({ setIsLoginView }: any) {
  const { showPassword, handleClickShowPassword } = useShowPassword();
  const navigate = useNavigate();

  const handleRegistrationView = () => {
    setIsLoginView(true);
  };

  const handleClick = (): void => {
    navigate("/");
    setIsLoginView(true);
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: 600,
        bgcolor: "white",
        borderRadius: 18,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.49)",
        p: 5,
        zIndex: 1,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <img src={Logo} alt="Logo" style={{ width: "120px", height: "auto" }} />
      </Box>

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
              sx: { height: "40px", borderRadius: "30px" },
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
            InputProps={{ sx: { height: "40px", borderRadius: "30px" } }}
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
              sx: { height: "40px", borderRadius: "30px" },
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
        <CustomButtonFilled
          onClick={handleClick}
          text="Register"
          type="button"
          variant="outlined"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#202020",
            fontWeight: 400,
          }}
        >
          Sudah punya akun?{" "}
        </Typography>
        <Button
          sx={{
            ":hover": { bgcolor: "inherit" },
            textTransform: "none",
            color: "#42c7ccff",
            fontWeight: 600,
            fontSize: "14px",
          }}
          onClick={handleRegistrationView}
        >
          Login Sekarang
        </Button>
      </Box>
    </Box>
  );
}
