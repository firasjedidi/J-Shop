import { defineStore } from 'pinia'

export const useCartStore=defineStore('cart',{
    state:()=>({
        items: [],
        check:null,
        seen: [],
        productTotal:0,
    }),
    getters:{
        total(){
         return this.items.reduce((total,item)=>total + item.price * item.quantity,0)
        },
    },
    actions:{
     
        removeFromCart(id){
            const index = this.items.findIndex(
                (cartItem)=> cartItem.id === id
            )
            let newCart = [...this.items]
            if (index >= 0) {
                newCart.splice(index,1)
            } else {
                console.warn(`can't remove product as it's not found`)
            }
          
            this.items = newCart

        },
        incrementQuantity(id){
            const index = this.items.findIndex(
                (cartItem)=> cartItem.id === id
            )
            this.items[index].quantity = this.items[index].quantity+1
           
        },
        decrementQuantity(id){
            const index = this.items.findIndex(
                (cartItem)=> cartItem.id === id
            )
            let newCart=[...this.items]
            if(this.items[index].quantity<=1){
                newCart.splice(index,1)
                this.items = newCart
                this.productTotal = 0 
                this.check = null
            }else{
                this.items[index].quantity = this.items[index].quantity-1
            }
           
        },
        checkProduct(id){
            const index = this.items.findIndex(
                (cartItem) => cartItem.id === JSON.parse(id)
            )
            if(index>=0){
                this.check = this.items[index]
            }else{
                this.check = null
            }
        }, 
        addToCart(item){
            const index = this.items.findIndex(
                (cartItem)=> cartItem.id === item.id
            )
            if(index >= 0){
                this.items[index].quantity = this.items[index].quantity+=1
                
            }else {
                this.items = [... this.items,item] 
            }
           
        },
        checkProductTotal(id){
            const index = this.items.findIndex(
                (cartItem) => cartItem.id === JSON.parse(id)
            )
            if(index>=0){
                this.productTotal =  this.items[index].price * this.items[index].quantity 
            }else{
                this.productTotal = 0 
            }
        }, 
        seenProducts(item) {
            this.seen = [... this.seen,item] 
            
        }
    }
})