import { Box } from "@mui/material";
import { useState, type JSX } from "react";
import LoginCard from "../components/card/LoginCard";
import RegistrationCard from "../components/card/RegistrationCard";

export default function Login(): JSX.Element {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);
  return (
    // <Box
    //   sx={{
    //     position: "relative",
    //     width: "100%",
    //     minHeight: "100vh",
    //     backgroundImage: `url(${loginBackground})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "100%",
    //       height: "100%",
    //       bgcolor: "rgba(0,0,0,0.4)",
    //       zIndex: 1,
    //     }}
    //   />
    // </Box>

    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        minHeight: "97vh",
        zIndex: 2,
      }}
    >
      {isLoginView && <LoginCard setIsLoginView={setIsLoginView} />}
      {!isLoginView && <RegistrationCard setIsLoginView={setIsLoginView} />}
    </Box>
  );
}
