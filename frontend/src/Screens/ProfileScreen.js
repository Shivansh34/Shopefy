import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Container,Alert} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import axios from "axios";

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://shopefy.herokuapp.com/">
          Shopefy
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const ProfileScreen = ({history})=>{
    const {message} = useSelector(state => state.getmessage);
    const dispatch = useDispatch();
    const theme = createTheme();
    const [profiledata,setprofiledata] =useState({firstname:"",lastname:"",address:""});
    const config ={
        headers:{
          'Content-Type': 'application/json',
          'token': JSON.parse(localStorage.getItem("user")).user.token,
        }
    }

    const  getprofile=async()=>{
        console.log(config);
        const {data} = await axios.post('api/private/profile',{},config).catch((error)=>{throw(error);});
        console.log(data);
        setprofiledata(data);
    }
    useEffect(()=>{
        getprofile();
    },[dispatch]);

    const saveuserinfohandler = async (e)=>{
        try{
            e.preventDefault();
            const newdata = await axios.post('api/private/profile/update',{...profiledata},config).catch((error)=>{throw(error);});
            console.log(newdata);
        }
        catch{
            
        }
    }
    return (<>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <Avatar {...stringAvatar(profiledata.firstname+" "+profiledata.lastname)} />
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Profile
            </Typography>
            <Box component="form" onSubmit={saveuserinfohandler} noValidate sx={{ mt: 1 }}>
                {message!==""?(<Alert variant='info'>{message}</Alert>):<div></div>}
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                value={profiledata.firstname}
                onChange={(e)=>setprofiledata((state)=>({...state,firstname:e.target.value}))}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lastname"
                value={profiledata.lastname}
                onChange={(e)=>setprofiledata((state)=>({...state,lastname:e.target.value}))}
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={profiledata.address}
                onChange={(e)=>setprofiledata((state)=>({...state,address:e.target.value}))}
                autoFocus
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Update Profile
                </Button>
                <Grid container>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    </>
    );
}

export default ProfileScreen;