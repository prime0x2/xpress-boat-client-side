import React from 'react';
import './AddProduct.css';
import { useForm } from "react-hook-form";
import axios from 'axios';

const AddProduct = () => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        axios.post('https://dry-dusk-43936.herokuapp.com/products', data)
            .then((res) => {
                if (res.data.insertedId) {
                    alert('Product Added Successfully...!');
                    reset();
                }
            });
    }

    return (
        <div className="page add-product">
            <div className="add-product-box text-center py-4 mx-3 p-lg-5 mx-lg-0">

                <h4>Add a New Product</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input {...register("name")} placeholder="Name" required />
                        <input {...register("model")} placeholder="Model" required />
                    </div>
                    <div>
                        <input type="number" {...register("price")} placeholder="Price" required />
                        <input {...register("country")} placeholder="Country" required />
                    </div>
                    <div>
                        <input {...register("type")} placeholder="Boat Type" required /> <br />
                        <textarea {...register("description")} placeholder="Short Description" required /> <br />
                        <input {...register("img")} placeholder="Boat Image" required />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;