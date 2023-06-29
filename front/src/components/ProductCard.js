import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import {useDispatch, useSelector} from "react-redux";
import { addToWishList } from "../redux/slices/product";
const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  // console.log(grid);
  let location = useLocation();
  // useEffect(()=> {
  //   addProdToWishList();
  //  },[])
   const addProdToWishList = (id) => {
    console.log(id);
     dispatch(addToWishList(id));
   }

  return (
    <>
    {/* <div className="col-12"> */}
    { data &&
      data?.map((item,index) => {
        return (
         <div
         key={index}
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          // to={`${
          //   location.pathname == "/"
          //     ? "/product/:id"
          //     : location.pathname == "/product/:id"
          //     ? "/product/:id"
          //     : ":id"
          // }`}
          to={'/product/'+ item?._id}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button onClick={(e)=> {addProdToWishList(item?._id)}} className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={item?.images[0]?.url} className="img-fluid" alt="product image" />
            <img src={item?.images[1]?.url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <h5 className="product-title">
              {item?.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={item?.totalrating}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
             {item?.desc}
            </p>
            <p className="price">${item?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
      
         
        )
      })
    }
    {/* </div> */}
    
      
    </>
  );
};

export default ProductCard;
