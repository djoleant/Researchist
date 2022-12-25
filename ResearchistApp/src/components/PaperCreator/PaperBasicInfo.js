import React, { useState } from 'react';
import { Grid, Typography, Button, Paper, Divider } from '@mui/material';
import TextInputField from './TextInputField';
import { useFormikContext } from 'formik';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

export default function PaperBasicInfo() {


    const { values } = useFormikContext();
    //console.log(values);

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Basic info
            </Typography>
            <Paper
                sx={{ p: 3, mb: 4 }}
                variant="outlined"
            >
                <Grid container spacing={3} sx={{ mb: 4 }}>

                    <Grid item xs={12} >
                        <TextInputField required placeholder='Title' fullWidth variant="standard"
                            InputProps={{
                                style: {
                                    fontSize: 50,

                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    fontSize: 50,
                                    shrink: true
                                }
                            }}
                            sx={{ mb: 5 }}

                            name={"title"}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextInputField required label={"Description"} name={"description"} fullWidth
                            multiline rows={5}

                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextInputField required type="date" name={"date"} label={"Date"} fullWidth InputLabelProps={{
                            shrink: true,
                        }} />
                    </Grid>
                    <Grid item xs={12} >
                        <TextInputField label={"Link"} name={"link"} fullWidth
                            
                        />
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
}
