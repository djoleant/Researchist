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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

export default function EditPaperDialog({ id, update }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let fetchreq = "http://localhost:5211/api/Paper/DeletePaper/"+id;
        fetchreq = encodeURI(fetchreq);
        fetch(fetchreq, {
            method: "DELETE",
            credentials: "include"
        }).then(response => {
            response.json().then(data => {
                if (data.succeeded) {
                    alert("Success");
                }
                else {
                    alert("Changes were not successful");
                }
            })
            update();
            handleClose();
        })
    }

    //console.log(filename)
    // React.useEffect(() => {
    // }

    return (
        <div>

            <Button
                variant="outlined"
                startIcon={<DeleteForeverIcon />}
                onClick={handleClickOpen}
            >
                Delete paper
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Paper deletion"}
                </DialogTitle>

                <DialogContent>
                    <Typography>Are you sure you want to permanently delete this paper?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}