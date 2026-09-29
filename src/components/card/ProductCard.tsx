import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

interface ProductCardProps {
  image: string;
  status?: "Published" | "Draft";
  title: string;
  price: number;
  sales: number;
  revenue: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  status = "Published",
  title,
  price,
  sales,
}) => {
  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <Card
      component={motion.div}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      sx={{
        maxWidth: 300,
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{
          objectFit: "contain",
          backgroundColor: "transparent",
          p: 1,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.25)",
          },
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.02)",
          },
        }}
      >
        {/* Status Chip */}
        <Chip
          label={status}
          size="small"
          sx={{
            width: "fit-content",
            fontWeight: 600,
            bgcolor: "#42c7ccff",
            color: "white",
          }}
        />

        {/* Title */}
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>

        {/* Price, Sales, Revenue */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Price
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            Rp {currencyFormatter.format(price)}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Sales
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {sales}
          </Typography>
        </Stack>

        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            Revenue
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            Rp {revenue.toFixed(2)}
          </Typography>
        </Stack> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
