import { Box } from "@mui/material";
import { type ReactNode } from "react";
import MainNavbar from "../navbar/MainNavbar";

interface Layoutprops {
  children: ReactNode;
}
// PageLayout.tsx
export default function PageLayout({ children }: Layoutprops) {
  return (
    <Box>
      <MainNavbar />
      <Box sx={{ pt: "80px" }}>
        {/* hilangkan p={2}, biar full width */}
        {children}
      </Box>
    </Box>
  );
}
