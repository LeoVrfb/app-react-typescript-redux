import React, { useEffect, useState } from "react";
import heart from "./heart.svg";
import "./Products.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions";



export default function Products() {
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state.auth.inventory);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="container-products">
            {inventory.map((item) => (
                <Link
                    to={{
                        pathname: `/produits/${item.title.replace(/\s+/g, "").trim()}`,
                    }}
                    key={item.documentId}
                >
                    <div className="bloc-card">
                        <div className="product-card">
                            <div className="visual-aspect">
                                <img
                                    className="img-product"
                                    src={process.env.PUBLIC_URL + `/images/${item.img}.png`}
                                    alt="produit"
                                />
                                <div className="like-container">
                                    <img src={heart} alt="icône j'aime" />
                                </div>
                            </div>
                            <div className="info">
                                <p>{item.title}</p>
                                <p>Prix : {item.price}€</p>
                            </div>
                        </div>
                        <div className="back-card"></div>
                    </div>
                </Link>
            ))}

        </div>
    );
}