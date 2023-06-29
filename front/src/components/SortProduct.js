import React, { useState } from 'react';
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { setSort } from '../redux/slices/filters';

const SortProduct = () => {
    const [grid, setGrid] = useState(4);
    const dispatch = useDispatch();

    const onChangeOption = (event) => {
      dispatch(setSort(event.target.value));
    }
    return <>
    {/* <div className="col-9"> */}
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  {/* <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={onChangeOption}
                  >
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select> */}
                   <select
                    name=""
                    // defaultValue={"-totalrating"}
                    className="form-control form-select"
                    id=""
                    onChange={onChangeOption}
                  >
                    <option value="-totalrating">Featured</option>
                    <option value="-sold">Best selling</option>
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">
                      Alphabetically, Z-A
                    </option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                
              </div>
            </div>
            {/* <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard grid={grid} />
              </div>
            </div> */}
          {/* </div> */}
    </>
}

export default SortProduct;