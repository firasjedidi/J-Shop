<script>
import Product from './Product.vue';
import 'vue3-carousel/dist/carousel.css'
import {useProductsStore} from '../stores/products'
import SliderForProducts from './SliderForProducts.vue';
export default {
    setup(){
      const store = useProductsStore()
      return{
        store
      }
    },
  components: { 
    Product,
    SliderForProducts,
  },
  async created(){
   await this.store.fetchProducts()
  }
}
</script>

<template>
  <div v-if="!store.loader" class="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-36 mx-auto">
    <div  v-for="product in store.products.slice(0,4) " :key="product.id">
      <Product 
        :product="product"
      />
    </div>
    <!--  md:col-span-full  -->
    
    <div  class=" md:col-span-2 " v-for="product in store.products.slice(4,5) " :key="product.id">
      <Product 
        :product="product"
      />
    </div>
    <div   v-for="product in store.products.slice(5,7) " :key="product.id">
      <Product 
        :product="product"
      />
    </div>
    <!-- carousel with 8 card --> 
   
    <div  class="md:col-span-full  overflow-hidden ">
      <SliderForProducts :Prodects="store.products.slice(7,16) "/>
    </div>
   <!-- rest normal -->
    <div  v-for="product in store.products.slice(16,18) " :key="product.id">
      <Product 
       :product="product"
      />
    </div>

    <div  v-for="product in store.products.slice(18,20) " :key="product.id">
      <Product 
        :product="product"
      />
    </div>
  </div>

  <div v-if="store.loader"  class="flex items-center justify-center w-full h-full">
    <div class="flex justify-center items-center space-x-1 text-sm text-amazone">
      <svg fill='none' class="w-20 h-20 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
        <path clip-rule='evenodd'
          d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
          fill='currentColor' fill-rule='evenodd' 
        />
      </svg>
    </div>
  </div>
</template>



