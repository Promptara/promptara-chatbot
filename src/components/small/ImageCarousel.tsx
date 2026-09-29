import { useState, useEffect } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type ImageCarouselProps = {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
};

export default function ImageCarousel({
  images,
  autoPlay = true,
  interval = 2000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false); // state pause
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const maxVisible = 5;
  const itemWidth = 100 / maxVisible;
  const maxIndex = Math.max(images.length - maxVisible, 0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setDirection("prev");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setDirection("next");
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (direction === "next") {
          if (prev >= maxIndex) {
            setDirection("prev");
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setDirection("next");
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, direction, maxIndex, isHovered]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
        overflow: "hidden",
        py: 2,
      }}
    >
      {/* Tombol Prev */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
        disabled={currentIndex === 0}
      >
        <ChevronLeft />
      </IconButton>

      {/* Container Images */}
      <Box
        sx={{
          display: "flex",
          transition: "transform 0.6s ease-in-out",
          transform: `translateX(-${currentIndex * itemWidth}%)`,
          // width: `${(images.length / maxVisible) * 100}%`,
          width: "auto",
          gap: 2,
        }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt={`img-${i}`}
            sx={{
              width: `${itemWidth}%`,
              height: isMobile ? 80 : 180,
              objectFit: "cover",
              borderRadius: 4,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.25)",
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ))}
      </Box>

      {/* Tombol Next */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          zIndex: 2,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "#f5f5f5" },
        }}
        disabled={currentIndex >= maxIndex}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
