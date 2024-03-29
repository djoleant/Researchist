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
import PaperTransferList from './PaperTransferList';


export default function References() {

    const [papers, setPapers] = React.useState([ //ucitavanje iz baze
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

    const { values } = useFormikContext();
    //console.log(values);
    const getPapers = async () => {
        let categoriesQuery = "";
        values.categories.forEach(cat => {
            categoriesQuery += "categoryIDs=" + cat.id + "&";
        })
        const response = await fetch("http://localhost:5211/api/Category/GetCategoryPapers?" + categoriesQuery);
        if (response.ok) {
            const fetchData = await response.json();
            setPapers(fetchData);
        }
    }

    React.useEffect(() => {
        getPapers();
    }, [])

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Choose references
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>

                <Grid item xs={12} >

                    <Paper
                        sx={{ p: 3 }}
                        variant="outlined"
                    >
                        <PaperTransferList papers={papers} leftTitle={"Available papers:"}
                            rightTitle={"Chosen references:"} fieldName={"references"} twoLine />
                    </Paper>
                </Grid >
            </Grid >
        </React.Fragment >
    );
}
