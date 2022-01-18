import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Container,Alert, Rating} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { getProductDetails } from "../redux/actions/productActions";


const theme = createTheme();

const ReviewScreen = ({match,history}) =>{
    const dispatch = useDispatch();
    const [rating,setrating]=useState(1);
    const [message,setmessage]=useState();
    const ReviewHandler = async (e) => {
        setmessage("Adding review");
        e.preventDefault();
        const config ={
            headers:{
              'Content-Type': 'application/json',
              'token': JSON.parse(localStorage.getItem("user")).user.token,
            }
        }
        const formdata = new FormData(e.currentTarget);
        if(formdata.get('title')&&formdata.get('details')){
            
            const{data}=await axios.post(`/api/products/addreview/${match.params.id}`,{"reviewtitle":formdata.get('title'),"reviewvalue":formdata.get('details'),rating},config).catch((error)=>{
                setmessage(error.response);
                return;
                }
            );
            console.log(data);
            history.push(`/product/${match.params.id}`);
            dispatch(getProductDetails(match.params.id));
        }
        else{
            setmessage("please enter all details");
        }
    };
    console.log("fl");
  return (
    <ThemeProvider theme={theme}>
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
          {message?(<Alert variant='info'>{message}</Alert>):<div></div>}
          <Typography component="h1" variant="h5">
            Add review
          </Typography>
          <br/>
          <Typography component="legend">Rating
            <Container align="center">
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setrating(newValue);
                }}
            />
            </Container>
            </Typography>
          <Box component="form" onSubmit={ReviewHandler} noValidate sx={{ mt: 1 }}>
            <TextField
                key="title"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
            />
            <TextField
                key="details"
                margin="normal"
                required
                fullWidth
                id="details"
                label="Details"
                name="details"
                autoComplete="details"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Review
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


export default ReviewScreen;