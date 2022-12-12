import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'
import 'gitart-vue-dialog/dist/style.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import 
    { 
        faUserSecret,faMagnifyingGlass,
        faCartShopping,faUser,
        faStar,faPlus,
        faMinus,faTrash,
        faCartPlus,
        faLock,faEnvelope,
        faArrowLeft

    } 
from '@fortawesome/free-solid-svg-icons'
import {faFacebook,faGithub,faLinkedin,faInstagram,faGoogle } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(
    faUserSecret,
    faMagnifyingGlass,
    faCartShopping,
    faUser,
    faStar,
    faPlus,
    faMinus,
    faTrash,
    faFacebook,
    faGithub,
    faLinkedin,
    faInstagram,
    faGoogle,
    faCartPlus,
    faEnvelope,
    faLock,
    faArrowLeft
)

const pinia = createPinia()
pinia.use((context)=>{
    const storeId = context.store.$id
    //storing what we listen to
    const stored = JSON.parse(window.localStorage.getItem(storeId))
    if (stored) {
        context.store.$patch(stored)
    }
    // listening to changes 
    context.store.$subscribe((mutation,state)=>{
        if (storeId === "cart" || storeId === "user" ) {
          window.localStorage.setItem(storeId,JSON.stringify(state))  
        }
        
    })

})
createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(pinia)
.mount('#app')
