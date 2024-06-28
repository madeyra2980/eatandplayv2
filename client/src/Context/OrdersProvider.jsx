import React, { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const toggleFavorite = (newOrder) => {
        setOrders(prevOrders => {
            const existingIndex = prevOrders.findIndex(order => order._id === newOrder._id);
            if (existingIndex !== -1) {
                return prevOrders.filter(order => order._id !== newOrder._id);
            } else {
                return [...prevOrders, { ...newOrder, quantity: 1 }];
            }
        });
    };

    const removeFromOrders = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    };

    const incrementOrderQuantity = (orderId) => {
        setOrders(prevOrders => prevOrders.map(order =>
            order._id === orderId ? { ...order, quantity: order.quantity + 1 } : order
        ));
    };

    const decrementOrderQuantity = (orderId) => {
        setOrders(prevOrders => prevOrders.map(order =>
            order._id === orderId ? { ...order, quantity: Math.max(order.quantity - 1, 1) } : order
        ));
    };

    const clearOrders = () => {
        setOrders([]);
    };

    return (
        <OrdersContext.Provider value={{
            orders,
            toggleFavorite,
            removeFromOrders,
            incrementOrderQuantity,
            decrementOrderQuantity,
            clearOrders
        }}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => useContext(OrdersContext);
