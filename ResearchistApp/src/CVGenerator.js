import React, { useEffect, useState, createRef } from 'react';
import {
    Grid,
    Paper,
    CssBaseline,
    Box,
    Button,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Select,
    MenuItem,
    Switch
} from "@mui/material";
import CVView from './components/CVForms/CVView';
import ReactToPrint from "react-to-print";
import { fontFamily } from '@mui/system';

const fonts = ["Arial", "Montserrat", "Helvatica", "Calibri"]

export default function CVGenerator() {

    const ref = createRef();

    const [cvData, setCvData] = useState({
        phone: "",
        address: "",
        city: "",
        education: [
            { title: "", description: "", institutionName: "", fromDate: "", toDate: "" }
        ],
        skills: [],
        categories: [],
        languages: [{ title: "", description: "" }],
        experience: [
            { title: "", description: "", institutionName: "", fromDate: "", toDate: "" }
        ],
        additionalInfo: []
    });

    const [displayOrder, setDisplayOrder] = useState("work");
    const [accentColor, setAccentColor] = useState("#ffffff");
    const [cvFont, setCvFont] = useState("Montserrat");
    const [displayIcons, setDisplayIcons] = useState(true);

    return (
        <Grid container spacing={3} sx={{ pl: 10, mt: 3, pr: 10 }}>
            <CssBaseline />
            <Grid item md={12} lg={3} >
                <Paper variant="outlined" sx={{ position: "sticky", top: 85, width: 1, p: 3 }}>
                    <FormControl>
                        <FormLabel id="display-order">What to show on front page:</FormLabel>
                        <RadioGroup
                            aria-labelledby="display-order"
                            name="display-order"
                            defaultValue="work"
                            onChange={(event, value) => { setDisplayOrder(value) }}
                        >
                            <FormControlLabel value="work" control={<Radio />} label="Work experience" />
                            <FormControlLabel value="education" control={<Radio />} label="Education" />

                        </RadioGroup>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 4 }}>
                            <FormLabel id="accent-color">Choose accent color:</FormLabel>
                            <TextField id="accent-color"
                                type={"color"}
                                onChange={(event) => { setAccentColor(event.target.value) }}
                                sx={{ width: "50px", p: 0 }}
                                size="small"
                                defaultValue="#000000"
                            />
                        </Box>
                        <Box sx={{ mt: 4 }}>
                            <FormLabel id="accent-color">Choose font:</FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                onChange={(event) => { setCvFont(event.target.value) }}
                                variant="standard"
                                fullWidth
                                sx={{ fontFamily: cvFont }}
                                defaultValue={"Montserrat"}
                                inputProps={{ fontFamily: cvFont }}
                            >
                                {
                                    fonts.map((font, index) => (
                                        <MenuItem value={font} sx={{ fontFamily: font }} key={index}>{font}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Box>
                        <FormControlLabel
                            control={<Switch defaultChecked onChange={(event) => { setDisplayIcons(!displayIcons) }} />}
                            label="Show icons"
                            labelPlacement='start'
                            sx={{ mt: 4, mr: 4 }}

                        />


                        <ReactToPrint
                            trigger={() => {

                                return (
                                    <Button variant="contained" sx={{ m: 2, mt: 5 }} >Export CV</Button>
                                );
                            }}
                            content={() => ref.current}
                        />
                    </FormControl>

                </Paper>
            </Grid>
            <Grid item md={12} lg={9} sx={{ overflowX: "scroll", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CVView
                    refProp={ref}
                    displayOrder={displayOrder}
                    accentColor={accentColor}
                    cvFont={cvFont}
                    displayIcons={displayIcons}
                />
            </Grid>
        </Grid >

    )
}