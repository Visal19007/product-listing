import { create } from "zustand";

export const useFilterStore=create((set)=>({
    category:'all',
    setCategory:(value)=>{
        set({
            category:value
        })
    },
}))