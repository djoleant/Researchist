import { Paper, CssBaseline, Box } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    CircularProgress
} from '@mui/material';
import { Formik, Form } from 'formik';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import PaperBasicInfo from './components/PaperCreator/PaperBasicInfo';
import ChooseCategories from './components/PaperCreator/PaperChooseCategories';
import AuthorsAndReviewers from './components/PaperCreator/PaperAuthorsAndReviewers';
import References from './components/PaperCreator/PaperReferences';




//import { theme, useStyle } from './styles';
const steps = ['Basic info', 'Categories', "Authors and reviewers", 'References'];



export default function PaperCreator() {
    
    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <React.Fragment><PaperBasicInfo /></React.Fragment>;
            case 1:
                return <React.Fragment><ChooseCategories /></React.Fragment>;
            case 2:
                return <React.Fragment><AuthorsAndReviewers /></React.Fragment>;
            case 3:
                return <React.Fragment><References /></React.Fragment>;
            default:
                return <React.Fragment>Not Found</React.Fragment>;
        }
    }

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        
        const resp1 = await fetch("http://localhost:5211/api/Paper/AddPaper/" +
            encodeURIComponent(values.title) + "/" + encodeURIComponent(values.description) + "/" +
            values.date + "/" + encodeURIComponent(values.link), { method: "POST" });
        if (!resp1.ok) {
            alert("Paper creation failed!");
            return;
        }
        const paper = await resp1.json();
        for (let i = 0; i < values.categories.length; i++) {
            fetch("http://localhost:5211/api/Relations/Has/" + paper.id + "/" + values.categories[i].id, { method: "POST" }).then(r => {
                if (!r.ok) {
                    alert("An error occured while adding category: ", values.categories[i].id)
                }
            })
        }
        for (let i = 0; i < values.references.length; i++) {
            fetch("http://localhost:5211/api/Relations/References/" + paper.id + "/" + values.references[i].id, { method: "POST" }).then(r => {
                if (!r.ok) {
                    alert("An error occured while adding reference: ", values.references[i].id)
                }
            })
        }
        for (let i = 0; i < values.authors.length; i++) {
            fetch("http://localhost:5211/api/Relations/Writes/" + values.authors[i].id + "/" + paper.id, { method: "POST" }).then(r => {
                if (!r.ok) {
                    alert("An error occured while adding author: ", values.authors[i].id)
                }
            })
        }
        for (let i = 0; i < values.reviewers.length; i++) {
            fetch("http://localhost:5211/api/Relations/Reviews/" + values.reviewers[i].id + "/" + paper.id, { method: "POST" }).then(r => {
                if (!r.ok) {
                    alert("An error occured while adding reviewer: ", values.reviewers[i].id)
                }
            })
        }
        setPaperID(paper.id);
        actions.setSubmitting(false);
        setActiveStep(activeStep + 1);
        

    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    const [paperID,setPaperID] = useState(0);

    const [paperData, setPaperData] = useState({
        title: "",
        description: "",
        date: "",
        link:"",
        categories: [],
        references: [],
        authors: [],
        reviewers: [],

    });

    const paperValidationSchema = Yup.object().shape({
        title: Yup.string().required("The title is required"),
        description: Yup.string().required("Description is required"),
        date: Yup.date().required("The date is required"),
        link: Yup.string().matches('http(s)?://.*',"http(s) is required"),
        
    })


    return (

        <Container component="main"  >
            <CssBaseline />
            <React.Fragment>
                <Typography component="h1" variant="h4" align="center" sx={{ m: 2 }}>
                    Register Paper
                </Typography>
                <Stepper activeStep={activeStep} >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>
                                {
                                    <Typography sx={{
                                        display: { xs: 'none', md: "block" },
                                    }}>
                                        {label}
                                    </Typography>
                                }
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {activeStep === steps.length ? (
                        <>
                            <Typography component="h1" variant="h2" align="center">
                                <CheckCircleOutlineRoundedIcon color="success" sx={{ fontSize: 100, mt: 10 }} />
                                <br />
                                Paper successfully created
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 7, fontSize: 20, textDecoration: "none" }}
                                onClick={() => { navigate("/PaperInfoPage/" + paperID) }}
                            >
                                View Paper
                            </Button>
                        </>
                    ) : (
                        <Formik
                            initialValues={
                                paperData
                            }
                            enableReinitialize
                            validationSchema={paperValidationSchema}
                            onSubmit={_handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form id={"cvForm"}>
                                    {_renderStepContent(activeStep)}

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-around",
                                            mb: 5
                                        }}
                                    >
                                        {activeStep !== 0 && (
                                            <Button onClick={_handleBack} variant="outlined" size="large" >
                                                Back
                                            </Button>
                                        )}
                                        <div >
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                            // onClick={() => {
                                            //     if (!isLastStep) {
                                            //         setActiveStep(activeStep + 1)
                                            //     }
                                            // }}
                                            >
                                                {isLastStep ? 'Save changes' : 'Next'}
                                            </Button>
                                            {isSubmitting && (
                                                <CircularProgress
                                                    size={24}
                                                    sx={{ ml: 4 }}

                                                />
                                            )}
                                        </div>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    )}
                </React.Fragment>
            </React.Fragment>

        </Container >
    );
}
