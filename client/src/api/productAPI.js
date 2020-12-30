import axiosInstance from "../helpers/axiosService";

export const getProducts = async (sortBy) => {
  try {
    const response = await axiosInstance.get(
      `/products?sortBy=${sortBy}&order=desc&limit=8`
    );

    const products = await response.data.products;

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const productDetail = async (slug) => {
  try {
    const response = await axiosInstance.get(`/product/${slug}`);

    const product = await response.data.product;

    return product;
  } catch (error) {
    console.log(error);
  }
};
