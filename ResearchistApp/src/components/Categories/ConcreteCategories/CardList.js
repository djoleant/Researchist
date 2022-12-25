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
        "http://localhost:5211/api/Category/GetPapersFromCategory/" + id,
        {
          credentials: "include",
        }
      );
    } else if (type === "people") {
      response = await fetch(
        "http://localhost:5211/api/Category/GetPeopleFromCategory/" + id,
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
            title={type === "papers" ? info.title : info.name+" "+ info.surname}
            description={type === "papers" ? info.description : info.institution}
            date={type === "papers" ? info.date.split("T")[0] : info.contact}
            link={type === "papers" ? "localhost:3000/PaperInfoPage/" + info.id : "localhost:3000/ProfilePage/" + info.id}
          />
        </Grid>
      ))}
    </Grid>
  );
}
