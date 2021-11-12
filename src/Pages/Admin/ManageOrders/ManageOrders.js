import React, { useEffect, useState } from 'react';
import OrderCart from '../../Shared/OrderCard/OrderCart';
import './ManageOrders.css';

const ManageOrders = () => {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        fetch('https://dry-dusk-43936.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setStatus(true);
            })
    }, [status]);

    const handleDelete = (id) => {
        const warning = window.confirm('Are you sure\nYou want to delete this order..!?');

        if (warning) {
            const url = `https://dry-dusk-43936.herokuapp.com/orders/${id}`;
            fetch(url, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = orders.filter(order => order._id !== id);
                        setOrders(remaining);
                    }
                });
        }
    }
    
    const handleApprove = (id, index) => {
        const warning = window.confirm('Ship This Boat..!?');
        
        if (warning) {
            fetch(`https://dry-dusk-43936.herokuapp.com/orders/status/${id}`, { method: 'PUT' })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Boat Shipped...!!!');
                        setStatus(false);
                    }
                });
        }
    }

    return (
        <div className="page dashboard-page text-center">
            {
                orders[0] ? <h2 className="fw-bold mt-3">Total <span className="text-warning">Orders</span> : {orders.length}</h2> : <h2 className="fw-bold mt-3">No <span className="text-warning">Orders</span> Yet</h2>
            }
            <div className="mt-3 mt-lg-5">
                {
                    orders.map((order, index) => (
                        <OrderCart key={order._id} product={order.product}>
                            <div>
                                <div className="author-section mt-2 mt-lg-4 text-secondary">
                                    <p>Author &nbsp;: &nbsp;&nbsp;<span>{order.author}</span></p>
                                    <p>Status &nbsp;&nbsp;: &nbsp;&nbsp;
                                        {
                                            order.status === 'Pending' ?
                                                <span className="pending">{order.status} &nbsp;<i className="fas fa-hourglass-half"></i></span> :
                                                <span className="approved">{order.status} &nbsp;<i className="fas fa-check"></i></span>
                                        }
                                    </p>
                                </div>
                                <div className="manage-section d-flex justify-content-between flex-column flex-lg-row mt-2 mt-lg-4">
                                    <button onClick={() => handleApprove(order._id, index)} className="btn btn-approve me-lg-5 px-lg-3" disabled={order.status !== 'Pending'}><i className="fas fa-check"></i> &nbsp;{order.status !== 'Pending' ? 'Boat Shipped' : 'Approve Booking'}</button>

                                    {/* <button className="btn btn-update me-lg-5"><i className="far fa-edit"></i> &nbsp;Update Booking</button> */}

                                    <button onClick={() => handleDelete(order._id)} className="btn btn-delete px-lg-3"><i className="far fa-trash-alt"></i> &nbsp;Delete Order</button>
                                </div>
                            </div>
                        </OrderCart>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageOrders;