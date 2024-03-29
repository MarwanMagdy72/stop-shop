import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([data]);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);

      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);



  const filterProduct = (cat) => {
    const filtered = data.filter((product) => product.category === cat);
    setFilter(filtered);
  };



  const ShowProducts = () => {
    return (
      <>
        <ButtonGroup className="buttons d-flex flex-wrap justify-content-center m-5 col-md-10">
          <Button variant="outline-dark" className=" m-2 " onClick={() => setFilter(data)}>
            All
          </Button>
          <Button variant="outline-dark" className=" m-2"  onClick={() => filterProduct("men's clothing")}>
            Men's Clothing
          </Button>
          <Button variant="outline-dark" className=" m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </Button>
          <Button variant="outline-dark" className=" m-2" onClick={() => filterProduct("jewelery")}>
            Jewelry
          </Button>
          <Button variant="outline-dark" className=" m-2  " onClick={() => filterProduct("electronics")}>
            Electronics
          </Button>
        </ButtonGroup>

        {filter.map((product) => {
   
          return (
            
              <div className=" col-md-3 mb-4 mx-auto " key={product.id}>
                <Card className="h-100 text-center p-4" >
                  <Card.Img
                    variant="top" 
                    src={product.image}
                    height={"250px"}
                  />
                  <Card.Body>
                    <Card.Title className="mb-0"> <h5>{product?.title?.substring(0,12)}</h5> </Card.Title>
                    <Card.Text className="lead fw-bold">
                      {product.price}$
                    </Card.Text>
                    <NavLink  variant="outline-dark" to={`/products/${product.id}`}  className={"btn btn-outline-dark"}> Buy Now </NavLink>
                  </Card.Body>
                </Card>
              </div>
            
          );
        })}
      </>
    );
  };
  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-12 mb-3">
            <h1 className="display-6 fw-bolder text-center">
              Latest Products
            </h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center m-0 p-0">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default Products;
