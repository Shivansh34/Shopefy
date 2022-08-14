import {AppBar,Toolbar,IconButton,Typography,Button,Menu,MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector,useDispatch } from "react-redux";
import {logout} from '../redux/actions/authActions';
import { /*useEffect,*/ useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbarcomp = ({ click }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.getuser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // useEffect(()=>{
  //   console.log(user);
  // },[user])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout =()=>{
    dispatch(logout());
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          
        </IconButton>
        <Typography variant="h6" className={classes.title} > 
        <Link to="/" style={{textDecoration:'None',color:'white'}}>
          Shopefy
        </Link>
        </Typography>
        {(user.isLoggedIn)? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}component="a" href="/profile">Profile</MenuItem>
                <MenuItem onClick={handleClose} component="a" href="/cart">Cart</MenuItem>

                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
            </div>
          ):<Button color="inherit" component={Link} to="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbarcomp;
