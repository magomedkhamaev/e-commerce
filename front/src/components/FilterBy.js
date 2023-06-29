import React from "react";
import { useDispatch } from "react-redux";
import Color from "./Color";
import PriceFilter from "./PriceFilter";
import { setS, setM } from "../redux/slices/filters";

const FilterBy = () => {
   const dispatch = useDispatch();
  //  const [sValue, setSValue] = React.useState();
  //   const [mValue, setMValue] = React.useState();
    // const [S, setSy] = React.useState();
    // const [M, setMy] = React.useState();

  const onChangeS = (event) => {
    if(event.target.checked) {
      dispatch(setS(event.target.value))
    } else {
      dispatch(setS(''))
    }
    // setValue(event.target.value);
    
      
      // console.log('S', 'M');
    
    
    // dispatch(setPriceTo(event.target.value));
    // updateSearchValue(event.target.value)
}
const onChangeM = (event) => {
  // setValue(event.target.value);
  // console.log(mValue, sValue);
  if(event.target.checked) {
    dispatch(setM(event.target.value))
  } else {
    dispatch(setM(''))
  }
  
  // updateSearchValue(event.target.value)
}
    // const priceFrom = useSelector((state) => state.filter.value)
    // console.log(priceFrom, 'tss');
    return <>
    <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div> */}
                {/* <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div> */}
                <PriceFilter/>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={'S'}
                      // checked={false}
                      onChange={onChangeS}
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S 
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={'M'}
                      // checked
                      onClick={onChangeM}
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M 
                    </label>
                  </div>
                </div>
              </div>
            </div>
    </>
}

export default FilterBy;