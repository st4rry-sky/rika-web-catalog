import { useState } from 'react';
// Components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../Pages/TransactionList';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

function numberWithCommas(x:number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if(cartItems.length > 0)
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const items = cartItems.reduce((acc, curr) => `${acc}${curr.title}, ` , '');

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: Rp.{numberWithCommas(calculateTotal(cartItems))}</h2>
      <Button variant="outlined" onClick={handleClickOpen} >Complete Transaction</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To purchase to this products, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="items"
            label="Items"
            value={items.slice(0, -2)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="total"
            label="Total Amount"
            value={"Rp. " + numberWithCommas(calculateTotal(cartItems))}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Paid</Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  );
};

export default Cart;
