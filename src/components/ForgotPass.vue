<script>
import {useUser} from '../stores/user'
import {useRouter} from 'vue-router'
import { ref } from 'vue'

export default {
    setup() {
        const user = useUser()
        const router =useRouter()
        const forgot = ref('')
        var msg = ref('')
        const err = ref(null)
        const handelClick = async () => {
            try {
               await  user.forgetPassword({
                    email:forgot.value
                })
                msg.value = "check your email (check span)"
                
            } catch (error) {
                err.value=error
            }
        }
        return{
            forgot,
            
            handelClick,
            msg
        }
    },
    props:{
        goback:Function
    }
}
</script>
<template>
    <div >
        <div @click.prevent="goback(); msg=''"  class="my-1   mx-3 hover:cursor-pointer hover:bg-gray-100 w-5 ">
            <font-awesome-icon class="   " icon="fa-solid fa-arrow-left" />
        </div>
        <div v-if="!msg" class="flex relative my-4 px-8   text-black items-center h-10 rounded-md flex-grow">
            <font-awesome-icon class="absolute  mx-2  " icon="fa-solid fa-envelope" />
            <input 
            type="email" placeholder="E-mail" v-model="forgot"
            class="  border-[1px] border-[#d2d8d8] p-1 h-full w-full flex-grow rounded-md flex-shrink  focus:outline-none px-8 "
            required
            >
        </div>
        <div v-if="msg" class="mx-auto text-center text-sm py-3">{{msg}}</div>
        <div v-if="!msg"  class="flex my-6 px-8 text-black items-center h-10 rounded-md flex-grow">
            <button @click.prevent="handelClick()"   class="mx-auto btn p-1 h-full w-full flex-grow rounded-md flex-shrink  ">
                done
            </button>
        </div>
        <div  class=" mx-auto text-center text-red-600 text-sm py-3" v-if="err">
            {{err}}
        </div>
    </div>
</template>