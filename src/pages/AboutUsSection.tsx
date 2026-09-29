import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import img from "../assets/img/exampleAbout.jpeg";

export default function AboutUsSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 12 },
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {/* Section 1 */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "32px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt="about"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        />
        <Box sx={{ maxWidth: "480px", textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: 700, mb: 2, color: "#222" }}
          >
            Our Mission: Helping Millions of Organizations Grow Better
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#555",
              fontWeight: 400,
            }}
          >
            We believe not just in growing bigger, but in growing better. And
            growing better means aligning the success of your own business with
            the success of your customers. Win-win!
          </Typography>
        </Box>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "32px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt="story"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        />
        <Box sx={{ maxWidth: "480px", textAlign: "center" }}>
          <Typography
            sx={{ fontSize: "22px", fontWeight: 700, mb: 2, color: "#222" }}
          >
            Our Story
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#555",
              fontWeight: 400,
            }}
          >
            In 2004, fellow MIT graduate students Brian Halligan and Dharmesh
            Shah noticed a major shift in the way people shop and purchase
            products. Buyers didn’t want to be interrupted by ads, they wanted
            helpful information. In 2006, they founded HubSpot to help companies
            use that shift to grow better with inbound marketing. Along the way,
            HubSpot expanded beyond marketing into a crafted, not cobbled suite
            of products that create the frictionless customer experience that
            buyers expect today.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}
