import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Typography, TextField, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function EditStudentProfileDialog({
    currentId,
    currentName,
    currentSurname,
    currentPicture,
    currentContact,
    update,
}) {
    const [open, setOpen] = React.useState(false);

    const { id } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleSelectImage = () => {
        setFilename(fileInput.current.files[0].name);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function handleSubmit() {
        console.log(id, name, surname, contact);
        const response = await fetch(
            "http://localhost:5211/api/Person/UpdatePerson/" +
            id +
            "/"+
            name +
            "/" +
            surname +
            "/" +
            contact,
            {
                method: "PUT",
                credentials: "include",
            }
        )

        setOpen(false)

        if(!response.ok) {
            alert("[Error occured] Could not update person")
            return
        }
    };

    
    const [name, setName] = useState(currentName);
    const [surname, setSurname] = useState(currentSurname);
    const [contact, setContact] = useState(currentContact);
    const fileInput = React.createRef();

    const [filename, setFilename] = useState(currentPicture);
    //console.log(filename)
    React.useEffect(() => {
        setName(currentName);
        setSurname(currentSurname);
        setFilename(currentPicture);
        setContact(currentContact);
    }, [currentSurname, currentName, currentPicture, currentContact]);

    return (
        <div>
            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit profile
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Edit profile info"}</DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        required
                        error={name === undefined || name === ""}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Surname"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setSurname(e.target.value);
                        }}
                        value={surname}
                        required
                        error={surname === undefined || surname === ""}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Contact"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setContact(e.target.value);
                        }}
                        value={contact}
                        required
                        error={contact === undefined || contact === ""}
                    />
                    {/* <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                        <Button variant="contained" component="label">
                            Choose Picture
                            <input
                                type="file"
                                hidden
                                ref={fileInput}
                                onChange={handleSelectImage}
                            />
                        </Button>
                        <Avatar
                            src={process.env.PUBLIC_URL + "/resources/" + filename}
                        ></Avatar>
                        <Typography>{filename}</Typography>
                    </Box> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

// import React, { useState } from 'react';
// import {
//     Button,
//     Typography,
//     TextField,
//     Container,
//     CssBaseline,
//     Box,
//     Grid,
//     Paper,
//     Divider,
//     FormControl,
//     FormControlLabel
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// export default function EditStudent(props) {

//     const [textValue, setTextValue] = useState("");

//     const onTextChange = (e) => setTextValue(e.target.value);
//     const handleSubmit = () => console.log(textValue);
//     const handleReset = () => setTextValue("");

//     return (

//         <Container component="main"  >
//             <CssBaseline />
//             <React.Fragment>
//                 <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
//                     Edit your profile
//                 </Typography>
//                 <Paper
//                     sx={{ p: 3, mb: 4 }}
//                     variant="outlined"
//                 >
//                     <Grid container style={{ alignItems: "center", justifyContent: "center" }} spacing={3} sx={{ mb: 3 }}>
//                         <Box sx={{ mb: 3, position: "relative" }} variant="outlined">

//                         <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}>
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change email and username</Typography>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New email"} fullWidth />
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}>  </Typography>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New username"} fullWidth />
//                             <Typography component="subtitle1" align="center" sx={{ m: 2 }}> Change basic info </Typography>
//                             {/* <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} fullWidth />
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} fullWidth /> */}
//                             <Grid container xs={12} style={{ top: 10, alignItems: "left", justifyContent: "left" }}></Grid>
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New first name"} />
//                             <TextField name={""} style={{ marginLeft: 25 }} label={"New last name"} />

//                     </Grid>
//                     </Box>
//                 </Grid>

//                 <Box sx={{ mb: 3, position: "relative" }} variant="outlined">

//                     <Button variant="contained" endIcon={<SendIcon />}> Submit changes </Button>
//                 </Box>
//             </Paper>

//         </React.Fragment>
//         </Container >
//     );
// }
