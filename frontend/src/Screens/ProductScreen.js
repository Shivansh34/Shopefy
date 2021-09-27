import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { Container, Divider, Button, Grid, Paper, Box, Typography, Select, MenuItem, } from "@mui/material";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    console.log('added');
    history.push(`/cart`);
  };

  return (
    <Container sx={{mt:2,maxWidth:'1300px'}} maxWidth="false">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <img src={product.imageUrl} alt={product.name} />
              </Paper>
            </Grid>
            <Grid item xs={3}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Box sx={{ my: 3, mx: 2 }}>
              <Grid container alignItems="center">
                <Typography gutterBottom variant="h4" component="div">
                  {product.name}
                </Typography>
                </Grid>
                <Divider />
                <Typography sx={{mt:2}} color="text.secondary" variant="body2">
                  {product.description}
                </Typography>
              </Box>
            </Box>
            </Grid>
            <Grid item xs={3}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', border:1, maxHeight: 1000, mt:5, p:1 }}>
              <Box sx={{ my: 3, mx: 2 }}>
                <Typography gutterBottom variant="h6" component="div">
                  Price: Rs {product.price}
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography gutterBottom variant="body1">
                  Select Qty
                </Typography>
                <Select
                  value={qty}
                  label="Qty"
                  onChange={(e) => setQty(e.target.value)}
                >
                { Array.from({length: Math.min(4,product.countInStock)}, (x, i) => <MenuItem key={i+1} value={i+1}>{i+1}</MenuItem>) }
                </Select>
              </Box>
              <Box sx={{ mt: 3, ml: 2, mb: 2 }} >
                <Button onClick={addToCartHandler} variant="contained" >Add to cart</Button>
              </Box>
            </Box>
            </Grid>
          </Grid>
          {/* <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">PlayStation 5</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div> */}
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
