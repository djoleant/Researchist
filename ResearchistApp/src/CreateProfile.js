import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoleToggle from './components/RoleToggle';
import { useState } from 'react';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Runtime Terror
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function CreateProfile() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        // if (data.get("password").length < 6) {
        //     setPassHelper("Password must be at least 6 characters long.");
        // }
        // else if (role === "student") {
        //     //   console.log("e")
        //     //   register(data.get("firstName"), data.get("lastName"), data.get("email"), data.get("username"), data.get("password"), "IGNORE", 1).then(d => {
        //     //     if (d.succeeded) {
        //     //       navigate("/SignIn");
        //     //     }
        //     //   });
        // }
        // else if (role === "employer") {
        //     //   register("IGNORE", "IGNORE", data.get("email"), data.get("username"), data.get("password"), data.get("companyName"), 2).then(d => {
        //     //     if (d.succeeded) {
        //     //       navigate("/SignIn");
        //     //     }
        //     //   });
        // }
        const roles = {
            professor: 0,
            student: 1,
            other: 2
        }
        fetch(`http://localhost:5211/api/Person/AddPerson/${data.get("name")}/${data.get("surname")}/${roles[role]}/${encodeURIComponent(data.get("institution"))}/${encodeURIComponent(data.get("contact"))}`, {
            method: "POST"
        }).then(r => {
            if (r.ok) {
                r.json().then(person => {
                    
                    navigate("/ProfilePage/"+person.id);
                })
            }
        })

    };

    const [role, setRole] = useState(0);

    const navigate = useNavigate();

    const { role: registerRole } = useParams();

    const setOtherRole = () => {
        if (role != "other") {
            setRole("other");
        }

    }

    const setProfessorRole = () => {
        if (role != "professor") {
            setRole("professor");
        }

    }

    const setStudentRole = () => {
        if (role != "student") {
            setRole("student");
        }

    }

    React.useEffect(() => {
        if (registerRole === "professor")
            setRole("professor");
        else if (registerRole === "student")
            setRole("student")
        else if (registerRole === "other")
            setRole("other")
        else
            navigate("/Register/student")
    }, [])

    const [passHelper, setPassHelper] = useState("");

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Create profile
                </Typography>
                <RoleToggle setStudent={setStudentRole} setProfessor={setProfessorRole} setOther={setOtherRole} selected={role} />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>


                        <React.Fragment>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="surname"
                                    label="Surname"
                                    name="surname"
                                    autoComplete="family-name"
                                />
                            </Grid>
                        </React.Fragment>


                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="institution"
                                label="Institution"
                                name="institution"
                                autoComplete="institution"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="profilePicture"
                                label="Profile Picture Link"
                                name="profilePicture"
                                autoComplete="profilePicture"
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="contact"
                                label="Contact Info"
                                id="contact"
                                autoComplete="new-password"
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Profile
                    </Button>

                </Box>
            </Box>
        </Container >

    );
}