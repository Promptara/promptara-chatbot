"use client";
import { Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";
import type { ReactNode } from "react";

/* komponen CustomButtonUnfilled
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
    <CustomButtonUnfilled text="Lanjutkan" onClick={() => {}} />
*/

interface CustomButtonUnfilledProps {
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  children?: ReactNode;
  useImportStyle?: SxProps<Theme>;
}

export default function CustomButtonUnfilled({
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
  useImportStyle,
}: CustomButtonUnfilledProps) {
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
        ...(useImportStyle || {
          border: disabled ? "1px solid #A8A8BD" : "1px solid #6CBF47",
          backgroundColor: disabled ? "#6CBF47" : "inherit",
          color: disabled ? "#6CBF47" : "#6CBF47",
          fontSize: "12px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#DBDBDB",
          },
          "&.Mui-disabled": {
            backgroundColor: "#6CBF47",
            color: "#6CBF47",
          },
          ...(variant === "outlined" && {
            border: `1px solid ${disabled ? "#6CBF47" : "#6CBF47"}`,
          }),
          ...sx,
        }),
      }}
    >
      {children || text}
    </Button>
  );
}
