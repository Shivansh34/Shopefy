import {useDispatch,useSelector} from 'react-redux';
import {useState,useEffect} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import {login} from '../redux/actions/authActions';
import * as actionTypes from '../redux/constants/authConstants';


const LoginScreen = ({history}) =>{
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {message} = useSelector((state)=>state.getmessage); 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user&&user.token){
            history.push('/');
            dispatch({type:actionTypes.SET_MESSAGE,payload:"Already login"});
        }
    }, [history,dispatch]);

    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email,password));
        const user =localStorage.getItem("user");
        if (user&&user.token) {        
            history.push("/");
        }
    };

    return (<>
            {message!==""?(<Alert variant='info'>{message}</Alert>):<div></div>}
            <Form onSubmit={loginHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </>
    );
}

export default LoginScreen;