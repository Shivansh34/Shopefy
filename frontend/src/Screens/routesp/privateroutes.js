import { Route,Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component,...rest})=>{
    return <Route
        {...rest}
        render={(props)=>
            (localStorage.getItem("user")&&JSON.parse(localStorage.getItem("user")).isLoggedIn)?(
            <Component {...props}/>):(
            <Redirect to ="/login"/>
            )
        }
    />
}

export default PrivateRoute;