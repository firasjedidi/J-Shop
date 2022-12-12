<script>
import {  useRoute } from 'vue-router';
import { useCartStore } from '../stores/Cart';
import {useProductsStore} from '../stores/products'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import Product from '../components/Product.vue';
import SliderForProducts from '../components/SliderForProducts.vue';
import Sign from './Sign.vue';
import { ref,watch ,onMounted ,onBeforeMount,onUnmounted } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import 
    { 
        Carousel,
        Slide, 
    }
from 'vue3-carousel'
export default {
    setup(){
        const route=useRoute()
        const {id}=route.params
        const store = useProductsStore()
        const useCart=useCartStore()
        const rat=ref(3)
        var rating=Array(rat.value).fill()
        onBeforeMount(async() => {
            await store.fetchProduct(id)  
            await store.fetchAllProducts()
         })
         onUnmounted(()=>{
            store.setImg(null)
         })
        watch(()=>{
            useCart.checkProductTotal(id)
            useCart.checkProduct(id)
            store.setImg(null)
        })
        const addToCart=(item)=>{
            useCart.addToCart(item)
            useCart.checkProduct(item.id)
        }
        const increment =(id)=>{
            useCart.incrementQuantity(id)
        }
        const decrement =(id)=>{
            useCart.decrementQuantity(id)
        }
        const slideTo =(val)=> {
            store.setImg(val)
        }
        
        return{
            id,
            store,
            rating,
            addToCart,
            increment,
            decrement,
            useCart,
            slideTo
        }
    },components:{
        NavBar,
        Footer,
        Product,
        SliderForProducts,
        Sign,
        Carousel,
        Slide 
    },
}
</script>
<template>
    <div class="bg-gray-100 ">
        <NavBar/>
        <Sign/>
        <main class="lg:flex max-w-3xl mx-auto my-5">
            <div class="flex-grow m-5 shadow-sm">
                <div class="flex flex-col p-5 space-y-10 bg-white">
                    <div  class="grid grid-cols-8 ">
                        
                        <div class="col-span-3 flex flex-col space-y-2 my-auto justify-start">
                           <picture>
                                <source :srcset="store.img" type="image/webp">
                                <source :srcset="store.img" type="image/jpg">
                                <img 
                                    class="w-full h-32 object-contain"
                                    :src="store.img"
                                    :alt="store.product.category"
                                />
                           </picture>
                              
                            
                            <div class=" flex flex-grow flex-shrink justify-between" >
                                <img    
                                    class=" h-9 w-7 p-1 md:w-10  lg:w-14 cursor-pointer "
                                    v-for="(image,index) in store.product.images"
                                    @click.prevent="slideTo(image)"
                                    :key="index" :src="image" 
                                    :alt="store.product.category"
                                >
                            </div>
                        </div>
                        <div class="col-span-5 m-6 ">
                          
                            <p>{{store.product.title}}</p>
                            <span class="text-xs">{{store.product.brand}}</span>
                            <div class="flex "> 
                                <div  v-for="star in rating" :key="star">
                                <font-awesome-icon class="text-yellow-500"  icon="fa-solid fa-star" />
                                </div>
                            </div>
                            <p class="text-xs my-2 line-clamp-3">
                                {{store.product.description}}
                            </p>
                            <p :class="store.product.stock ? 'text-green-800 text-xs font-semibold': 'text-red-800 text-xs'" >{{store.product.stock ? 'In Stock': 'unpurchasable'}}</p>
                            <p v-if="store.product.discountPercentage" class="w-8 text-[10px] p-1 bg-yellow-100 text-yellow-600">
                                -{{
                                    Math.floor(store.product.discountPercentage)
                                }}%
                            </p>
                            <div v-if="useCart.check === null">
                                <p  class="text-sm font-semibold">
                                {{
                                    new Intl.NumberFormat('en-IN',
                                    {
                                        style: 'currency',
                                        maximumSignificantDigits: 3 ,
                                        currency:"USD"
                                    }).format(store.product.price)
                                }}
                                </p>
                                <p v-if="store.product.discountPercentage"  class="line-through text-[12px] text-gray-400">
                                    {{
                                    new Intl.NumberFormat('en-IN',
                                    {
                                        style: 'currency',
                                        maximumSignificantDigits: 3 ,
                                        currency:"USD"
                                    }).format(store.product.price/(1-(store.product.discountPercentage/100)))
                                    
                                    }}
                                </p>
                            </div>
                        
                            <p v-else class="text-sm font-semibold">
                                {{
                                    new Intl.NumberFormat('en-IN',
                                    {
                                        style: 'currency',
                                        maximumSignificantDigits: 3 ,
                                        currency:"USD"
                                    }).format(useCart.productTotal)
                                }}
                            </p>
                            <div class="flex flex-col  my-2 justify-end">
                                <!--  -->
                                <button v-if="useCart.check === null" @click="()=> addToCart({...store.product,quantity:1})"  class="btn flex items-center justify-center ">
                                    <font-awesome-icon class="mx-1" icon="fa-solid fa-cart-plus" />
                                    add to cart 
                                </button>
                                <div   v-if="(useCart.check!==null)" class="flex items-center justify-around  ">
                                    <button @click="()=>decrement(store.product.id)"  class="btn ">
                                    <font-awesome-icon   icon="fa-solid fa-minus" />
                                    </button>
                                    <p class="text-sm font-semibold ">{{useCart.check.quantity}}</p>
                                    <button @click="()=>increment(store.product.id)" class="btn"> 
                                        <font-awesome-icon   icon="fa-solid fa-plus" />
                                    </button>
                                </div> 
                            </div>
                           
                     </div>
                   
                    </div>
                    
                </div>
                
            </div>
        </main>
        <div  class="overflow-hidden mx-2 my-4 bg-white">
            <SliderForProducts 
                v-if="store.randomProdects.length" 
                :Prodects=" store.randomProdects"
            />

            <div v-if="store.randomProdects.length===0">
                <img 
                    class=" w-40  mx-auto px-5 py-2"
                    src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp"  
                    alt="empty"
                >
            </div>
        </div>
        
        <Footer/>
    </div>
</template>