import "./Navbarcomp.css";
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';
import { useSelector,useDispatch } from "react-redux";
import {logout} from '../redux/actions/authActions';

const Navbarcomp = ({ click }) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.getuser);
  //console.log(user);
  const Logout =()=>{
    dispatch(logout());
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    
    <Navbar.Brand href="/" >Shopify</Navbar.Brand>
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">{
          (!user.isLoggedIn)?(
          <>
          <NavDropdown.Item href="cart">Login</NavDropdown.Item>
          </>
          ):(
          <>
          <NavDropdown.Item href="cart">Cart</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4" onClick={Logout}>Log Out</NavDropdown.Item>
          </>
          )
        }
        </NavDropdown>
      </Form>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
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
