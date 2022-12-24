import { Button, Card, Divider, Typography, Grid, Checkbox, Link } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaperCard({
    title = "Title",
    date,
    description = "Description...",
    selected = false,
    handleSelect,
    link
}) {

    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={{ p: 3, width: "100%" }}>
            <Grid container>

                <Grid container item xs={12}>

                    <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
                        <Link href={"http://" + link} variant="h5" align="left" sx={{ align: "left" }}>{title}</Link>
                    </Grid>

                    <Divider sx={{ width: "100%" }} />
                    <Typography variant="subtitle1" align="left" sx={{ display: date == undefined ? "none" : "" }}>{date}</Typography>
                </Grid>

            </Grid>
            <Grid container spacing={3}  >

                <Grid item xs={12} md={12}>

                    <Typography
                        align="left"
                        variant="body2"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                            mb: 1
                        }}
                    >
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}