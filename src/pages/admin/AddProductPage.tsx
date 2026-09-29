"use client";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import ImageUploader from "./ImageUploader";

export default function AddProductPage() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [imageData, setImageData] = useState({
    imageName: "",
    imageType: "",
    imageData: "",
  });

  const handleImageChange = (image: {
    imageName: string;
    imageType: string;
    imageData: string;
  }) => {
    setImageData(image);
  };

  useEffect(() => {
    console.log("Preview images (with prefix):", images);
    logBase64Only(images);
  }, [images]);

  function getBase64Only(arr: string[]): string[] {
    return arr.map((img) => img.split(",")[1]);
  }

  function logBase64Only(arr: string[]) {
    const base64Only = getBase64Only(arr);
    base64Only.forEach((b64, i) => {
      console.log(`Image ${i + 1} base64 only:`, b64);
    });
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        description: description,
        image: imageData.imageData,
        category,
      };

      console.log("Payload:", payload);

      await axios.post(
        "http://localhost/backendPromptara/api/add_product.php",
        payload
      );

      alert("Produk berhasil ditambahkan!");
      setName("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan produk");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Tambah Produk
      </Typography>

      {/* Nama Produk */}
      <TextField
        fullWidth
        label="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        name="namaProduk"
      />

      {/* Deskripsi */}
      <TextField
        fullWidth
        label="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={4}
        name="deskripsiProduk"
      />
      <TextField
        fullWidth
        label="Kategori Produk"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
        name="deskripsiProduk"
      />

      {/* Upload Gambar */}
      <Typography fontWeight={600} mt={2} mb={1}>
        Gambar Produk
      </Typography>

      <ImageUploader onChange={handleImageChange} />

      {/* Button Submit */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Simpan Produk
        </Button>
      </Box>
    </Box>
  );
}
