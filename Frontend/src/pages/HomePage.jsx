import React from 'react'
import { useChatStore } from '../Store/useChatStore'
import Sidebar from "../components/Sidebar"
import ChatContainer from "../components/ChatContainer"
import NoChatSelected from "../components/NoChatSelected"
const Homepage = () => {
    const{selectedUsers}=useChatStore()
    return (
        <div className='h-screen bg-base-200'>
            <div className='flex item-center justify-center pt-17 px-1 sm:pt-20 sm:px-4'>
                <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-7xl h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-7rem)]'>
                    <div className='flex h-full rounded-lg overflow-hidden'>
                        <Sidebar/>
                        {!selectedUsers?<NoChatSelected/>:<ChatContainer/>}
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Homepage
