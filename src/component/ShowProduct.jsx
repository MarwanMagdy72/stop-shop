import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/action";
import { useParams } from "react-router";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addItem(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 mb-5">
          <img
            src={product.image}
            alt={product.title}
            height={"400px"}
            width={"100%"}
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder w-50 text-center p-2 rounded-4 shadow">
            {" "}
            Rating: {product.rating && product.rating.rate}
            <i key="star" className="fa fa-star ms-1 text-warning"></i>
          </p>
          <h3 key={product.id} className="display-6 fw-bold my-5">
            Price: {product.price}$
          </h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2 "
            onClick={() => {
              addProduct(product);
  
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Item Added ✔",
                showConfirmButton: false,
                timer: 2000,
              });
            }}
          >
            Add to cart
          </button>
          <NavLink
            to="/cart"
            className=" btn btn-dark px-3 py-2 ms-2"
            key="go-to-cart"
          >
            Go to cart
          </NavLink>
        </div>
      </>
    );
  };
  
  return (
    <>
      <div className="container py-5">
        <div className="row py-5">
          {" "}
          {loading ? <Loading /> : <ShowProduct />}{" "}
        </div>
      </div>
    </>
  );
};

export default Product;
