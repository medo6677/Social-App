import axios from "axios";
import { baseUrl } from "./Auth.service";


export async function getAllPosts() {
    const response = await axios.get(`${baseUrl}/posts`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    return response.data;
}

export async function getAllComments(postId: string) {
    const response = await axios.get(`${baseUrl}/posts/${postId}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    return response.data;
}