import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../Shared/ProductCard/ProductCard';
import './UpdateProduct.css';

const UpdateProduct = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        fetch('https://dry-dusk-43936.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            });
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
        <div className="page dashboard-page update-product">
            <div className="update-product-box text-center mx-3 p-lg-5 mx-lg-0">

                <h4>Total Products : {products.length}</h4>

                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 g-lg-5 py-5">
                    {
                        products.map(product => (
                            <ProductCard key={product._id} product={product} >
                                <Link to={`/update/${product._id}`}>
                                    <button className="btn btn-book">Update &nbsp;<i className="far fa-edit"></i></button>
                                </Link>
                            </ProductCard>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;