<script>
import {useProductsStore} from '../stores/products'
import { ref} from 'vue'
export default {
    setup(){
        const store = useProductsStore()
        let pagination=async(offset)=>{
             store.loader=true
            setTimeout(()=>{
                store.loader=false
            },4000)
            window.scroll(0,0)
            await store.fetchProducts(offset)
        }
        return {
            pagination
        }
    }
}
</script>

<template>
    <div  class="flex p-3 items-center justify-center space-x-4  ">
        <button @click.prevent="pagination(0)" class="btn p-2 rounded-sm " >1</button>
        <button @click.prevent="pagination(20)" class="btn p-2 rounded-sm ">2</button>
        <button @click.prevent="pagination(40)" class="btn p-2 rounded-sm ">3</button>
        <button @click.prevent="pagination(60)" class="btn p-2 rounded-sm ">4</button>
        <button @click.prevent="pagination(80)" class="btn p-2 rounded-sm ">5</button>
    </div>
    
</template>



