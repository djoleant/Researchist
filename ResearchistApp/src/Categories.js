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

export default function Categories(props) {
  const [search, setSearch] = useState("");

  const getCategories = async () => {
    const response = await fetch(
      "http://localhost:5211/api/HomeController2/GetCategories"
    );
    if (response.ok) {
      const fetchData = await response.json();
      console.log(fetchData);
      setCategoryData(fetchData.Categories);
      console.log(CategoryData);
    }
  };

  const [CategoryData, setCategoryData] = useState({
    Categories: [
      {
        id: "",
        title: ""
      },
    ],
  });

  useEffect(() => {
    getCategories();
  }, []);

  const navigate = useNavigate();

  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4 }} variant="outlined">
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item xs={12} style={{ padding: "10px", maxWidth: 500 }}>
              <TextField
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                id="outlined-basic-email"
                label="Search by Category name"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            ></Typography>
          </Box>

          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            {CategoryData.Categories.filter((c) =>
              c.title.toLowerCase().includes(search.toLowerCase())
            ).map((card, index) => {
              return (
                <Grid item key={index}>
                  <Card
                    style={{ width: 380, height: 230, cursor: "pointer" }}
                    onClick={() => {
                      navigate("/Category/" + card.id);
                    }}
                  >
                    <CardMedia />

                    <CardActions
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        style={{
                          textAlign: "center",
                          fontWeight: "1000",
                          marginLeft: 7,
                          fontSize: 20,
                        }}
                      >
                        
                      </Typography>
                      {/* <Typography style={{textAlign:"center"}}>{card.about}</Typography> */}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
