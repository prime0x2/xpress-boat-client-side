import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {

    const [email, setEmail] = useState('');


    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleAddAdmin = (e) => {
        e.preventDefault();
        
        const user = { email };
        fetch('https://dry-dusk-43936.herokuapp.com/users/admin', {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then((data) => {
                if (data.modifiedCount) {
                    alert('New Admin Added...!');
                }
                if ((!data.modifiedCount) && (data.matchedCount)) {
                    alert('Admin Already Added...!');
                }
                if (!data.matchedCount) {
                    alert('User Must Create a Account...!');
                }
            });
    }

    return (
        <div className="page add-admin">
            <div className="add-admin-box text-center p-3 p-lg-5">
                <h5>Add New Admin</h5>
                <br />
                <form onSubmit={handleAddAdmin}>
                    <input type="email" onChange={getEmail} placeholder="Enter Email Address" />
                    <br />
                    <button type="submit" className="btn btn-regular mt-4">Add Admin</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;