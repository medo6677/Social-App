import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../Components/Context/TokenContext";


const baseUrl = import.meta.env.VITE_BASE_URL;
export default function useGetAllPosts(path: string) {
    const tokenContext = useContext(TokenContext);
    const token = tokenContext?.token;
    const getData = async (page?: number) => {

        const { data } = await axios.get(`${baseUrl}${path}`, {

            params: {
                limit: 20,
                page: page || 1
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data
    }

    return getData

}
