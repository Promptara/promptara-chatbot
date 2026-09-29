import { Card } from "@mui/material";
import BannerImg from "../../assets/img/MainBannerImg.png";

export default function MainContentCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "580px",
        width: "100%",
        boxShadow: "0px 8px 20px 0px #DDDDDD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "24px",
      }}
    >
      <img src={BannerImg} alt="Banner" />
    </Card>
  );
}
