import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import OrderCart from '../../Shared/OrderCard/OrderCart';
import './ProductDetails.css';

const ProductDetails = () => {
    
    const { user } = useAuth();
    const { productID } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/';
    
    useEffect(() => {
        setLoading(true);
        fetch(`https://dry-dusk-43936.herokuapp.com/products/${productID}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
    }, [productID]);
    
    
    if (loading) {
        return (
            <div className="page text-center">
                <div className="spinner-grow text-primary m-5 text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    const onSubmit = (data) => {
        data.product = product;
        data.status = 'Pending';
        
        axios.post('https://dry-dusk-43936.herokuapp.com/orders', data)
            .then((res) => {
                if (res.data?.insertedId) {
                    alert('Purchase Pending...!');
                    reset();
                    history.push(redirect_uri);
                }
            })
    }
    
    return (
        <div className="page purchase-page px-lg-5">
            <div className="product-details mt-3 mt-lg-5">
                <OrderCart product={product} />
            </div>
            
            
            <div className="booking-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} placeholder="Name" defaultValue={user.displayName} />
                    <input {...register("author")} placeholder="Email" defaultValue={user.email} />
                    <input {...register("address")} placeholder="Address" />
                    <input type="number" {...register("phone")} placeholder="Phone" />
                    <input type="submit" value="Purchase" />
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;