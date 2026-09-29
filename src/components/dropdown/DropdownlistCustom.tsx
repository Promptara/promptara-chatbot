import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  CircularProgress,
  type SelectChangeEvent,
} from "@mui/material";

interface Option {
  value: number | string;
  label: string;
}

interface DropdownlistCustomProps {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  loading: boolean;
  disabled?: boolean;
}

export default function DropdownlistCustom({
  options,
  placeholder,
  onChange,
  defaultValue = "",
  loading,
  disabled = false,
}: DropdownlistCustomProps) {
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      sx={{
        bgcolor: "inherit",
      }}
    >
      <Select
        value={selectedOption}
        onChange={handleChange}
        disabled={disabled}
        displayEmpty
        startAdornment={loading ? <CircularProgress size={20} /> : null}
        sx={{
          width: "100%",
          color: "#555",
          bgcolor: "inherit",
          border: "1px solid #A8A8BD",
          borderRadius: "8px",
          height: "40px",
          transition: "border-color 0.3s ease-in-out",
          "&:hover": {
            borderColor: "#76B732",
          },
          "&.Mui-focused": {
            borderColor: "#76B732",
          },
          "& .MuiSelect-select": {
            padding: "0 16px",
          },
          "& fieldset": {
            border: "none",
          },
        }}
        inputProps={{ "aria-label": "select dropdown" }}
        MenuProps={{
          PaperProps: {
            sx: {
              animation: "fadeIn 0.2s ease-in-out",
              "@keyframes fadeIn": {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },
            },
          },
        }}
      >
        <MenuItem
          value=""
          sx={{
            color: "#76B732",
            maxWidth: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ml: "5%",
            mb: "2%",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#F0F0FF",
              color: "#76B732",
              // transform: "translateX(8px)",
              borderRadius: "16px",
              bgcolor: "#B9EB9280",
            },
            transition: "all 0.4s ease",
          }}
        >
          <em>{placeholder}</em>
        </MenuItem>

        {options.map((option, index) => (
          <MenuItem
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            value={option.value}
            sx={{
              color: "#76B732",
              maxWidth: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "16px",
              ml: "5%",
              mb: "2%",
              "&:hover": {
                backgroundColor: "#F0F0FF",
                color: "#76B732",
                // transform: "translateX(8px)",
                borderRadius: "16px",
                bgcolor: "#B9EB9280",
              },
              transition: "all 0.4s ease",
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
