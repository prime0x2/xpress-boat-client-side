import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../Shared/ProductCard/ProductCard';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://dry-dusk-43936.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, []);


    if (loading) {
        return (
            <div className="page text-center">
                <div className="spinner-grow text-primary m-5 text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <div className="container home-products text-center mx-3 p-lg-5 mx-lg-auto">

            <h2 className="fw-bold">FEATURED <span className="text-warning">BOATS</span></h2>

            <div className="row row-cols-1 row-cols-md-3 g-4 g-lg-5 py-5">
                {
                    products.map(product => (
                        <ProductCard key={product._id} product={product} >
                            <Link to={`/boat/${product._id}`}>
                                <button className="btn btn-book">Purchase &nbsp;<i className="fas fa-cart-plus"></i></button>
                            </Link>
                        </ProductCard>
                    ))
                }
            </div>
        </div>
    );
};

export default Products;