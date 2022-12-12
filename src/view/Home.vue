<script >
import NavBar from '../components/NavBar.vue'
import Slider from '../components/Slider.vue';
import Products from '../components/Products.vue';
import Footer from '../components/Footer.vue';
import Pagination from '../components/Pagination.vue';
import {useProductsStore} from '../stores/products'
import Sign from './Sign.vue';
import Wellcome from '../components/Wellcome.vue';

export default {
    setup(){
        const store = useProductsStore()
        if (JSON.parse(localStorage.getItem('count')) === 1) {
            localStorage.setItem('dialog',JSON.stringify(false))
        } else {
            localStorage.setItem('dialog',JSON.stringify(true))
            localStorage.setItem('count',JSON.stringify(1))
        }  
        
        return {
            store,
            
        }
    },
    components:{
        NavBar,
        Slider,
        Products,
        Footer,
        Pagination,
        Sign,
        Wellcome
    },
    mounted(){
        this.store.loader=true
        setTimeout(()=>{
            this.store.loader=false
        },4000) 
       
            
    }
    
}
</script>

<template >
    <div class="bg-gray-100 overflow-hidden">
        <NavBar  /> 
        <main class="maw-w-2xl mx-auto">  
            <Slider  />
            <Wellcome/>
            <Sign />
            <Products />
            <Pagination/>
        </main>
        <Footer  />           
    </div>
</template>