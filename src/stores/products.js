import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"
export const useProductsStore = defineStore("products",{
  state: () => ({
    products:[],
    searchProducts:[],
    categories:[],
    loader:false,
    product:[],
    img:null,
    randomProdects:[],
    categorie:[],
  }),
  getters: {},
  actions: {
    async fetchProducts(offset) {
      if (offset) {
         try {
            const res = await axios.get(`https://dummyjson.com/products?limit=20&skip=${offset}`)
            this.products = res.data.products
          }
          catch (error) {
            console.error(error)
          } 
      } else {
          try {
            const res = await axios.get('https://dummyjson.com/products?limit=20&skip=0')
            this.products = res.data.products
           
          }
          catch (error) {
            console.error(error)
          } 
      }
        
    },
    async fetchProduct(id) {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`)
        this.product = res.data
        this.img = res.data.images[0]

        console.log(res.data,'one');
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchAllProducts() {
      var random=Math.floor(Math.random()*(10-1+1)+ 1);
      try {
        const res = await axios.get(`https://dummyjson.com/products`)
        this.randomProdects = res.data.products.slice(random,res.data.products.length)
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchCategories() {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories')
        this.categories = res.data
      }
      catch (error) {
        console.error(error)
      }
    },
    async fetchCategorie(id) {
      try {
        const res = await axios.get(`https://dummyjson.com/products/category/${id}`)
        this.categorie = res.data.products
      }
      catch (error) {
        console.error(error)
      }
    },
    async search(id) {
      try {
        const res = await axios.get(`https://dummyjson.com/products/search?q=${id}`)
        this.searchProducts = res.data.products
      }
      catch (error) {
        console.error(error)
      }
    },
    setImg(img){
     if (img) {
      if (img !== null) {
        this.img = img
      }
      else{
        this.img = img
      }
     }
     
    }
  },
})