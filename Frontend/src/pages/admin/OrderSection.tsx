import React, { useEffect, useState } from 'react';
import { useOrdersStore } from '../../store/useOrdersStore';

const OrderSection: React.FC = () => {
  const { orders, isLoading, error, fetchAllOrders, fetchOrderById, cancelOrder, updateOrderStatus } = useOrdersStore(state => ({
    orders: state.orders,
    isLoading: state.isLoading,
    error: state.error,
    fetchAllOrders: state.fetchAllOrders,
    fetchOrderById: state.fetchOrderById,
    cancelOrder: state.cancelOrder,
    updateOrderStatus: state.updateOrderStatus, // Assuming we have this action in our store
  }));

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchAllOrders(); // Fetch orders when the component mounts
  }, [fetchAllOrders]);

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId); // Call cancel order function
  };

  const handleViewOrder = (orderId: string) => {
    if (selectedOrderId === orderId) {
      setSelectedOrderId(null); // Collapse details if the same order is clicked
    } else {
      setSelectedOrderId(orderId);
      fetchOrderById(orderId); // Fetch order details when clicked
    }
  };

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status); // Call the action to update the order status
  };

  // Group orders by user (assuming each order has a user info)
  const groupedOrders = orders.reduce((acc: Record<string, typeof orders>, order) => {
    const username = order.username || 'Unknown User';
    if (!acc[username]) {
      acc[username] = [];
    }
    acc[username].push(order);
    return acc;
  }, {});

  return (
    <div className="order-section p-4">
      <h2 className="text-xl font-bold mb-4">Orders by User</h2>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedOrders).map(([user, userOrders]) => (
            <div key={user} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{user}</h3>
              <ul className="space-y-2">
                {userOrders.map(order => (
                  <li key={order.id} className="border p-3 rounded">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Date Time:</strong> {new Date(order.dateTime).toLocaleString()}</p>
                    <div className="space-x-2 mt-4">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        {selectedOrderId === order.id ? 'Hide Details' : 'View Details'}
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'Out for Delivery')}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Out for Delivery
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'Delivered')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Delivered
                      </button>
                    </div>

                    {selectedOrderId === order.id && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold">Food Items:</h4>
                        <ul className="space-y-2">
                          {order.foodItems.map(foodItem => (
                            <li key={foodItem.id} className="flex items-center space-x-2">
                              <img 
                                src={`http://localhost:8186/images/${foodItem.image}`} 
                                alt={foodItem.name} 
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <p><strong>{foodItem.name}</strong></p>
                                <p>{foodItem.description}</p>
                                <p><strong>Price:</strong> ₹{foodItem.price}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderSection;
