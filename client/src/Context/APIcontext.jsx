import React, { createContext, useContext, useState, useEffect } from 'react';

const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantsCache, setRestaurantsCache] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8080/restaurants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurantsCache(prevCache => ({ ...prevCache, all: data }));
        setRestaurants(data);
      } catch (error) {
        setError(error.message || 'Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const getFetchDataRestaurant = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const cachedData = restaurantsCache[id];
      if (cachedData) {
        setRestaurant(cachedData);
      } else {
        const response = await fetch(`http://localhost:8080/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurantsCache(prevCache => ({ ...prevCache, [id]: data }));
        setRestaurant(data);
      }
    } catch (error) {
      setError(error.message || 'Error fetching restaurant details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantsContext.Provider value={{ restaurants, restaurant, loading, error, getFetchDataRestaurant }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => {
  return useContext(RestaurantsContext);
};
