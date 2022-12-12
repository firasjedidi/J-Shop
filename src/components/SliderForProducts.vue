<script>
import 'vue3-carousel/dist/carousel.css'
import 
    { 
        Carousel,
        Slide, 
        Navigation
    }
from 'vue3-carousel'
import Product from './Product.vue'
export default {
    setup() {
        var  settings= {
            itemsToShow: 1,
            snapAlign: 'start',
            autoplay:"5000" 
        }
        var breakpoints= {
            768: {
            itemsToShow: 2,
            snapAlign: 'start',
            },
            1024: {
            itemsToShow: 3,
            snapAlign: 'start',
            },
            1280:{
            itemsToShow: 4,
            snapAlign: 'start',
            }
        }
        return{
            settings,
            breakpoints,
        }  
    },
    components:{
        Carousel,
        Slide,
        Navigation,
        Product
    },
    props:{
        Prodects:Array
    }
}
</script>
<template>
    <carousel :settings="settings" :breakpoints="breakpoints" :transition="500" >
        <slide  v-for="product in Prodects" :key="product" >
            <Product 
                :product="product"
            />
        </slide>
        <template #addons>
            <navigation />
        </template>
    </carousel>
</template>