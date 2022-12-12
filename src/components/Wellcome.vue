<script>
import { GDialog } from 'gitart-vue-dialog'
import { useUser } from '../stores/user'

export default {
    setup() {
        const user = useUser()
        return{
            user
        }
    },
    components:{
        GDialog
    }
}
</script>
<template>
    <GDialog  v-model="user.openDialog"  max-width="672px" >
        <div class="flex py-2 px-8 flex-col items-center  flex-grow">
            <div>
                <picture>
                    <source  src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669643736/welcome_ppsgdb.png" type="image/webp"   >
                    <source  src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669643736/welcome_ppsgdb.png" type="image/png"  >
                    <img  class="w-40 h-auto" src="https://res.cloudinary.com/dod9yhmlt/image/upload/v1669643736/welcome_ppsgdb.png" alt="welcome">
                </picture>
            </div>
            <div class="py-2 ">
                <p>
                    Hello there, before you you close this tab this website is only for building skill 
                    and also you might find the images don't match the details, the reason why it's dummy data from 
                    <a href="http://https://fakeapi.platzi.com/" class="link2 text-blue-400 " target="_blank" rel="noopener noreferrer">
                        Api 
                    </a>.
                </p>
            </div>
        </div>
    </GDialog>
</template>