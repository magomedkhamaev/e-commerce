import React from 'react';
import watch from "../images/watch.jpg";
import {useDispatch, useSelector} from "react-redux";
import { fetchOrder } from "../redux/slices/order";

const Order = () => {
    const dispatch = useDispatch();

  React.useEffect(()=> {
    dispatch(fetchOrder());
   }, [])
   const orderState = useSelector((state) => state?.order?.order);
   const check = orderState?.items !== [] && orderState?.items[0];
   console.log(orderState);
    return <>
    <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-1">Price</h4>
              <h4 className="cart-col-1">Count</h4>
              <h4 className="cart-col-1">orderStatus</h4>
              <h4 className="cart-col-1">orderBy</h4>
              <h4 className="cart-col-1">amount</h4>
            </div>
            
     {check && orderState?.items?.map((item,index)=> {
                return ( 
                    
                  <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                            <div className="cart-col-1 gap-15 d-flex align-items-center">
                              <div className="w-75">
                                <img src={item?.orderItems?.[0]?.product?.images?.[0]?.url} className="img-fluid" alt="product image" />
                              </div>
                              <div className="w-75">
                                <p>{item?.orderItems?.[0]?.product?.title}</p>
                               
                              </div>
                            </div>
                            <div className="cart-col-1 w-25">
                              <h5 className="price">$ {item?.orderItems?.[0]?.product?.price}</h5>
                            </div>
                            <div className="cart-col-1 d-flex align-items-center gap-15">
                            {item?.orderItems?.[0]?.quantity}
                            </div>
                            <div className="cart-col-1">
                              <h5 className="price">{item?.orderStatus}</h5>
                            </div>
                           
                            <div className="cart-col-1">
                              <h5 className="price">{item?.user?.firstname}</h5>
                              <h5 className="price">{item?.user?.lastname}</h5>
                            </div>
                            <div className="cart-col-1">
                              <h5 className="price">$ {item?.totalPriceAfterDiscount}</h5>
                            </div>
                          </div>
                          
              )
                   })
                
              }
    
    {/* <div className="col-12">
    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-75">
                  <img src={orderState?.items?.[0]?.orderItems?.[0]?.product?.images?.[0]?.url} className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>{orderState?.items?.[0]?.orderItems?.[0]?.product?.title}</p>
                 
                </div>
              </div>
              <div className="cart-col-1 w-25">
                <h5 className="price">$ {orderState?.items?.[0]?.orderItems?.[0]?.product?.price}</h5>
              </div>
              <div className="cart-col-1 d-flex align-items-center gap-15">
              {orderState?.items?.[0]?.orderItems?.[0]?.quantity}
              </div>
              <div className="cart-col-1">
                <h5 className="price">{orderState?.items?.[0]?.orderStatus}</h5>
              </div>
             
              <div className="cart-col-1">
                <h5 className="price">{orderState?.items?.[0]?.user?.firstname}</h5>
                <h5 className="price">{orderState?.items?.[0]?.user?.lastname}</h5>
              </div>
              <div className="cart-col-1">
                <h5 className="price">$ {orderState?.items?.[0]?.totalPriceAfterDiscount}</h5>
              </div>
            </div>
            </div> */}
    </>
}
export default Order;