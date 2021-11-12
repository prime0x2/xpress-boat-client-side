import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logo.png';
import './Header.css';

const Header = () => {

    const { admin, user, logOut } = useAuth();

    const [navbar, setNavbar] = useState(false);
    const location = useLocation();

    const changeNavbarBG = () => {
        if (window.scrollY >= 74) {
            setNavbar(true);
        }
        else {
            setNavbar(false);
        }
    }

    if (location.pathname === "/") {
        window.addEventListener('scroll', changeNavbarBG);
    }

    return (
        <header>
            <nav className={
                location.pathname === "/" || "/account" ? (navbar ? "navbar active fixed-top navbar-expand-lg navbar-dark" : "navbar fixed-top navbar-expand-lg navbar-dark") :
                    "navbar active2 fixed-top navbar-expand-lg navbar-dark"
            }>
                <div className="container">
                    <div className="d-flex align-items-center">
                        <Link className="navbar-brand" to="/"><img src={logo} alt="" /></Link>
                        <Link className={
                            location.pathname === "/" || "/account" ?
                                (navbar ? "navbar-brand active" : "navbar-brand") :
                                ("navbar-brand active2")
                        } to="/">
                            <h4 className="m-0 fw-bold">X-Press Boat</h4>
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact to="/" activeClassName={
                                    location.pathname === "/" ?
                                        (navbar ? "selected" : " ") :
                                        ("selected")
                                } className="nav-link px-4 text-light">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/inventory" activeClassName={
                                    location.pathname === "/" ?
                                        (navbar ? "selected" : " ") :
                                        ("selected")
                                } className="nav-link px-4 text-light">Inventory</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dashboard" activeClassName={
                                    location.pathname === "/" ?
                                        (navbar ? "selected" : " ") :
                                        ("selected")
                                } className="nav-link px-4 text-light">Dashboard</NavLink>
                            </li>
                            {
                                !user &&
                                <li className="nav-item">
                                    <NavLink to="/account" activeClassName={
                                        location.pathname === "/" ?
                                            (navbar ? "selected" : " ") :
                                            ("selected")
                                    } className="nav-link px-4 text-light">Account</NavLink>
                                </li>
                            }
                        </ul>
                        <div>
                            {
                                user &&
                                <div className="dropdown ms-4 my-2">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-circle"></i> &nbsp;{user.displayName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                        {
                                            admin ?
                                            <>
                                                <li className="dropdown-item">
                                                    <NavLink to="/manageOrders" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">Manage Orders</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/updateProduct" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">Update Product</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/addProduct" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">Add Product</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/addAdmin" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">Add Admin</NavLink>
                                                </li>
                                            </> :
                                            <>
                                                <li className="dropdown-item">
                                                    <NavLink to="/myOrders" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">My Orders</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/myReviews" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">My Reviews</NavLink>
                                                </li>
                                                <li className="dropdown-item">
                                                    <NavLink to="/payment" activeClassName={
                                                        location.pathname === "/" ?
                                                            (navbar ? "selected" : " ") :
                                                            ("selected")
                                                    } className="nav-link p-0 text-light">Payment</NavLink>
                                                </li>
                                            </>
                                        }
                                        <li className="dropdown-item">
                                            <button className="btn-logout rounded p-0" onClick={logOut}>Logout&nbsp; <i className="fas fa-sign-out-alt"></i></button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;