import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography, TextField, Box, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';

export default function EditPaperDialog({ currentTitle, currentDescription, update,id }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let fetchreq = "http://localhost:5211/api/Paper/UpdatePaper/"+id+"/"+title+"/"+description;
        fetchreq = encodeURI(fetchreq);
        console.log(fetchreq)
        fetch(fetchreq, {
            method: "PUT",
            credentials: "include"
        }).then(response => {
            // response.json().then(data => {
            //     if (data.succeeded) {
            //         alert("Success");
            //     }
            //     else {
            //         alert("Changes were not successful");
            //     }
            // })
            if (response.ok) {
                alert("Success");
            }
            else {
                alert("Changes were not successful");
            }
            update();
            handleClose();
        })
    }

    const [title, setTitle] = useState(currentTitle);
    const [description, setDescription] = useState(currentDescription);


    //console.log(filename)
    React.useEffect(() => {
        setTitle(currentTitle);
        setDescription(currentDescription);
    }, [currentTitle, currentDescription])

    return (
        <div>

            <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
            >
                Edit paper
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit paper info"}
                </DialogTitle>

                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Paper title"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                        required
                        error={title === "" || title === undefined}

                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        fullWidth
                        variant="standard"
                        onChange={(e) => { setDescription(e.target.value) }}
                        value={description}
                        required
                        error={description === "" || description === undefined}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                        disabled={!(title !== "" && description !== "")}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}