import React, { useState, useEffect } from "react";
import {
    Paper,
    CssBaseline,
    Box,
    Divider,
    Grid,
    Container,
    Button,
    Typography,
    useTheme,
    Avatar,
    Tab,
    Tabs,
    Input,
    TextField,
    IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function ConcreteCategoryPage(props) {
    const { id } = useParams();
    const theme = useTheme();


    return (
        <Container component="main" sx={{ pt: 3 }}>
            
        </Container>
    );
}
