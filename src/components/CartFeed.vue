<script>
import { useCartStore } from '../stores/Cart';
export default {
  setup(props){
    const useCart=useCartStore()
    var rating= Array(Math.floor( props.product.rating || 3)).fill('0')
    const remove =(id)=>{
      useCart.removeFromCart(id)
    }
    const increment =(id)=>{
      useCart.incrementQuantity(id)
    }
    const decrement =(id)=>{
      useCart.decrementQuantity(id)
    }
    return{
      rating,
      remove,
      increment,
      decrement
    }
  },
  props:{
    product:Object
  }, 
}
</script>
<template>
  <div class="grid grid-cols-5  items-center">
    <picture>
      <source  :srcset="product.thumbnail || product.images[0]" type="image/mage/webp">
      <source  :srcset="product.thumbnail || product.images[0]" type="image/mage/jpg">
      <img  class="w-50 h-full object-contain"  :src="product.thumbnail || product.images[0]" :alt="product.category">
    </picture>
    <div class="col-span-3 m-4">
      <p>{{product.title}}</p>
      <div class="flex "> 
        <div  v-for="star in rating" :key="star">
          <font-awesome-icon class="text-yellow-500"  icon="fa-solid fa-star" />
        </div>
      </div>
      <p class="text-xs my-2 line-clamp-2">
        {{product.description}}
      </p>
      <p :class="product.stock ? 'text-green-800 text-xs font-semibold': 'text-red-800 text-xs'" >{{product.stock ? 'In Stock': 'unpurchasable'}}</p>
      <div class="flex items-center justify-between">
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
       
        <p v-if="product.discountPercentage" class="text-[12px] p-1 bg-yellow-100 text-yellow-600">
          -{{
            Math.floor(product.discountPercentage)
          }}%
        </p>
      </div>
    </div>
    <div class="flex flex-col space-y-2 my-auto justify-end" >
      <div class="md:flex flex-col md:flex-row items-center justify-evenly  ">
        <button @click.prevent="decrement(product.id)"  class="btn  w-full">
          <font-awesome-icon   icon="fa-solid fa-minus" />
        </button>
        <p class="text-sm font-semibold text-center w-full">{{product.quantity}}</p>
        <button @click.prevent="increment(product.id)" class="btn   w-full"> 
          <font-awesome-icon   icon="fa-solid fa-plus" />
        </button>
      </div>
      <button @click.prevent="remove(product.id)"  class="btn flex text-sm items-center justify-center ">
        <font-awesome-icon class="mx-1" icon="fa-solid fa-trash" />
       <span class="hidden md:inline ">Remove</span>  
      </button>
    </div>
  </div>
</template>




