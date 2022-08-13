import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Container,Alert} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions';
import * as actionTypes from '../redux/constants/authConstants';

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

const RegisterScreen = ({history})=>{
    const {message} = useSelector(state => state.getmessage);
    const dispatch = useDispatch();
    const theme = createTheme();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user&&user.token){
            dispatch({type:actionTypes.SET_MESSAGE,payload:"Logout first"});
            history.push('/');
        }
    },[history,dispatch]);

    const registerhandler = async (e)=>{
        e.preventDefault();
        const data = await new FormData(e.currentTarget);
        dispatch(register(data.get('email'),data.get('firstname'),data.get('lastname'),data.get('password')));
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
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={registerhandler} noValidate sx={{ mt: 1 }}>
                {message!==""?(<Alert variant='info'>{message}</Alert>):<div></div>}
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
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
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    </>
    );
}

export default RegisterScreen;