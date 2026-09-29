import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProductCard from "../../../components/card/ProductCard";
import PageLayout from "../../../components/layout";
import { useEffect, useState, useRef } from "react";
import Footer from "../../Footer";
import imgDummy from "../../../assets/img/imgDummy.png";
import ImageCarousel from "../../../components/small/ImageCarousel";

export default function CatalogPage() {
  const [changeType, setChangeType] = useState("canva");
  // const handleChangeType = (value: any) => {
  //   setChangeType(value);
  // };

  useEffect(() => {
    console.log(changeType);
  }, [changeType]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const templates = [
    { label: "Template Canva" },
    { label: "Template Ms Office" },
    { label: "Template Kaos" },
    { label: "Template Logo" },
    { label: "Template Ebook" },
    { label: "Template Prompt" },
  ];

  const images = Array(16).fill(imgDummy);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageLayout>
        <Box sx={{ mt: 4 }} />

        <Box
          sx={{
            position: "relative",
            // minWidth: "100%",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Scrollable Menu */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 2,
              px: 4,
              py: 2,
              pl: 1,
              mr: 3.5,
              "&::-webkit-scrollbar": { display: "none" },
              width: "70%",
              justifyContent: isMobile ? "flex-start" : "center",
            }}
          >
            {templates.map((item) => (
              <Typography
                key={item.label}
                onClick={() => setChangeType(item.label)}
                sx={{
                  color: "#444",
                  cursor: "pointer",
                  fontWeight: 600,
                  textDecoration: "none",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  fontSize: isMobile ? "12px" : "15px",
                  flexShrink: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    textDecoration: "none",
                    opacity: 0.95,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Floating Prev/Next Buttons */}
          {isMobile && (
            <>
              <IconButton
                onClick={() => scroll("left")}
                sx={{
                  position: "absolute",
                  left: 4,
                  bgcolor: "white",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={() => scroll("right")}
                sx={{
                  position: "absolute",
                  right: 33,
                  bgcolor: "white",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}
        </Box>

        <Typography
          sx={{
            textTransform: "capitalize",
            color: "#777777",
            fontSize: "24px",
            lineHeight: "26px",
            ml: isMobile ? "40%" : "50%",
            mt: 2,
          }}
        >
          {changeType}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            mt: 4,
            ml: isMobile ? 5 : 0,
            maxWidth: "95vw",
            gridTemplateColumns: {
              xs: "1fr", // mobile 1 kolom
              sm: "repeat(2, 1fr)", // tablet 2 kolom
              md: "repeat(3, 1fr)", // laptop 3 kolom
              lg: "repeat(4, 1fr)", // layar besar 4 kolom
            },
          }}
        >
          {Array.from({ length: 10 }).map((_) => (
            <ProductCard
              image={imgDummy}
              title="Color Mastery in Web Design: A Guide to Creating Visually Stunning Websites"
              price={49}
              sales={66}
              revenue={1900.08}
            />
          ))}
        </Box>

        <Box sx={{ mt: 8 }} />
        <ImageCarousel images={images} />
      </PageLayout>
      <Footer />
    </>
  );
}
