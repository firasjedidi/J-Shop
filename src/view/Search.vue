<script>
import {useProductsStore} from '../stores/products'
import NavBar from '../components/NavBar.vue'
import Product from '../components/Product.vue';
import Footer from '../components/Footer.vue'
import Sign from './Sign.vue';
import {  useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';
export default {
    setup() {
        const store = useProductsStore()
        const route = useRoute()
        const data = route.query.q
        onBeforeMount(async()=>{
            console.log(data,'query',);
            if (!store.searchProducts) {
                console.log('yep');
                await store.search(data) 
            }
            
        })
        return{
            store,
        }
    },
    components:{
        NavBar,
        Product,
        Footer,
        Sign
    },
  
   
}
</script>
<template >
    <div>
        <NavBar/>
        <Sign/>
            <main class="maw-w-2xl mx-auto">
            <div class="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:  mx-auto">
                <div v-for="product in store.searchProducts" :key="product.id">
                    <Product 
                        :product="product"
                    />
                </div>
            </div>  
            
            <div v-if="!store.searchProducts.length ">
                <picture>
                    <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669158082/no-data-available_y9vcfo.webp" type="image/webp">
                    <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669158082/no-data-available_y9vcfo.webp" type="image/webp">
                    <img class=" mx-auto"  src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669158082/no-data-available_y9vcfo.webp" alt="no data">
                </picture>            
            </div>
        </main>
        <Footer/>
    </div>
</template>