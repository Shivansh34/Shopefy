import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { Container, Divider, Button, Grid, Paper, Box, Typography, Select, MenuItem,Rating,Avatar,Card,CardContent,CardHeader } from "@mui/material";
import {  BarChart,  Bar,  XAxis, Tooltip, LabelList, YAxis} from "recharts";
import dayjs from 'dayjs';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;
  const [review,setreview]=useState([]);
  const [rating,setrating] = useState(0.0);
  const [chart,setchart]=useState([{star:"5",reviews:0},{star:"4",reviews:0},{star:"3",reviews:0},{star:"2",reviews:0},{star:"1",reviews:0},]);
  const [len,setlen]=useState(0);

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
    if(product&&product.review){
      setreview(product.review);
      setlen(product.review.length);
      var tmpchart=chart,sum=0;
      console.log(product.review,"df");
      for(let i=0;i<5;i++){
        tmpchart[i].reviews=0;
      }
      console.log(product.review.length);
      for(let i=0;i<product.review.length;i++){
        console.log(tmpchart[product.review[i].rating-1],product.review[i].rating);
        tmpchart[5-product.review[i].rating].reviews+=1;
        sum+=product.review[i].rating;
      }
      setrating((sum/product.review.length).toFixed(1));
      console.log(tmpchart);
      setchart(tmpchart);
    }
  }, [dispatch, match, product]);

  
  let chartData=[{star:"5",reviews:0},{star:"4",reviews:0},{star:"3",reviews:0},{star:"2",reviews:0},{star:"1",reviews:0},];

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    console.log('added');
    history.push(`/cart`);
  };
  const addreviewhandler=()=>{
    history.push(window.location.pathname+'/addreview');
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
          <hr/>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <h3> Customer Reviews</h3>
              <Rating name="half-rating" value={rating} precision={0.5} readOnly/>{rating}
              <BarChart
              width={300}
              height={100}
              data={chart}
              margin={{
                top: 5,
                right: 0,
                left: 20,
                bottom: 5
              }}
              barSize={10}
              barGap={10}
              layout="vertical"
            >
              <XAxis dataKey="reviews" type="number" hide={true} margin={{ left: 10, right: 10 }} domain ={[0,len]}/>
              <YAxis dataKey="star" type="category" hide />
              <Tooltip />
              <Bar dataKey="reviews" fill="gold" background={{ fill: "#eee" }} label={{position:"right"}} isAnimationActive={false}>
                <LabelList dataKey="star" position="left" />
              </Bar>
            </BarChart>
            <hr/>
            <Typography fontWeight={600} fontSize={18}>Review this product</Typography>
            <Typography fontSize={15}>Share your thoughts with other customers</Typography>
            <Box component="span" sx={{ p: 2 }}>
            <Button variant="outlined" size="small" sx={{width:300, marginTop:'1rem', textTransform:'none',color:'black',boxShadow:2,borderColor:'gray'}} onClick={addreviewhandler}>Write a product review</Button>
            </Box>
            <br/>
            <hr/>
            </Grid>
            <Grid item xs={8}>
              <h4>Top review</h4>
              {review?.map((cur)=>(
                <><Card >
                <CardHeader
                  avatar={
                    <Avatar/>
                  }
                  title={cur.username}
                  subheader={"Reviewed on "+dayjs(cur.createdAt).format('D MMMM YYYY')}/>
                  <CardContent>
                  <Typography variant="body2" color="text.primary">
                    <Typography fontWeight={600} gutterBottom component="p">
                    <Rating name="half-rating" defaultValue={cur.rating} size="small" readOnly/>&nbsp;&nbsp;&nbsp;
                      {cur.reviewtitle}
                    </Typography>
                    {cur.reviewvalue}
                  </Typography>
                </CardContent>
                </Card>
                </>
              ))}
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
