import React from 'react';
import './OrderCard.css';

const OrderCart = ({ children, product }) => {
    
    const { name, img, description, model, price, type, country } = product;
    
    return (
        <div className="order-details my-3">
            <div className="row align-items-center">
                <div className="col-12 col-md-5 text-center">
                    <img className="p-2 border border-secondary rounded mb-3 m-lg-0" src={img} alt="" />
                </div>
                <div className="col-12 col-md-7 text-start ps-lg-5">
                    <h3 className="fw-bold"><span className="title-detail">{name}</span></h3>
                    <p className="fw-lighter my-4"><span className="text-detail">{description}</span></p>

                    <div className="product-detail-contact d-flex flex-wrap justify-content-between align-items-center">
                        <div>
                            <p><i className="fas fa-ship"></i> &nbsp;<span className="text-detail">Model : {model}</span></p>
                            <p><i className="fas fa-anchor"></i> &nbsp;<span className="text-detail">Type : {type}</span></p>
                        </div>
                        <div>
                            <p><i className="fas fa-globe"></i> &nbsp;<span className="text-detail">Country : {country}</span></p>
                            <p><i className="mx-1 fas fa-dollar-sign"></i>&nbsp; Price : ${price}</p>
                        </div>
                    </div>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderCart;