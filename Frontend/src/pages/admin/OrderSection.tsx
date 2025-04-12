// OrderSection.tsx
import React, { useEffect } from 'react';
import { useOrdersStore } from '../../store/useOrdersStore'; // Store for managing orders

const OrderSection: React.FC = () => {
  const { orders, isLoading, error, fetchOrders, fetchOrderById, cancelOrder } = useOrdersStore(state => ({
    orders: state.orders,
    isLoading: state.isLoading,
    error: state.error,
    fetchOrders: state.fetchOrders,
    fetchOrderById: state.fetchOrderById,
    cancelOrder: state.cancelOrder,
  }));

  useEffect(() => {
    fetchOrders(); // Fetch orders when the component mounts
  }, [fetchOrders]);

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId); // Call cancel order function
  };

  return (
    <div className="order-section">
      <h2>Manage Orders</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <button onClick={() => fetchOrderById(order.id)}>View Details</button>
              <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderSection;
