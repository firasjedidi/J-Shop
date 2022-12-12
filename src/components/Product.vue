<script>
import { useCartStore } from '../stores/Cart';
import {  useRouter } from 'vue-router';
export default {
  setup(props){
    const useCart=useCartStore()
    const rating = Array(Math.floor( props.product.rating || 3)).fill('0')
    const router=useRouter()
    const addToCart=(item)=>{
      useCart.addToCart(item)
    }
    const navigate =(id,item)=>{
      useCart.seenProducts(item)
      router.push({name:`Details`,params: { id }})
    }
    return{
      rating,
      addToCart,
      navigate
    }
  },
  props:{
    product:Object,
  }, 
}
</script>

<template>
  <div  class="cursor-pointer relative flex flex-col m-5 bg-white z-30 p-10">
    <div  @click.prevent="navigate(product.id,product)">
      <p v-if="product.discountPercentage" class="absolute top-2 text-[10px] p-1 bg-yellow-100 text-yellow-600">
          -{{
            Math.floor(product.discountPercentage)
          }}%
        </p>
      <p class="absolute top-2 right-2 text-xs text-gray-400">{{product.category}}</p>
      
      <picture>
        <source  :srcset="product.thumbnail ?? product.images[0]" type="image/mage/webp">
        <source  :srcset="product.thumbnail ?? product.images[0]" type="image/mage/jpg">
        <img  class="w-full h-40 object-contain"  :src="product.thumbnail ?? product.images[0]" :alt="product.category">
     </picture>

      <h4 class="my-3">{{product.title}}</h4>
      <div class="flex "> 
        <div  v-for="star in rating" :key="star">
          <font-awesome-icon class="text-yellow-500"  icon="fa-solid fa-star" />
        </div>
      </div>
      <p class="text-sm my-2 line-clamp-2">{{product.description}}</p>
      <div>
        <p   class="text-sm font-semibold">
          {{
            new Intl.NumberFormat('en-IN',
            {
              style: 'currency',
              maximumSignificantDigits: 3 ,
              currency:"USD"
            }).format(product.price)
          }}
        </p>
       
        <p v-if="product.discountPercentage"  class="line-through text-[12px] text-gray-400">
          {{
            new Intl.NumberFormat('en-IN',
            {
              style: 'currency',
              maximumSignificantDigits: 3 ,
              currency:"USD"
            }).format(product.price/(1-(product.discountPercentage/100)))
            
          }}
          
        </p>
      </div>
    </div>
    <button @click.prevent="addToCart({...product,quantity:1})" class="mt-2 text-base btn">
      Add To Cart <font-awesome-icon class="text-white h-4"  icon="fa-solid fa-cart-plus" />
    </button> 
  </div>
</template>

