import { Paper, CssBaseline, Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Typography,
    CircularProgress,
    Avatar,
    Grid,
    useTheme
} from '@mui/material';
import CardList from './components/Categories/ConcreteCategories/CardList';
import EditStudentProfileDialog from './components/Profile/EditPerson';
import { useParams } from 'react-router-dom';



export default function ConcreteCategoryPage(props) {

    const [search, setSearch] = useState("");
    const [CategoryData, setCategoryData] = useState([]);
    const [value, setValue] = React.useState(0);

    const { id } = useParams();
    const getCategories = async () => {
      const response = await fetch(
        "http://localhost:5211/api/Category/GetCategoryName/" + id,
        {
          credentials: "include",
        }
      );
  
      const fetchData = await response.json();
      console.log(fetchData);
      setCategoryData(fetchData);
    };
  
    useEffect(() => {
      getCategories();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Box
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
                sx={{ width: 1 }}
            >
                {value === index && (
                    <Box sx={{ p: 3, width: 1 }}>
                        {children}
                    </Box>
                )}
            </Box>
        );
    }


    return (

        <Container component="main" sx={{ pt: 3 }}>
            <CssBaseline />
            <Grid container spacing={3}  >
                <Grid item xs={12} md={10}>
                    <Typography variant='h6' align="left">Category</Typography>
                    <Typography variant='h3' align="left">{CategoryData.name}</Typography>
                </Grid>

            </Grid>
            <Box >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: "sticky", top: 65, mt: 4, zIndex: 20, backgroundColor: theme.palette.background.default }}>
                    <Tabs value={value} variant="scrollable" scrollButtons onChange={handleChange} aria-label="basic tabs example" >
                        <Tab label="Papers" />
                        <Tab label="People"/>
                        {/* <Tab label="Categories" sx={{ display: type === "public" ? "none" : "" }} /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CardList type="papers" />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CardList type="people" />
                </TabPanel>

            </Box>

        </Container >
    );
}
