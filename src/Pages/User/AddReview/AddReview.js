import React from 'react';
import './AddReview.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const AddReview = () => {
    
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    
    const onSubmit = (data) => {
        axios.post('https://dry-dusk-43936.herokuapp.com/reviews', data)
            .then((res) => {
                if (res.data.insertedId) {
                    alert('Review Added Successfully...!');
                    reset();
                }
            });
    }
    
    return (
        <div className="page dashboard-page add-review">
            <div className="add-review-box text-center py-4 mx-3 p-lg-5 mx-lg-0">

                <h4>Add a Review</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} defaultValue={user.displayName} placeholder="Name" required />
                    <input type="number" {...register("rating", {min:0, max:5})} placeholder="Rating Out of 5" required />
                        <textarea {...register("details")} placeholder="Review Details" required />
                    <input type="submit" value="Add Review" />
                </form>
            </div>
        </div>
    );
};

export default AddReview;