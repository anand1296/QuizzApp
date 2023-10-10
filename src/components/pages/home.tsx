import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeAll, removeItem } from "../../store/cart/cart.slice";
import { CartState } from "../../store/cart/cart.state";
import { useStyles } from "../../styles/form.styles";

export function HomeComponent() {
  const classes = useStyles();
  const [item, setItem] = useState<string>("");

  const dispatch = useDispatch();

  const removeAllItems = () => {
    dispatch(removeAll({}));
  };

  const itemList = useSelector((state: { cart: Array<CartState> }) => {
    // console.log(state);
    return state.cart;
  });

  return (
    <div>
      <h1>Home</h1>
      <br />
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Cart" />
        <CardContent>
          <div className="item-list">
            {itemList.length
              ? itemList.map((item: CartState) => {
                  return (
                    <div>
                      <div className="item-details">
                        <label htmlFor={item.id.toString()}>
                          <h2>{item.name}</h2>
                        </label>
                        <p>{item.exp.toISOString()}</p>
                        <h4>{item.price}</h4>
                      </div>
                      <div className="item-actions">
                        <Button
                          variant="outlined"
                          size="large"
                          color="default"
                          className={classes.resetBtn}
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          Remove Item
                        </Button>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <div className="add-item">
            <TextField
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              value={item}
            />
            <Button
              variant="outlined"
              size="large"
              color="default"
              className={classes.resetBtn}
              onClick={() => setItem(item)}
            >
              Add Item
            </Button>
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            size="large"
            color="default"
            className={classes.resetBtn}
            onClick={() => removeAllItems()}
          >
            Remove All
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default HomeComponent;
