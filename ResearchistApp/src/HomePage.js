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
import ComboBox from "./components/ComboBox";
import StarRateIcon from "@mui/icons-material/StarRate";
//import background from "./resources/stojny.jpg";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SearchIcon from '@mui/icons-material/Search';
import Search from "@mui/icons-material/Search";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

// home page - samo pretraga ( za ostalo videti kasnije)

export default function HomePage(props) {

  const theme = useTheme();
  console.log(theme);

  const navigate = useNavigate();

  const [searchData, setSearchData] = useState(null);

  const [search, setSearch] = useState("");

  const getSearchData = async () => {
    const response = await fetch("http://localhost:5211/api/Home/Search/" + search);

    console.log(search);
    if (response.ok) {
        const fetchData = await response.json();
        console.log(fetchData);
        setSearchData(fetchData);
    }
  };

  const update = () => {
    getSearchData();
    props.reloadHeader();
}

  return (
    <Box>
      <CssBaseline />
      <React.Fragment>

        <Grid fullwidth style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop:20 }}>
        <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={theme.palette.mode === 'dark' ? process.env.PUBLIC_URL + "/images/employer2.jpg" : process.env.PUBLIC_URL + "/images/researchist.png"}
                sx={{ width: 400, height: 190, marginRight: 1, justifySelf: "center" }}
              />
          <Typography style={{ alignSelf: "center", fontSize: 32, fontWeight: 800, marginTop: 10, marginBottom: 20 }}> Where research begins.</Typography>
        </Grid>

        <Grid fullwidth style={{ marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: "10%" }}>
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
                            sx={{ m: 1, borderRadius: 50 }}
                            variant="contained"
                            href="https://yahoo.com"
                        >
                            {" "}
                            <SearchIcon size="large" />
                        </Button>

                    </Grid>

                    {searchData== undefined || searchData.people.length == 0 ? (<Typography>Currently no people to display</Typography>) : ""}
                    {searchData != null && (
                        <Grid container spacing={2}
                        /*xs={12} md={6} lg={6}*/
                        >

                            {searchData.people
                                // .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))
                                .map((cards, index) => {
                                    // const { title, description, duration, compensation, skills, categories, id, address, wishlisted, picture, companyName } = cards;
                                    console.log(cards);
                                    return (
                                        <Grid item xs={12} md={6} lg={4}>
                                            {/* <SmallInternshipCard
                                                index={index}
                                                title={title}
                                                description={description}
                                                duration={duration}
                                                compensation={compensation}
                                                skills={skills}
                                                categories={categories}
                                                link={"/Internship/" + id}
                                                location={address}
                                                showBookmark={localStorage.getItem("role") === "Student"}
                                                wishlisted={wishlisted}
                                                internshipID={id}
                                                picture={picture}
                                                companyName={companyName}
                                            /> */}
                                        </Grid>

                                    );
                                })}
                        </Grid>
                    )}


      </React.Fragment>
    </Box>
  );

}