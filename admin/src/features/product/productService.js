import axios from "axios";
import axiosB from "../../utils/axiosB"
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`,);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};
const deleteProduct = async (id) => {
  const response = await axiosB.delete(`${base_url}product/${id}`);

  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`, 
    {title: product.productData.title,
     price: product.productData.price,
     brand: product.productData.brand,
     category: product.productData.category,
     color: product.productData.color,
     quantity: product.productData.quantity,
     images: product.productData.images
    }, config);

  return response.data;
};


const productService = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
