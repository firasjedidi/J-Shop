import { defineStore } from 'pinia'
// firebase auth
import  {auth} from '../firebase/config'
import 
    { 
        createUserWithEmailAndPassword ,
        signInWithEmailAndPassword,
        signOut,
        sendPasswordResetEmail
    } 
from 'firebase/auth';
export const useUser = defineStore('user',{
    state:()=>({
        user:null,
        openSignDialog:false,
        isauth:false,
        openDialog:JSON.parse(localStorage.getItem('dialog')),
    }),
    actions:{
        async login({email,password}){
            const res = await signInWithEmailAndPassword(auth,email,password)
            if (res) {
                this.user=res.user
                this.isauth = true
            } else {
                throw new Error('could not complete login')
            }
        },
        async singup({email,password}){
            const res = await createUserWithEmailAndPassword(auth,email,password)
            if (res) {
                this.user=res.user
                this.isauth = true
            } else {
                throw new Error('could not complete signup')
            }
        }, 
        async forgetPassword({email}){
            await sendPasswordResetEmail(auth,email)           
        }, 
        async logout(){
            await signOut(auth)
            this.user = null
            this.isauth = false
        }, 

       
    }
})

