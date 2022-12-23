import Chip from '@mui/material/Chip';
import { Grid, Typography, Paper, Box } from '@mui/material';
import * as React from 'react';
import { FieldArray, useFormikContext } from 'formik';
import TextField from '@mui/material/TextField';
import PaperCard from './PaperCard';



export default function PaperTransferList({ papers, leftTitle, rightTitle, fieldName, twoLine }) {


    const [searchVal, setSearchVal] = React.useState("");
    const { values } = useFormikContext();
    return (
        <FieldArray
            name={fieldName}
            render={(arrayHelpers) => (
                <Grid container spacing={3}>

                    <Grid item xs={12} md={twoLine === true ? 12 : 6}>
                        {leftTitle != undefined ?
                            <Typography gutterBottom >
                                {leftTitle}
                            </Typography>
                            :
                            <></>
                        }
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 3,
                                m: 0,
                                width: 1,
                                gap: 1,
                            }}
                            variant="outlined"
                        >
                            <TextField variant={"standard"} fullWidth placeholder='Search'
                                onChange={(event) => { setSearchVal(event.target.value) }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    maxHeight: "500px",
                                    overflowY: "scroll",
                                    width: "100%"
                                }}
                            >
                                {papers
                                    .filter((data) => data.title.toLowerCase().includes(searchVal.toLowerCase()))
                                    .map((data) => {
                                        let icon;

                                        let selected = values[fieldName].find(val => val.id == data.id) != null;

                                        return (
                                            <PaperCard
                                                title={data.title}
                                                description={data.description}
                                                link={data.link}
                                                selected={selected}
                                                handleSelect={() => {
                                                    if (!selected)
                                                        arrayHelpers.push(data);
                                                    else
                                                        arrayHelpers.remove(data);
                                                    selected = !selected;
                                                }}
                                                key={data.id}
                                            />
                                        );
                                    })
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={twoLine === true ? 12 : 6} >
                        <Typography gutterBottom >
                            {rightTitle}
                        </Typography>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 3,
                                m: 0,
                                width: 1,
                                gap: 1,
                            }}
                            variant="outlined"
                        >
                            {
                                values[fieldName].map((val, index) => (
                                    <Chip
                                        key={index}
                                        label={val.title}
                                        onDelete={() => { arrayHelpers.remove(index) }}

                                    />
                                ))
                            }
                        </Paper>
                    </Grid>
                </Grid>

            )}
        >

        </FieldArray>
    )
}