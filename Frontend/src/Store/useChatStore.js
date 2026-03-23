import { create } from "zustand";
import { axiosInstance } from "../Lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages:[],
    users:[],
    selectedUsers:null,
    isUserLoading:false,
    isMessageLoading:false,


    getUser:async() => {
        set({isUserLoading:true});
        try{
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data})
        }catch(error){
            toast.error(error.response.data.message)

    
        }finally{
        set({isUserLoading:false})
        }},
    getMessages:async(userId)=>{
        set({isMessageLoading:true});
        try {
            const res=await axiosInstance.get(`/messages/${userId}`)
            set({messages:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoading:false})
        }
    },

    sendMessage:async(messageData)=>{
        const{selectedUsers,messages}=get();
        try{
            const res=await axiosInstance.post(`/messages/send/${selectedUsers._id}`,messageData)
            set({messages:[...messages,res.data]})
        }catch(error){
            toast.error(error.response.data.message)

        }
    },
    subscribeToMessages:()=>{
        const {selectedUsers}=get()
            if(!selectedUsers) return;
            const socket =useAuthStore.getState().socket;


            socket.on("newMessage",(newMessage)=>{
                if(newMessage.senderId !== selectedUsers._id) return;
                set({messages:[...get().messages,newMessage],})
            })
    },
    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser:(selectedUsers)=>set({selectedUsers})
}))