import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import PageLayout from "../components/layout";
import MainContentCard from "../components/card/MainContentCard";
import ProductCard from "../components/card/ProductCard";
import imgDummy from "../assets/img/imgDummy.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CheckCircleOutline,
  Smartphone,
  Security,
  Update,
  School,
  Group,
} from "@mui/icons-material";
import Footer from "./Footer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function Dashboard() {
  interface FAQItem {
    question: string;
    answer: string;
  }

  const faqData: FAQItem[] = [
    {
      question: "Apa itu layanan ini?",
      answer:
        "Layanan ini adalah platform yang membantu kamu mengelola data secara efisien dengan tampilan modern.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Ya, semua data diamankan dengan enkripsi end-to-end dan standar keamanan tingkat tinggi.",
    },
    {
      question: "Bagaimana cara mendaftar?",
      answer:
        "Klik tombol 'Daftar' di halaman utama, lalu isi formulir registrasi dengan data yang benar.",
    },
    {
      question: "Apakah ada biaya berlangganan?",
      answer:
        "Kami menyediakan paket gratis dan paket berbayar sesuai kebutuhan pengguna.",
    },
  ];

  // const [openIndex, setOpenIndex] = useState<number | null>(null);

  // const toggleFAQ = (index: number) => {
  //   setOpenIndex(openIndex === index ? null : index);
  // };

  const items = [
    {
      icon: <CheckCircleOutline sx={{ fontSize: 90 }} />,
      title: "Newbie Friendly",
      desc: "Pembelajaran di Promptara disusun dari yang paling basic sampai ke tahapan yang advance",
    },
    {
      icon: <Smartphone sx={{ fontSize: 90 }} />,
      title: "Akses Pake Hp",
      desc: "Semua pembelajaran bisa diakses pake hp, bahkan hp kentang sekalipun",
    },
    {
      icon: <Security sx={{ fontSize: 90 }} />,
      title: "Pembayaran Aman",
      desc: "Pembayaran menggunakan sistem yang terpercaya dan terdaftar di OJK",
    },
    {
      icon: <Update sx={{ fontSize: 90 }} />,
      title: "Free Update",
      desc: "Cukup bayar sekali kamu bisa dapetin materi baru secara gratis",
    },
    {
      icon: <School sx={{ fontSize: 90 }} />,
      title: "Mentor Berpengalaman",
      desc: "Belajar dengan ahlinya akan lebih cepat bisa dan mudah dipahami",
    },
    {
      icon: <Group sx={{ fontSize: 90 }} />,
      title: "Group Support",
      desc: "Bangun relasi dan belajar bersama dengan teman-teman di komunitas belajar yang positif",
    },
  ];

  return (
    <>
      <PageLayout>
        {/* <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
            p: 0,
          }}
        > */}
        {/* Main Content */}
        <Box id="home" sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
          <MainContentCard />
        </Box>

        <Box
          sx={{
            width: "100%",
            margin: 0,
            padding: 0,
            mt: 4,
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              lineHeight: "28px",
              fontWeight: 600,
              textAlign: "center",
              color: "#26394d",
            }}
          >
            Upgrade Skill Digitalmu Dengan Berbagai E-Course Terbaik Bersama
            Mentor-mentor terbaik kami yang berpengalaman Dan Hasilkan Cuan
            Tambahan Dengan Menjual Produk Digital Terbaik Dari Kami
          </Typography>
        </Box>
        {/* About Us */}
        {/* <Box
            id="about"
            sx={{ width: "100%", maxWidth: 900, mt: 8, mx: "auto" }}
          >
            {" "}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Typography
                sx={{ color: "#777777", fontSize: "24px", fontWeight: 600 }}
              >
                About Us
              </Typography>
            </Box>
            <AboutUsSection />
          </Box> */}

        <Box
          sx={{
            minHeight: "110vh",
            width: "100%",
            bgcolor: "#7fdde1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 8,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 6,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Mengapa Harus Di Promptara ?
          </Typography>

          <Grid container spacing={18} maxWidth="lg" justifyContent="center">
            {items.map((item) => (
              <Box
                sx={{
                  textAlign: "center",
                  color: "white",
                  px: 2,
                  maxWidth: "30%",
                }}
              >
                {item.icon}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mt: 2, mb: 1, fontSize: "28px" }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, mt: 2, mb: 1, fontSize: "18px" }}
                >
                  {item.desc}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
        {/* Product Grid */}
        <Box
          id="shop"
          sx={{ width: "100%", maxWidth: 1200, mt: 8, mx: "auto" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "22px",
                lineHeight: "26px",
                fontWeight: 600,
                textAlign: "center",
                color: "#26394d",
              }}
            >
              Dapatkan Kelas Dan Produk Digital Terbaik Yang Bisa Kamu Jual Lagi
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gap: 4,
              mt: 2,
              gridTemplateColumns: {
                xs: "1fr", // mobile 1 kolom
                sm: "repeat(2, 1fr)", // tablet 2 kolom
                md: "repeat(3, 1fr)", // laptop 3 kolom
                lg: "repeat(3, 1fr)", // layar besar 4 kolom
              },
            }}
          >
            {Array.from({ length: 10 }).map((_) => (
              <ProductCard
                image={imgDummy}
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                price={49000}
                sales={66}
                revenue={1900.08}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            py: 8,
            textAlign: "center",
            bgcolor: "#fff",
          }}
        >
          {/* Heading */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#1e3a5f", mb: 2 }}
          >
            Pilih Produk Yang Mau Kamu Beli Sekarang !
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f7931e",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              px: 3,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": { bgcolor: "#e67e00" },
            }}
          >
            Dapatkan Produknya Disini
          </Button>

          {/* Sub Heading */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, mt: 6, mb: 4, color: "#1e3a5f" }}
          >
            Ada pertanyaan? Hubungi Kami Disini
          </Typography>

          {/* Card Profile */}
          <Box>
            <Avatar
              src="/logo.png" // ganti dengan path logo kamu
              alt="Cuan Kreatif"
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                bgcolor: "#5a4fcf",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
              Promptara
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              Hasilkan Cuan Dengan Cara Gacor
            </Typography>

            {/* Buttons */}
            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  bgcolor: "#25d366",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(255,0,0,0.2)", // efek glow pink
                  "&:hover": { bgcolor: "#1ebe5d" },
                }}
              >
                Whatsapp
              </Button>
              <Button
                variant="contained"
                startIcon={<TelegramIcon />}
                sx={{
                  bgcolor: "#0088cc",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 3,
                  py: 1,
                  borderRadius: "30px",
                  boxShadow: "0 4px 12px rgba(255,0,0,0.2)",
                  "&:hover": { bgcolor: "#007ab8" },
                }}
              >
                Telegram
              </Button>
            </Stack>
          </Box>
        </Box>
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            FAQ
          </Typography>
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              sx={{ borderRadius: 3, mb: 2, boxShadow: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
        {/* </Stack> */}
      </PageLayout>
      <Box id="contact">
        <Footer />
      </Box>
    </>
  );
}
