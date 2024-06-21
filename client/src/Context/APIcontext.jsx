import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);

  const getFetchDataRestaurants = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getFetchDataRestaurant = useCallback(async (id) => {
    setLoading(true);
    setRestaurant(null); 
    try {
      const response = await fetch(`http://localhost:8080/restaurants/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getFetchDataRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, restaurant, loading, getFetchDataRestaurant }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => {
  return useContext(RestaurantsContext);
};
