import PageLayout from "../../../components/layout";
import Footer from "../../Footer";
import { Box, Typography } from "@mui/material";
import MainContentCard from "../../../components/card/MainContentCard";
import ImgListCustom from "../../../components/card/ImgListCustom";

export default function ProductPage() {
  return (
    <>
      <PageLayout>
        <Box
          sx={{
            minHeight: "90vh",
            mt: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 4,
            }}
          >
            <Box sx={{ width: "65%" }}>
              <MainContentCard />
            </Box>
            <Box
              sx={{
                width: "40%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <ImgListCustom />
              <Typography>Description</Typography>
            </Box>
          </Box>
          <Typography>hi</Typography>
        </Box>
      </PageLayout>
      <Footer />
    </>
  );
}
