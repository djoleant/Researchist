import { Button, Card, Divider, Typography, Grid, Checkbox, Link } from "@mui/material";

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
        <Card variant="outlined" sx={{ p: 2, width: "100%" }}>
            <Grid container>

                <Grid container item xs={12}>

                    <Grid item xs={10} sx={{ display: "flex", flexDirection: "row" }}>
                        <Link href={link} variant="h5" align="left" sx={{ align: "left" }}>{title}</Link>
                    </Grid>
                    <Grid item xs={2} sx={{ display: "flex", flexDirection: "row-reverse" }}>
                        <Checkbox

                            checked={selected}
                            onChange={handleSelect}
                        />
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