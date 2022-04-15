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
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title} > 
        <Link to="/" style={{textDecoration:'None',color:'white'}}>
          Tyntra
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose} component="a" href="/cart">Cart</MenuItem>

                <MenuItem onClick={Logout}>Logout</MenuItem>
              </Menu>
            </div>
          ):<Button color="inherit" component={Link} to="/login">Login</Button>}
      </Toolbar>
    </AppBar>
  //   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    
  //   <Navbar.Brand href="/" >Shopify</Navbar.Brand>
    
  //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //   <Navbar.Collapse id="responsive-navbar-nav">
  //     <Nav className="mr-auto">
  //     </Nav>
  //     <Nav>
  //       <Form className="d-flex">
  //       <FormControl
  //         type="search"
  //         placeholder="Search"
  //         className="mr-2"
  //         aria-label="Search"
  //       />
  //       <Button variant="outline-success">Search</Button>
  //       <NavDropdown title={(user.isLoggedIn)?(<> {user.user.firstname+" "+user.user.lastname}</>):(<>Log In</>)} id="collasible-nav-dropdown">{
  //         (!user.isLoggedIn)?(
  //         <>
  //         <NavDropdown.Item href="cart">Login</NavDropdown.Item>
  //         </>
  //         ):(
  //         <>
  //         <NavDropdown.Item href="cart">Cart</NavDropdown.Item>
  //         <NavDropdown.Divider />
  //         <NavDropdown.Item onClick={Logout}>Log Out</NavDropdown.Item>
  //         </>
  //         )
  //       }
  //       </NavDropdown>
  //     </Form>
  //     </Nav>
  //   </Navbar.Collapse>
  // </Navbar>
    //  <nav className="navbar">
    //   <div className="navbar__logo">
    //     <h2>MERN Shopping Cart</h2>
    //   </div>

    //   <ul className="navbar__links">
    //     <li>
    //       <Link to="/cart" className="cart__link">
    //         <i className="fas fa-shopping-cart"></i>
    //         <span>
    //           Cart <span className="cartlogo__badge">{getCartCount()}</span>
    //         </span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/">Shop</Link>
    //     </li>
    //   </ul>

    //   <div className="hamburger__menu" onClick={click}>
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </nav> 
  );
};

export default Navbarcomp;
