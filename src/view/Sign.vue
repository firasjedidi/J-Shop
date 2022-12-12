<script>
import { GDialog } from 'gitart-vue-dialog'
import {useUser} from '../stores/user'
import { ref } from 'vue'
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import ForgotPass from '../components/ForgotPass.vue';
import {useRouter} from 'vue-router'
export default {
    setup() {
        const user = useUser()
        const router = useRouter()
        var active = ref("login")
        const goback = () => {
            active.value = 'login'
        }
        const logout = async() => {
            await user.logout()
            window.localStorage.removeItem('user')
            user.$patch({openSignDialog:false})
            router.push('/')
        }
        return{
            user,
            active,
            goback,
            logout
        }
    },
    components: {
        GDialog,
        Login,
        Signup,
        ForgotPass
  },
}
</script>

<template>
    <GDialog 
        v-model="user.openSignDialog"
        max-width="672px" class=" mx-auto"
    >
    <template v-if="!user.isauth  ">
      <div v-if="active != 'forgot'" class="flex items-center flex-grow ">
        <h1 @click.prevent="active = 'login'" :class="active === 'login' ? ' bg-[#ffff] text-[#505260] leading-10  w-full h-12  text-center' : '  bg-[#d2d8d8] w-full  h-12  leading-10 text-center text-[#809191]'">
            Sign in 
          </h1>
          <h1 @click.prevent="active = 'signup '"  :class="active === 'signup ' ? '  bg-[#ffff] text-[#505260] leading-10  w-full h-12  text-center' : ' bg-[#d2d8d8] w-full  h-12  leading-10 text-center text-[#809191]' " >
            New account
          </h1>
      </div>
        <div v-show="active === 'login'">
            <Login :active="active" />
            <div @click.prevent="active = 'forgot'" class=" mx-auto text-center text-sm py-3 cursor-pointer hover:underline">
                <span >Forgot your password?</span>
            </div>
        </div>
        <div v-show="active === 'signup '">
            <Signup/>
        </div>
        <div v-show="active === 'forgot'">
            <ForgotPass :goback="goback" />
        </div>
    </template>
    <template v-if="user.isauth === true ">
        <div  class="flex my-6 px-8 flex-col items-center  flex-grow">
            <div>
                <picture>
                    <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669406784/logout_uolwn3.png" type="image/webp">
                    <source srcset="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669406784/logout_uolwn3.png" type="image/png">
                    <img src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669406784/logout_uolwn3.png" alt="goodbye">
                </picture>
               
            </div>
           <button @click.prevent="logout()"   class="mx-auto my-6 btn p-1 h-full w-full flex-grow rounded-md flex-shrink  ">
                Logout
           </button>
        </div>
    </template>
  </GDialog>
</template>