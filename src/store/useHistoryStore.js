import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useHistoryStore = create(persist((set,get) => ({
    orderHistory:[],
    
      SetorderHistory:(product)=>{
         
        set({
            orderHistory:[...get().orderHistory,{...product,datetime:new Date().toLocaleString(),total:product.price*product.qty}]
        })
    },
  
}),
{
    name:'history-list'
},

))


