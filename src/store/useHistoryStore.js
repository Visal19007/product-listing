import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useHistoryStore = create(persist((set,get) => ({
    orderHistory:[],
    
      SetorderHistory:(product,date)=>{
        set({
            orderHistory:[...get().orderHistory,{...product,datetime:date}]
        })
    },
  
}),
{
    name:'history-list'
},

))


