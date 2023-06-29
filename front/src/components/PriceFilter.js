import React from 'react';
import { useDispatch } from "react-redux";
import { setPriceFrom, setPriceTo } from '../redux/slices/filters';

const PriceFilter = () => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState();
    const [price, setPrice] = React.useState();


    // React.useEffect(() => {
    //     dispatch(setPriceFrom(value))
    // }, [value])
    // const updateSearchValue =  React.useCallback(
    //     // debounce((str) => {
            
    //     // }, 500)
    //     , 
    //     [value],
    //  );

    const onChangeInput = (event) => {
        // setValue(event.target.value);
        dispatch(setPriceFrom(event.target.value));
        // dispatch(setPriceTo(event.target.value));
        // updateSearchValue(event.target.value)
    }
    const onChangeTo = (event) => {
      // setValue(event.target.value);
      dispatch(setPriceTo(event.target.value));
      // updateSearchValue(event.target.value)
  }
//    console.log(value,price);
    return <>
    <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      value={value}
                      onChange={onChangeInput}
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      value={price}
                      onChange={onChangeTo}
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
    </>
}

export default PriceFilter;