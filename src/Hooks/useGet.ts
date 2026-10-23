import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../Components/Context/TokenContext";


const baseUrl = import.meta.env.VITE_BASE_URL;
export default function useGet(path: string) {
    const tokenContext = useContext(TokenContext);
    const token = tokenContext?.token;
    const getData = async () => {
        const { data } = await axios.get(`${baseUrl}${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data
    }

    return getData

}
