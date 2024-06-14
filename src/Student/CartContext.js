import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../BaseURL/BaseURL';
import { getCookie } from '../Helper/CookiesHelper';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState({ cart: true, favorites: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartAndFavorites = async () => {
      try {
        const cartResponse = await axios.get(`${baseURL}/users/cart`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'SHA ' + getCookie('AccessTokenStudent'),
          },
        });
        setCart(cartResponse.data.cart || []);
        setLoading((prev) => ({ ...prev, cart: false }));

        const favoritesResponse = await axios.get(`${baseURL}/users/favorite`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'SHA ' + getCookie('AccessTokenStudent'),
          },
        });
        setFavorites(favoritesResponse.data.favorite || []);
        setLoading((prev) => ({ ...prev, favorites: false }));
      } catch (err) {
        setError(err);
        setLoading({ cart: false, favorites: false });
      }
    };

    fetchCartAndFavorites();
  }, []);

  return (
    <CartContext.Provider value={{ cart, favorites, loading, error, setCart, setFavorites }}>
      {children}
    </CartContext.Provider>
  );
};
