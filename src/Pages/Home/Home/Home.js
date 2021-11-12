import React from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';

const Home = () => {
    return (
        <div className="page home">
            <Banner />
            <Products />
        </div>
    );
};

export default Home;