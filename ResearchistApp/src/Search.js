import React, { useState, useEffect } from "react";
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import PaperCard from "./components/Categories/PaperCard";
import { useParams } from "react-router-dom";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { id, param } = useParams();
  const getSearchData = async () => {
    const response = await fetch(
      "http://localhost:5211/api/Home/Search/" + param,
      {
        credentials: "include",
        method: "GET",
      }
    );

    const fetchData = await response.json();
    console.log(fetchData);
    setSearchData(fetchData);
  };

  useEffect(() => {
    getSearchData();
    // setSearchData("");
  }, []);

  const navigate = useNavigate();

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
          <Typography variant="h6" align="left">
            UNDER CONSTRUCTION
          </Typography>
          <Grid item xs={12} style={{ padding: "10px", maxWidth: 500 }}>
            <TextField
              onChange={(event) => {
                setSearch(event.target.value);
                console.log("Search", search);
                getSearchData();
                console.log(searchData);
              }}
              id="outlined-basic-email"
              label="Expand your knowledge..."
              variant="outlined"
              fullWidth
            />
          </Grid>

          {searchData.people !== undefined || searchData.people != null
            ? searchData.people.map((info, index) =>
                info.people !== null ? (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <PaperCard title={info.name} id={info.id} />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <PaperCard title={info.papers.title} id={info.papers.id} />
                  </Grid>
                )
              )
            : console.log("searchData is undef or null")}

          {searchData.papers !== undefined || searchData.papers != null
            ? searchData.papers.map((info, index) =>
                info.papers !== null ? (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <PaperCard title={info.title} id={info.id} />
                  </Grid>
                ) : (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <PaperCard title={info.papers.title} id={info.papers.id} />
                  </Grid>
                )
              )
            : console.log("searchData is undef or null")}
        </Paper>
      </React.Fragment>
    </Container>
  );
}
