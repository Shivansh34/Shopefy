import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler}) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.imageurl} alt={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.name}</p>
      </Link>
      <p className="cartitem__price">Rs. {item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.id, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.cis).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => qtyChangeHandler(item.id,0)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
