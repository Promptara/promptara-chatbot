import React, {
  useState,
  type DragEvent,
  type ChangeEvent,
  useRef,
} from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageData {
  image: string | null;
  imageBase64: string;
  type: string;
  name: string;
  loading: boolean;
  error: string;
}

interface ImageUploaderProps {
  onChange: (image: {
    imageName: string;
    imageType: string;
    imageData: string;
  }) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [image, setImage] = useState<ImageData>({
    image: null,
    imageBase64: "",
    type: "",
    name: "",
    loading: false,
    error: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ];
    return validTypes.includes(file.type);
  };

  const validateDimensions = (
    file: File,
    callback: (isValid: boolean) => void
  ) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      callback(img.width <= 8000 && img.height <= 4000);
    };
  };

  const handleFileUpload = (file: File) => {
    if (validateFile(file)) {
      validateDimensions(file, (isValid) => {
        if (isValid) {
          const reader = new FileReader();
          setImage((prevImage) => ({ ...prevImage, loading: true, error: "" }));

          reader.onload = () => {
            setTimeout(() => {
              const base64 = (reader.result as string).split(",")[1];
              const updatedImage = {
                image: reader.result as string,
                imageBase64: base64,
                type: file.type,
                name: file.name,
                loading: false,
                error: "",
              };
              setImage(updatedImage);

              onChange({
                imageData: updatedImage.imageBase64,
                imageType: updatedImage.type,
                imageName: updatedImage.name,
              });
            }, 2000); // delay 2 detik
          };

          reader.readAsDataURL(file);
        } else {
          setImage((prevImage) => ({
            ...prevImage,
            error: "Dimensi gambar maksimal adalah 8000x4000 piksel.",
          }));
        }
      });
    } else {
      setImage((prevImage) => ({
        ...prevImage,
        error: "File harus berupa JPG, PNG, SVG, atau GIF.",
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDeleteImage = () => {
    setImage({
      image: null,
      imageBase64: "",
      type: "",
      name: "",
      loading: false,
      error: "",
    });
  };

  return (
    <>
      <Box
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          border: image.loading ? "2px dashed #8F85F3" : "2px dashed gray",
          borderRadius: "12px",
          textAlign: "center",
          width: "100%",
          height: "160px",
          backgroundColor: "inherit",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <input
          type="file"
          accept="image/jpeg, image/png, image/svg+xml, image/gif"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {image.loading ? (
          <CircularProgress sx={{ color: "#8F85F3" }} />
        ) : image.image ? (
          <>
            <img
              src={image.image}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <IconButton
              onClick={handleDeleteImage}
              sx={{
                position: "relative",
                top: 50,
                right: 8,
                bottom: 0,
                backgroundColor: "#FFF",
                borderRadius: "8px",
                padding: 1,
                border: "1px solid #8F85F3",
              }}
            >
              <DeleteIcon sx={{ color: "#8F85F3" }} />
            </IconButton>
          </>
        ) : (
          <Box>
            <TextSnippetIcon sx={{ color: "#7367F0" }} />
            <Typography
              sx={{
                color: "#A8A8BD",
                fontSize: "16px",
                lineHeight: "18px",
                fontWeight: 400,
              }}
            >
              Nama file.pdf (4mb)
            </Typography>
          </Box>
        )}
      </Box>
      {image.error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {image.error}
        </Alert>
      )}
    </>
  );
};

export default ImageUploader;
