import { X } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";


const ChatHeader = () => {
    const { selectedUsers, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUsers.profilepic || "/avatar.png"} alt={selectedUsers.fullname} />
                        </div>
                    </div>

                    
                    <div>
                        <h3 className="font-medium">{selectedUsers.fullname}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUsers._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;