"use client";
import { Button } from "@mui/material";
import type { SxProps } from "@mui/system";
import type { ReactNode } from "react";

/* komponen CustomButtonFilled
    props:
    - type?: "button" | "submit" (tipe button)
    - disabled?: boolean (disable button)
    - variant?: "contained" | "outlined" | "text" (variant button)
    - color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" (warna button)
    - size?: "small" | "medium" | "large" (ukuran button)
    - text?: ReactNode (teks button)
    - onClick?: () => void (event onClick button)
    - fullWidth?: boolean (lebar button)
    - sx?: SxProps (style button)
    - children?: ReactNode (children button)

    variant "contained" = button dengan latar belakang berwarna
    variant "outlined" = button dengan border berwarna dan latar belakang transparan
    variant "text" = button dengan teks berwarna dan latar belakang transparan
    warna button: "primary" = hijau, "secondary" = abu-abu, "error" = merah, "info" = biru, "success" = hijau, "warning" = kuning

    size "small" = 32px, "medium" = 36px, "large" = 40px
    disabled = true (button tidak bisa diklik dan berwarna abu-abu)
    disabled = false (button bisa diklik dan berwarna sesuai variant dan color)
    fullWidth = true (button memenuhi lebar container)
    fullWidth = false (button sesuai dengan lebar teks)
    sx = {} (style tambahan untuk button)




    contoh penggunaan:
    <CustomButtonFilled text="Lanjutkan" onClick={() => {}} />


*/

interface CustomButtonFilledProps {
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  text?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  sx?: SxProps;
  children?: ReactNode;
}

export default function CustomButtonFilled({
  type = "submit",
  disabled = false,
  variant = "contained",
  color = "primary",
  size = "medium",
  text = "Lanjutkan",
  onClick,
  fullWidth = true,
  sx = {},
  children,
}: CustomButtonFilledProps) {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      fullWidth={fullWidth}
      sx={{
        bgco: disabled ? "#A8A8BD" : "#71cad2",
        color: "white",
        textTransform: "none",
        fontSize: "12px",
        "&.Mui-disabled": {
          backgroundColor: "#A8A8BD",
          color: "white",
        },
        ...(variant === "outlined" && {
          backgroundColor: disabled ? "#A8A8BD" : "#71cad2",
          border: `1px solid ${disabled ? "#A8A8BD" : "#71cad2"}`,
          color: "white",
          "&:hover": {
            backgroundColor: "inherit",
            color: "#71cad2",
          },
        }),
        // "&:hover": {
        //   backgroundColor: "#71cad2",
        //   color: "white",
        // },
        ...sx,
      }}
    >
      {children || text}
    </Button>
  );
}
