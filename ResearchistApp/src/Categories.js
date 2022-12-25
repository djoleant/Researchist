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


export default function Categories(props) {
  const [search, setSearch] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  
  const { id } = useParams();
  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:5211/api/Category/GetCategories",
      {
        credentials: "include",
      }
    );

    const fetchData = await response.json();
    console.log(fetchData);
    setCategoryData(fetchData);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const navigate = useNavigate();

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
          {CategoryData.map((info, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <PaperCard
                title={info.name}
                id={info.id}
              />
            </Grid>
          ))}
        </Paper>
      </React.Fragment>
    </Container>
  );
}
