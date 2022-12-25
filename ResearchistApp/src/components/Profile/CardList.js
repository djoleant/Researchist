import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaperCard from "./PaperCard";

export default function CardList({ type }) {
  const [infos, setInfos] = useState([]);
  const theme = useTheme();

  const { id } = useParams();

  const getInformations = async () => {
    let response;
    if (type === "papers") {
      response = await fetch(
        "http://localhost:5211/api/Person/GetPapersFromPerson/" + id,
        {
          credentials: "include",
        }
      );
    } else if (type === "proceedings") {
      response = await fetch(
        "http://localhost:5211/api/Person/GetProceedings/" + id,
        {
          credentials: "include",
        }
      );
    } else return;
    const data = await response.json();
    console.log(data);
    setInfos(data);
  };

  useEffect(() => {
    getInformations();
  }, []);

  return (
    <Grid container spacing={3}>
      {console.log(infos)}
      {infos.map((info, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <PaperCard
            title={info.title}
            description={info.description}
            date={type === "papers" ? info.date.split("T")[0] : info.year}
            link={type === "papers" ? "localhost:3000/PaperInfoPage/" + info.id : "localhost:3000/ProceedingPage/" + info.id}
          />
        </Grid>
      ))}
    </Grid>
  );
}
