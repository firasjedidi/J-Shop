<script>
import {useProductsStore} from '../stores/products'
import NavBar from '../components/NavBar.vue'
import Product from '../components/Product.vue';
import Footer from '../components/Footer.vue'
import Sign from './Sign.vue';
import { useRoute } from 'vue-router'
export default {
    setup() {
        const store = useProductsStore()
        const route = useRoute()
        const {name} = route.params
        return{
            name,
            store,
        }
    },
    components:{
        NavBar,
        Product,
        Footer,
        Sign
    },
    async mounted(){
        await this.store.fetchCategorie(this.name)
    },
    

}
</script>
<template >
    <div class=" bg-gray-100">
        <NavBar/>
        <Sign/>
        <main class="maw-w-2xl mx-auto ">
            <div class="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto  ">
                <div class="mt-24" v-for="product in store.categorie" :key="product.id">
                    <Product 
                        :product="product"
                    />
                </div>
            </div>  
           <div v-if="!store.categorie.length ">
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