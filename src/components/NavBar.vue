<script >
import {ref} from 'vue'
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/Cart';
import {useProductsStore} from '../stores/products'
import {useUser} from '../stores/user'
export default {
  setup(){
    const router=useRouter()
    const useCart=useCartStore()
    const store = useProductsStore()
    const user = useUser()
    var searchQuery=ref('')
    const onChange=(e)=>{
      searchQuery = e.target.value
      
    };
    const search=async()=>{
      await store.search(searchQuery)
      router.push({path:'/Catalog',query:{q:searchQuery}})
    };
    const openSignDialog = () =>{
      user.$patch({openSignDialog:true})
    }
    const navigation = (path,param) =>{
      store.loader=true
      setTimeout(()=>{
        store.loader=false
      },4000)
      
      switch (path) {
        case '/':
          router.push('/')
        break;
        case  'categories':
           router.push({name:'Categories',params:param})
          break;
        case 'cart':
          router.push('/Cart')
          break;
        default:
          router.push('/')
          break;
      }
    }
    return{
      useCart,
      store,
      search,
      onChange,
      searchQuery,
      openSignDialog,
      user,
      router,
      navigation
    }
  },
  async created(){
    await this.store.fetchCategories()
  },
  
}


</script>

<template>
  <header class="fixed  top-0 z-50 overflow-hidden w-full">
    <div class="flex p-2  text-white items-center  bg-amazone  flex-grow py-2">
      <!-- logo or name -->
     
      <div @click.prevent="navigation('/')" class=" flex items-center  link ">
        <picture>
          <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669236914/Elegant_Orange_Smile_Shop_Logo-removebg-preview_poqevz.png" type="image/webp"   >
          <source  srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669236914/Elegant_Orange_Smile_Shop_Logo-removebg-preview_poqevz.png" type="image/png"  >
          <img  class="h-10 w-10 " src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669236914/Elegant_Orange_Smile_Shop_Logo-removebg-preview_poqevz.png" alt="J-Shop">
        </picture>
      </div>
      <!-- search -->
      
      <div class="link flex text-black mx-4 items-center h-10 rounded-md flex-grow  ">
        <input @keyup.enter="search()" @input="onChange($event)" v-model="searchQuery" placeholder="search..." class="p-1 h-full w-7 flex-grow rounded-l-md flex-shrink  focus:outline-none px-2 "  type="text" >
        <font-awesome-icon @click.prevent="search()"  class="p-2 md:p-4" icon="fa-solid fa-magnifying-glass" />
      </div>

      <!-- user&&cart -->
      <div class="link  ml-2 flex  items-center text-xs space-x-6  whitespace-nowrap" >
        <div @click.prevent="openSignDialog()" class="flex items-center  p-1 rounded hover:text-yellow-500">
          <font-awesome-icon icon="fa-solid fa-user" />
          <p class="pl-1   md:text-sm">
            {{user.isauth===true ? user.user.email.slice(0,user.user.email.indexOf("@")) : 'Sign in'}}
          </p>
        </div>
        <div @click.prevent="navigation('cart')"  class="link relative flex items-center pr-2"> 
          <span class="absolute -top-2 -right-0 md:right-7 md:-top-1 h-4 w-4 bg-yellow-400 text-center font-bold text-black rounded-full  ">
           {{useCart.items.length}}
          </span>
          <font-awesome-icon class="h-5" icon="fa-solid fa-cart-shopping" />
          <p class="hidden md:inline font-extrabold fontg md:text-sm  mt-2 ">Cart</p>
        </div>
      </div>
    </div>
    <!-- categories -->
    <div class="flex items-center  space-x-4 p-2  bg-amazone-light text-white text-sm overflow-x-scroll scrollbar-hide  ">
      <div  v-for="cat in store.categories" :key="cat">
        <p @click.prevent="navigation('categories',{name:cat})" class="link2 flex  items-center line-clamp-1 ">{{cat}}</p>
      </div>
    </div>
  </header>
</template>

