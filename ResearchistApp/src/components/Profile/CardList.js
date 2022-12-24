import { Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function CardList({ type }) {
    const [infos, setInfos] = useState([]);
    const theme = useTheme();

    const { id } = useParams();

    const getInformations = async () => {
        let response;
        if (type === "papers") {
            response = await fetch("http://localhost:5211/api/HomeController2/GetPapersFromPerson/" + id, {
                credentials: "include"
            });
        }
        else if (type === "proceedings") {
            response = await fetch("http://localhost:5211/api/HomeController2/GetProceedings/" + id, {
                credentials: "include"
            });
        }
        else
            return;
        const data = await response.json();
        console.log(data)
        if (data.succeeded)
            setInfos(data.infos);
    }

    useEffect(() => {
        getInformations();
    }, [])

    return (
        <Grid container spacing={3}>
            {
                infos.map((info, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                       
                    </Grid>
                ))
            }
        </Grid >
    )
}