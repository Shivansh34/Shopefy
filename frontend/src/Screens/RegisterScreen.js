import {Form,Alert,Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {register} from '../redux/actions/authActions';
import * as actionTypes from '../redux/constants/authConstants';

const RegisterScreen = ({history})=>{
    const {message} = useSelector(state => state.getmessage);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [firstname, setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [password, setPassword] = useState("");
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user&&user.token){
            dispatch({type:actionTypes.SET_MESSAGE,payload:"Logout first"});
            history.push('/');
        }
    },[history,dispatch]);

    const registerhandler = async (e)=>{
        e.preventDefault();
        dispatch(register(email,firstname,lastname,password));
    }
    return (<>
        {message!==""?(<Alert variant='info'>{message}</Alert>):<div></div>}
        <Form onSubmit={registerhandler}>
        <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupFirstname">
            <Form.Label>First Name*</Form.Label>
            <Form.Control required type="text" placeholder="Enter firstname" value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupLastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter lastname" value={lastname} onChange={(e)=>setlastname(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </>);
}

export default RegisterScreen;