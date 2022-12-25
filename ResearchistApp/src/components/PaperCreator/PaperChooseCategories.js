import { Grid, Typography, Button, Divider, Box } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import { FieldArray, useFormikContext } from 'formik';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ChipTransferList from './ChipTransferList';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


export default function ChooseCategories() {

    const [categories, setCategories] = React.useState([ //ucitavanje iz baze
        // { id: 0, name: 'Angular' },
        // { id: 1, name: 'jQuery' },
        // { id: 2, name: 'Polymer' },
        // { id: 3, name: 'React' },
        // { id: 4, name: 'Vue.js' },
        // { id: 5, name: 'Angular' },
        // { id: 6, name: 'jQuery' },
        // { id: 7, name: 'Polymer' },
        // { id: 8, name: 'React' },
        // { id: 9, name: 'Vue.js' },
        // { id: 10, name: 'Angular' },
        // { id: 11, name: 'jQuery' },
        // { id: 12, name: 'Polymer' },
        // { id: 13, name: 'React' },
        // { id: 14, name: 'Vue.js' },
        // { id: 15, name: 'Angular' },
        // { id: 16, name: 'jQuery' },
        // { id: 17, name: 'Polymer' },
        // { id: 18, name: 'React' },
        // { id: 19, name: 'Vue.js' }
    ]);

    const getCategories = async () => {
        const response = await fetch("http://localhost:5211/api/Category/GetCategories"); 
        if (response.ok) {
            const fetchData = await response.json();
            setCategories(fetchData);
        }
    }

    React.useEffect(() => {
        getCategories();
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Choose categories
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <ChipTransferList chipData={categories} leftTitle={"Available categories:"}
                            rightTitle={"Chosen categories:"} fieldName={"categories"} twoLine />
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}
