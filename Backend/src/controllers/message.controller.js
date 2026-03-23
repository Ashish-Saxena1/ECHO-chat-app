import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReciverSocketId, io } from "../lib/socket.js"

// funciton to show list of users for sidebar

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("error in getUserForSidebar", error.message)
        res.status(500).json({ message: "internal server error" })


    }
}

//function to get all message history and chat from db

export const getMessages = async (req, res) => {
    try {

        const { id: userToChatId } = req.params
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]//$or is a mongodb query that give a single list of data of either the first part or the second part can be used in a two way street 
        })
        res.status(200).json(messages)

    } catch (error) {
        console.log("error in getMessages", error.message)
        res.status(500).json({ message: "internal server error" })


    }
}


//function to send message

export const sendMessage = async (req, res) => {
    try {

        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);//this upload response will give a JSON response from which we will extract secure_url
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,

        });
        await newMessage.save();

        const receiverSocketId = getReciverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(200).json(newMessage)


    } catch (error) {
        console.log("error in sendMessage", error.message)
        res.status(500).json({ message: "internal server error" })


    }
}