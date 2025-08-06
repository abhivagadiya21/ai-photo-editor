import React, { useState } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const products = [
  { id: 1, name: 'Product 1', price: 0.01 },
  { id: 2, name: 'Product 2', price: 0.02 },
  { id: 3, name: 'Product 3', price: 0.03 },
];

function App() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handlePayment = () => {
    // Simulate payment processing
    alert(`Processing payment of ${cart.reduce((total, item) => total + item.price, 0)} using ${paymentMethod}`);
    setCart([]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crypto Store
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body1">${product.price}</Typography>
                <Button variant="contained" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      {cart.length > 0 ? (
        <div>
          <Typography variant="body1">
            Total: ${cart.reduce((total, item) => total + item.price, 0)}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="payment-method-label">Payment Method</InputLabel>
            <Select
              labelId="payment-method-label"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="Bitcoin">Bitcoin</MenuItem>
              <MenuItem value="Ethereum">Ethereum</MenuItem>
              <MenuItem value="USDT">USDT</MenuItem>
              <MenuItem value="Proprietary Token">Proprietary Token</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handlePayment}>
            Checkout
          </Button>
        </div>
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
    </Container>
  );
}

export default App;
