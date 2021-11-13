import React from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import Reviews from '../Reviews/Reviews';
import Subscribe from '../Subscribe/Subscribe';

const Home = () => {
    return (
        <div className="page home">
            <Banner />
            <Products />
            <Reviews />
            <Subscribe />
        </div>
    );
};

export default Home;