import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RestaurantsContext = createContext();


export const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [restaurantsCache, setRestaurantsCache] = useState({});
  const [preferences, setPreferences] = useState([]);

  


  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://185.4.180.214/4444/restaurants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurantsCache(prevCache => ({ ...prevCache, all: data }));
        setRestaurants(data);
        console.log('Fetched restaurants:', data);
      } catch (error) {
        setError(error.message || 'Error fetching restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const getFetchPreferences = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://185.4.180.214/4444/preference');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPreferences(data);
      console.log('Fetched preferences:', data);
    } catch (error) {
      setError(error.message || 'Error fetching preferences');
    } finally {
      setLoading(false);
    }
  }, []);

  const getFetchDataRestaurant = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const cachedData = restaurantsCache[id];
      if (cachedData) {
        setRestaurant(cachedData);
        console.log('Using cached data for restaurant:', cachedData);
      } else {
        const response = await fetch(`http://185.4.180.214/4444/restaurants/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRestaurantsCache(prevCache => ({ ...prevCache, [id]: data }));
        setRestaurant(data);
        console.log('Fetched restaurant data:', data);
      }
    } catch (error) {
      setError(error.message || 'Error fetching restaurant details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RestaurantsContext.Provider value={{ restaurants, restaurant, loading, error, getFetchDataRestaurant, preferences, getFetchPreferences }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => {
  return useContext(RestaurantsContext);
};
