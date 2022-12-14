<script>
import NavBar from '../components/NavBar.vue';
import { useCartStore } from '../stores/Cart';
import {useProductsStore} from '../stores/products'
import {useUser} from '../stores/user'
import CartFeed from '../components/CartFeed.vue'
import Product from '../components/Product.vue';
import Footer from '../components/Footer.vue';
import SliderForProducts from '../components/SliderForProducts.vue';
import Sign from './Sign.vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    data() {
        return{
            useCart:useCartStore(),
            store:useProductsStore(),
            user: useUser(),
           
        }
    },
   
    components:{
        NavBar,
        Footer,
        Product,
        Sign,
        CartFeed,
        SliderForProducts,
        StripeCheckout
    },
    async created(){
        await this.store.fetchAllProducts()
    }

}
</script>
<template>
    <div class="bg-gray-100 ">
        <NavBar/>
        <Sign/>
        <main class="lg:flex max-w-3xl mx-auto ">
            <!-- list item  -->
            <div  class="flex-grow m-5 shadow-sm mt-24" >
                <div class="flex flex-col p-6 space-y-2 bg-white">
                    <h1 class="text-2xl mx-auto border-b pb-4 " v-if="useCart.items.length === 0">
                        <picture>
                            <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp">
                            <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp">
                            <img 
                                class=" w-40  mx-auto px-5 py-2"
                                src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp"  alt="Shopping Cart"
                            >
                        </picture>
                         Your Shopping Cart is empty
                    </h1>
                    <h1 class="text-3xl border-b pb-4 " v-else>
                        Your Shopping Cart
                    </h1>
                    <div v-for="product in useCart.items" :key="product.id">
                        <CartFeed
                            :product="product"
                            :desc="product.description"
                            :title="product.title" 
                            :price="product.price"
                            :id="product.id"
                            :images="product.images" 
                            :quantity="product.quantity" 
                            :category="product.category" 
                        />
                    </div>
                </div>
            </div>
            <!-- total $ -->
            <div class="flex flex-col mt-24 bg-white  p-10 shadow-md" v-if="useCart.items">
                <h2 class="whitespace-nowrap"> 
                    Subtotal ({{useCart.items.length}} items ):
                    <span class="font-semibold mx-1">
                        {{
                            new Intl.NumberFormat('en-IN',
                            {
                                style: 'currency',
                                maximumSignificantDigits: 3 ,
                                currency:"USD"
                            }).format(useCart.total)
                        }}
                    </span>
                </h2>
                
               <button
                    :class="!user.user ? ' from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed' :'btn mt-2' "
                    role="link"
                    :disabled="!user.user"
                >
                 {{user.user ?'Proced to checkout':'Sign in to checkout'}}
               </button>
            </div>
        </main>
        
        <div  class=" overflow-hidden  mx-2 my-4 bg-white">
            <h1  class=" my-1 mx-5 text-lg  font-sora whitespace-nowrap ">Recently viewed</h1>
            <SliderForProducts v-if="useCart.seen.length" :Prodects="useCart.seen"/>
            <div v-if="useCart.seen.length===0">
                <picture>
                    <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp"   >
                    <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp"  >
                    <img 
                        class=" w-40  mx-auto px-5 py-2"
                        src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp"  
                        alt="Shopping Cart"
                    >
                </picture>
                
            </div>
        </div>
        <div  class="overflow-hidden mx-2 my-4 bg-white">
            <h1 class="my-1 mx-5 text-lg  font-sora whitespace-nowrap  ">Most requested </h1>
            <SliderForProducts v-if="store.randomProdects.length" :Prodects="store.randomProdects"/>
           
            <div v-if="store.randomProdects.length===0">
                <picture>
                    <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp"   >
                    <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp" type="image/webp"  >
                    <img 
                        class=" w-40  mx-auto px-5 py-2"
                        src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669065233/empty_danhqo.webp"  
                        alt="Shopping Cart"
                    >
                </picture>
            </div>
        </div>
        <Footer />
    </div>
</template>