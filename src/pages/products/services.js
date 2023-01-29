import axios from "axios";


export function getProducts(){
    return axios.get('https://dummyjson.com/products?select=title,description,price,discountPercentage,rating,stock,brand,category');
}

export function getLimitedProducts(limit,skip){
    return axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,description,price,discountPercentage,rating,stock,brand,category`)
}

export function getFilteredProducts(value,limit,skip){
    return axios.get(`https://dummyjson.com/products/search?q=${value}&limit=${limit}&skip=${skip}&select=title,description,price,discountPercentage,rating,stock,brand,category`)
}

export function getCategoryProducts(category,limit,skip){
    return axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}&select=title,description,price,discountPercentage,rating,stock,brand,category`)
}