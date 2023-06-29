import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishList } from "../redux/slices/auth";
import { addToWishList } from "../redux/slices/product";

const Wishlist = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    getWishList()
  }, []);
  const getWishList = () => {
    dispatch(getUserWishList());
  }
  const wishlistState = useSelector((state) => state.auth?.data?.wishlist)
  const removeFromWishList = (id) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserWishList());
    }, 300)
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            wishlistState?.map((item, index) => {
              return(
                <div className="col-3" key={index}>
                <div className="wishlist-card position-relative">
                  {/* <img
                    src={item?.images[0]?.url}
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  /> */}
                  <p onClick={() => {removeFromWishList(item?._id)}} className="position-absolute cross img-fluid">X</p>
                  <div className="wishlist-card-image">
                    <img
                      src={item?.images[1]?.url ? item?.images[1]?.url : "images/watch.jpg"}
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                      {item?.title}
                    </h5>
                    <h6 className="price">$ {item?.price}</h6>
                  </div>
                </div>
              </div>
              )
            })
          }
          
          {/* <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="images/watch.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src="images/watch.jpg"
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Honor T1 7.0 1 GB RAM 8 GB ROM 7 Inch With Wi-Fi+3G Tablet
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
