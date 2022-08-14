import Carousel from 'react-material-ui-carousel'
import { CardMedia, Card } from '@material-ui/core';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
//import Product from "../components/Product";
//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";


const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  console.log(getProducts);
  const { products, loading, error } = getProducts;
  const user = localStorage.getItem('user');
  console.log(user);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  var items = [
    {
        name: "Random Name #1",
        description: "Sale",
        url:"https://cdn.arstechnica.net/wp-content/uploads/2021/09/iPhone-13-Pro-Max-back.jpeg"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        url:"https://www.trustedreviews.com/wp-content/uploads/sites/54/2021/10/Macbook-Pro-2021-920x613.jpg"
    }
]

  return (
    <div style={{margin: "1rem auto",maxWidth: "1300px"}}>
      <Carousel swipe={true} navButtonsAlwaysVisible={true} animation="slide">
        {
          items.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Carousel>
      <ImageList sx={{ width: "auto"}} cols={4} gap={50}>
      {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
          <ImageListItem key={product._id} >
            <a  href={`/product/${product._id}`} style={{ textDecoration: 'none', color:'black'}}>
            <img
              src={product.imageUrl}
              srcSet={product.imageUrl}
              alt={product.name}
              loading="lazy"
              style={{height:'200px'}}
            />
            <ImageListItemBar
              title={product.name}
              subtitle={"Rs. "+product.price}
              position="below"
            />
            </a>
          </ImageListItem>
        )))}
      </ImageList>
      {/* <h2 className="homescreen__title">Latest Products</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageUrl={product.imageUrl}
              productId={product._id}
            />
          ))
        )}
      </div> */}
    </div>
  );
};

function Item(props)
{
    return (<>
          <Card>
            <CardMedia
            component="img"
            height="400"
            image={props.item.url}
           />
          </Card>
        </>
    )
}

export default HomeScreen;