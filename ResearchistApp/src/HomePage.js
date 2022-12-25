//to be implemented
import { useState, useEffect } from "react";
import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

// home page - samo pretraga ( za ostalo videti kasnije)

export default function HomePage(props) {

  const theme = useTheme();
  console.log(theme);

  const navigate = useNavigate();

  // const [searchData, setSearchData] = useState(null);

  const [search, setSearch] = useState("");

  // const getSearchData = async () => {
  //   const response = await fetch("http://localhost:5211/api/Home/Search/" + search);

  //   console.log(search);
  //   if (response.ok) {
  //       const fetchData = await response.json();
  //       console.log(fetchData);
  //       setSearchData(fetchData);
  //   }
  // };

  const update = () => {
    //getSearchData();
    props.reloadHeader();
}

  return (
    <Box>
      <CssBaseline />
      <React.Fragment>
        <Paper style={{width:"70%",height:1000, margin: "auto", opacity:"80%"}}>

        {/* //   opacity:"80%",
        //   backgroundImage: theme.palette.mode === 'dark' ?
        //     "url(" + process.env.PUBLIC_URL + "/images/im.jpg" + ")"
        //     : "url(" + process.env.PUBLIC_URL + "/images/im.jpg" + ")" */}
        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
        <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={theme.palette.mode === 'dark' ? process.env.PUBLIC_URL + "/images/rdark.png" : process.env.PUBLIC_URL + "/images/researchist.png"}
                sx={{ width: 400, height: 190, marginRight: 1, justifySelf: "center", marginTop:20 }}
              />
          <Typography style={{ alignSelf: "center", fontSize: 32, fontWeight: 800, marginTop: 10, color: "#7E32B0"}}> Where research begins.</Typography>
        </Grid>

        <Grid fullwidth style={{ marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "10%" }}>
        </Grid>
        {/* <Divider style={{ marginTop: 10, marginBottom: 20 }}></Divider> */}
        <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Grid container xs={12} md={6} lg={6} style={{ display: "flex", flexDirection: "row", padding: "10px", width: "90%", justifyContent: "center", alignItems: "center" }}>
                            <TextField style={{ marginBottom: 5 }}
                                onChange={(event) => { setSearch(event.target.value) }}
                                id="outlined-basic-email"
                                label="Start typing..."
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Button
                            sx={{ m: 1, borderRadius: 50, backgroundColor:"#7E32B0" }}
                            variant="contained"
                            href={"/Search/" + search}  //ovo treba da vodi do djoletove stranice
                        >
                            {" "}
                            <SearchIcon size="large" />
                        </Button>

                    </Grid>

      </Paper>
      </React.Fragment>
      
    </Box>
  );

}