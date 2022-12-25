import {
  Button,
  Card,
  Divider,
  Typography,
  Grid,
  Checkbox,
  Link,
  linkClasses,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaperCard({
  title = "Title",
  date,
  description = "Description...",
  type,
  link,
  selected = false,
  handleSelect,
  id,
}) {
  const navigate = useNavigate();

  return (
    <Card variant="outlined" sx={{ p: 3, width: "100%" }}>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={10} sx={{ display: "flex", flexDirection: "column" }}>
            <Link
              href={
                type === "people" ?
                  "http://localhost:3000/ProfilePage/" + id
                  :
                  "http://localhost:3000/PaperInfoPage/" + id
              }
              variant="h5"
              align="left"
              sx={{ align: "left" }}
            >
              {title}
            </Link>
          </Grid>

          <Typography
            variant="subtitle1"
            align="left"
            sx={{ display: description == undefined ? "none" : "" }}
          >
            {description}
          </Typography>
          <Typography
            variant="subtitle1"
            align="left"
            sx={{ display: date == undefined ? "none" : "" }}
          >
            {date}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
