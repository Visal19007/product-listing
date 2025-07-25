import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCartStore=create(persist((set,get)=>({
    cart:[],
   
    justordered:false,
    search:'',
     
    addtoCart:(product,qty=1)=>{
        const existing=get().cart.find(item=>item.id===product.id)
        if(existing){
            set({
                cart:get().cart.map(item=>
                    item.id===product.id?{...item,qty:item.qty+qty}:item
                )
            })
        }else{
            set({
                cart:[...get().cart,{...product,qty:qty}]
            })
        }
    },
    removeCart:(id)=>{
        set({
            cart:get().cart.filter(item=>item.id!==id)
        })
    },
    increaseQty:(id)=>{
        set({
            cart:get().cart.map(item=>
                item.id===id?{...item,qty:item.qty+1}:item
            )
        })
    },
    decreaseQty:(id)=>{
        set({
            cart:get().cart.map(item=>
                item.id==id && item.qty>1 ? {...item,qty:item.qty-1} :item
            )
        })
    },

    clearCart:()=>{
        set({
            cart:[]
        })

    },
    setJustordered:(value)=>{
        set({
            justordered:value
        })
    },
    searchCart:(text)=>{
    set({
        search:text
    })
    },


    }),
    {
        name:'cart-list'
    },
)) 