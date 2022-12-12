<script>
import {useProductsStore} from '../stores/products'
import { useRouter } from 'vue-router';
export default {
    setup(){
        const store = useProductsStore()
        var router=useRouter()
        const scrollUp=()=>window.scroll(0)
        const links=[
            {
                url:"https://www.linkedin.com/in/firas-jedidi-827328232/",
                name:"linkedin",
                icon:"fa-brands fa-linkedin" 
            },
            {
                url:"https://github.com/firasjedidi",
                name:"github",
                icon:"fa-brands fa-github" 
            },
            {
                url:"https://www.instagram.com/fj16th/",
                name:"instagram",
                icon:"fa-brands fa-instagram" 
            },
            {
                url:"https://www.facebook.com/FJ16TH",
                name:"facebook",
                icon:"fa-brands fa-facebook" 
            },
            {
                url:"mailto:firasjedidi0713@gmail.com",
                name:"Gmail",
                icon:"fa-brands fa-google" 
            },
        ]
        return{
            store,
            scrollUp,
            links,
            router
        }
    },
    async created(){
       await this.store.fetchCategories()
    }
   
}
</script>

<template>
    <footer class="block  bottom-0   w-full  ">
        <div class="bg-amazone-light flex flex-col  text-white text-xs md:text-lg">
            <button @click.prevent="scrollUp" class=" bg-[#485769] p-2 flex   items-center justify-center" >Back to top</button>
            <div class="flex  justify-evenly ">
                <div class="p-2  ">
                    <p class="md:text-center py-3 text-lg font-medium">Categories</p>
                    <div class="flex justify-center space-x-2  md:space-x-6 " >
                        <div>
                        <p 
                            v-for="cat in store.categories.slice(0,store.categories.length/2)" 
                            :key="cat" @click.prevent=" router.push({name:'Categories',params:{name:cat.name}})" 
                            class="link2 text-gray-300 p-1"
                        >
                            {{cat}}
                        </p></div>
                        <div>
                        <p 
                            v-for="cat in store.categories.slice(store.categories.length/2,store.categories.length)" 
                            :key="cat" @click.prevent=" router.push({name:'Categories',params:{name:cat.name}})" 
                            class="link2 text-gray-300 p-1"
                        >
                            {{cat}}
                        </p>
                    </div>
                    </div>
                </div>
                <div class="p-2 ">
                        <p class=" py-3 text-lg font-medium">Developer</p>
                        <p class="text-gray-300 text-sm">
                            This app devepled for Bullding skill only,  
                        </p>
                        <p class="text-gray-300 text-sm">if you want see more of this developer </p>
                        <p class="text-gray-300 text-sm">you should check his links </p>
                        <p  class="link2 py-2 ">
                            <a href="http://https://fakeapi.platzi.com/" target="_blank" rel="noopener noreferrer">
                                Api for this  web
                            </a>
                        </p>
                </div>
                <div class="p-2 ">
                        <p class="text-white py-3 text-lg font-medium">links</p>
                        <div class="flex space-x-1 items-center" v-for="link in links" :key="link">
                            <font-awesome-icon :icon="link.icon" />
                            <p class="link2 text-gray-300 py-1">
                                <a :href="link.url" target="_blank" rel="noopener noreferrer">
                                    {{link.name}}
                                </a>
                            </p>
                        </div>
                </div>
            </div>
        
        </div>
    </footer>
</template>



