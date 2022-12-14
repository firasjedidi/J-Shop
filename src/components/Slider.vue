<script>
import 'vue3-carousel/dist/carousel.css'
import 
    { 
        Carousel, Slide, 
        Pagination, Navigation
    }
from 'vue3-carousel'
import {  useProductsStore } from '../stores/products'
import {  useRouter } from 'vue-router';
export default {
    setup(){
        const store=useProductsStore()
        const router=useRouter()
        const navigate=(id)=>{
            router.push({name:`Details`, params: { id }})
        }
      
        return{
            store,
            navigate
        }
    },
    components: {
        Carousel,
        Slide,
        Navigation,
   },
   async  created(){
    await this.store.fetchAllProducts()
    }
} ;
</script>
<template>
    <div class="relative mt-20">
        <div class="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" ></div>
        <carousel :items-to-show="1" :autoplay="5000" >
            <slide v-for="slide in store.randomProdects" :key="slide" >
                <picture>
                    <source   :srcset="slide.thumbnail " type="image/mage/webp">
                    <source  :srcset="slide.thumbnail " type="image/mage/jpg">  
                    <img   @click.prevent="navigate(slide.id)"  :srcset="slide.thumbnail " class="object-contain w-full h-auto aspect-square  cursor-pointer" :alt="slide.name">
                </picture>

            </slide>
            <template #addons>
                <navigation />
            </template>
        </carousel>
    </div>
</template>

