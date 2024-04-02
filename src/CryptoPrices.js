import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '300px', // Set the desired width here
    margin: '200px auto', // Center the card horizontally
    backgroundColor: '#00FFFF', 
    border: '2px solid #000000',
    height: '150px',// Background color
    textAlign: 'center',
    
  },
});

const CryptoPrices = ({ currency }) => {
  const classes = useStyles();
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);
        const data = await response.json();
        setPrice(data.bpi[currency].rate);
      } catch (error) {
        console.error('Error fetching cryptocurrency price:', error);
      }
    };

    fetchPrice();
  }, [currency]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {currency}
        </Typography><br></br>
        <Typography color="textSecondary">
          {price ? `$${price}` : 'Loading...'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoPrices;
