import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchProdSingleCat} from "../redux/slices/prodCat"
import Container from "./Container";
const ProductCategory = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const productCatState = useSelector(state => state?.prodCat?.single?.items);
    const getproductCatId = location.pathname.split("/")[2];
    useEffect(() => {
        dispatch(fetchProdSingleCat(getproductCatId))
      }, [])
      
    return <>
    {
        productCatState && productCatState?.product?.map((item,index)=> {
            return (
           
            // <div key={index} className="d-flex gap align-items-center">
            //     <div>
            //       <h6>aaa</h6>
            //       <p>{item?.title}</p>
            //     </div>
            //     <img src={require("../images/camera.jpg")} alt="camera" />
            //   </div>
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                <div key={index} className="col-3">
                <div className="product-card position-relative">
                <div className="product-image">
            <img src={item?.images[0]?.url} className="img-fluid" alt="product image" />
            <img src={item?.images[1]?.url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <h5 className="product-title">
              {item?.title}
            </h5>
            <p className={`description  "d-block"`}>
             {item?.description}
            </p>
            <p className="price">${item?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
            </div>
          </div>
                </div>
          
      </div>
                </div>
           
            </Container>
            )
        })
    }
    
    </>
}

export default ProductCategory;