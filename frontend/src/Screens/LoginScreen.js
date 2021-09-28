import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {Container,Alert} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import * as actionTypes from '../redux/constants/authConstants';
import {login} from '../redux/actions/authActions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://shopify.com/">
        Shoppify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LoginScreen = ({history}) =>{
    const dispatch = useDispatch();
    const {message} = useSelector((state)=>state.getmessage);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user&&user.isLoggedIn){
            history.push('/');
            dispatch({type:actionTypes.SET_MESSAGE,payload:"Already login"});
        }
    }, [history,dispatch,message]);

    const loginHandler = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        await dispatch(login(data.get('email'),data.get('password')));
    };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={loginHandler} noValidate sx={{ mt: 1 }}>
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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}





// import {Form,Button,Alert} from 'react-bootstrap';


// const LoginScreen = ({history}) =>{
//     const dispatch = useDispatch();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const {message} = useSelector((state)=>state.getmessage); 
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if(user&&user.token){
//             history.push('/');
//             dispatch({type:actionTypes.SET_MESSAGE,payload:"Already login"});
//         }
//     }, [history,dispatch]);

//     const loginHandler = async (e) => {
//         e.preventDefault();
//         dispatch(login(email,password));
//         const user =localStorage.getItem("user");
//         if (user&&user.token) {        
//             history.push("/");
//         }
//     };

//     return (<>
//             {message!==""?(<Alert variant='info'>{message}</Alert>):<div></div>}
//             <Form onSubmit={loginHandler}>
//             <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
//                 <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//                 </Form.Text>
//             </Form.Group>
//             <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
//             </Form.Group>
//             <Button variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     </>
//     );
// }

export default LoginScreen;