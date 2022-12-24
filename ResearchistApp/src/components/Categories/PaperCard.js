import { Button, Card, Divider, Typography, Grid, Checkbox, Link } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import SkillChips from "../InternshipPage/SkillChips";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaperCard({
    title = "Title",
    date,
    description = "Description...",
    selected = false,
    handleSelect,
    id
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, width: "100%" }}>
            <Grid container>

                <Grid container item xs={12}>

                    <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
                        <Link href={"http://localhost:3000/Categories/" + id} variant="h5" align="left" sx={{ align: "left" }}>{title}</Link>
                    </Grid>

                    <Typography variant="subtitle1" align="left" sx={{ display: date == undefined ? "none" : "" }}>{date}</Typography>
                </Grid>

            </Grid>
        </Card>
    )
}