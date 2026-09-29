import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Logo from "../../assets/Logo.png";
import CustomButtonFilled from "../button/CustomButtonFilled";
import { useNavigate } from "react-router-dom";
import useShowPassword from "../../hooks/useShowPassword";

export default function LoginCard({ setIsLoginView }: any) {
  const { showPassword, handleClickShowPassword } = useShowPassword();
  const navigate = useNavigate();

  const handleRegistrationView = () => {
    setIsLoginView(false);
  };

  const handleClick = (): void => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 600,
        bgcolor: "#ffffff",
        borderRadius: 16,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.35)",
        p: 5,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="Logo" style={{ width: "120px", height: "auto" }} />
      </Box>

      {/* Input */}
      <Stack spacing={3} sx={{ width: "100%" }}>
        {/* Email */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{ color: "#000000", fontWeight: 500, fontSize: "14px" }}
          >
            Email Address
          </Typography>
          <TextField
            type="email"
            placeholder="Enter Your Email Address"
            variant="outlined"
            fullWidth
            InputProps={{ sx: { height: "40px", borderRadius: "12px" } }}
          />
        </Box>

        {/* Password */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            sx={{ color: "#000000", fontWeight: 500, fontSize: "14px" }}
          >
            Password
          </Typography>
          <TextField
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            variant="outlined"
            fullWidth
            InputProps={{
              sx: { height: "40px", borderRadius: "12px" },
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

      {/* Forgot Password */}
      <Box sx={{ mt: "15px" }}>
        <Link
          href="/reset-password"
          variant="body2"
          underline="hover"
          sx={{
            color: "#71cad2",
            fontWeight: 600,
          }}
        >
          Lupa Password?
        </Link>
      </Box>

      {/* Login Button */}
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
          text="Login"
          type="button"
          variant="outlined"
        />
        {/* <Button
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
            Login
          </Button> */}
      </Box>

      {/* Register Link */}
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
          Belum punya akun?{" "}
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
          Registrasi Sekarang
        </Button>
      </Box>
    </Box>
  );
}
