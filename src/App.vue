<script >
import {  RouterView } from 'vue-router';
import {  useRoute } from 'vue-router';
import {useProductsStore} from './stores/products'

export default{
  setup(){
    const route = useRoute()
    const store = useProductsStore()
    return{
      route,
      store
    }
  }
}
</script>
<template>
  <RouterView :key="route.path">  
    
  </RouterView>
</template>

