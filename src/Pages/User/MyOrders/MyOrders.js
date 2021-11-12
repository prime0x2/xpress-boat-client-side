import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import OrderCart from '../../Shared/OrderCard/OrderCart';

const MyOrders = () => {
    
    const { user } = useAuth();
    const [myOrders, setMyOrders] = useState([]);
    
    useEffect(() => {
        const author = { author: user.email };
        
        fetch('https://dry-dusk-43936.herokuapp.com/myOrders', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(author)
        })
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    setMyOrders(data);
                }
            })
    }, [user.email]);
    
    const handleDelete = (id) => {
        const warning = window.confirm('Are you sure\nYou want to delete this order..!?');

        if (warning) {
            const url = `https://dry-dusk-43936.herokuapp.com/orders/${id}`;
            fetch(url, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = myOrders.filter(order => order._id !== id);
                        setMyOrders(remaining);
                    }
                });
        }
    }
    
    return (
        <div className="page dashboard-page my-orders text-center">
            {
                myOrders[0] ? <h2 className="fw-bold mt-3">My <span className="text-warning">Purchase</span> : {myOrders.length}</h2> : <h2 className="fw-bold mt-3">No <span className="text-warning">Purchase</span> Yet</h2>
            }
            <div className="mt-3 mt-lg-5">
                {
                    myOrders.map(order => (
                        <OrderCart key={order._id} product={order.product}>
                            <div className="my-booking-manage d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center py-3">
                                <p>Status &nbsp;&nbsp;: &nbsp;&nbsp;
                                    {
                                        order.status === 'Pending' ?
                                            <span className="pending">{order.status} &nbsp;<i className="fas fa-hourglass-half"></i></span> :
                                            <span className="approved">{order.status} &nbsp;<i className="fas fa-check"></i></span>
                                    }
                                </p>
                                <button onClick={() => handleDelete(order._id)} className="btn btn-delete px-lg-3"><i className="far fa-trash-alt"></i> &nbsp;{
                                    order.status === 'Pending' ? 'Cancel Order' : 'Delete Order'
                                }</button>
                            </div>
                        </OrderCart>
                    ))
                }
            </div>
        </div>
    );
};

export default MyOrders;