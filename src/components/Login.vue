<script>
import { ref } from 'vue'
import {useUser} from '../stores/user'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const user = useUser()
    const router = useRouter()
    const loginemail = ref('')
    const loginpassword = ref('')
    var err = ref(null)
    const handelClick = async () => {
      try {
        await user.login({
          email:loginemail.value,
          password:loginpassword.value
        })
        user.$patch({openSignDialog:false})
        router.push('/')
      } catch (error) {
        err.value = error
      }
    }
    return{
      loginemail,
      loginpassword,
      handelClick
    } 
  },
  props:{
    active:String,
  }
}
</script>
<template>
    <form   class="  my-4 ">
         <div class="flex relative  my-6 px-8   text-black items-center h-10 rounded-md flex-grow">
           <font-awesome-icon class="absolute  mx-2  " icon="fa-solid fa-envelope" />
           <input 
             type="email" placeholder="E-mail" v-model="loginemail"
             class="  border-[1px] border-[#d2d8d8] p-1 h-full w-full flex-grow rounded-md flex-shrink  focus:outline-none px-8 "
             required
           >
         </div>
         <div  class="flex relative  my-6 px-8  text-black items-center h-10 rounded-md flex-grow">
           <font-awesome-icon class=" absolute mx-2  " icon="fa-solid fa-lock" />
           <input 
             type="password" v-model="loginpassword" placeholder="Password"
             class="border-[1px] border-[#d2d8d8] p-1 h-full w-full flex-grow rounded-md flex-shrink  focus:outline-none px-8"
             name="password" required  autocomplete="on"
           >
         </div>
     
         <div  class="flex my-6 px-8 text-black items-center h-10 rounded-md flex-grow">
           <button @click.prevent="handelClick()"   class="mx-auto btn p-1 h-full w-full flex-grow rounded-md flex-shrink  ">
            Login
           </button>
         </div>
     
    </form>
    <div  class=" mx-auto text-center text-red-600 text-sm py-3" v-if="err">
        {{err}}
    </div>

</template>
