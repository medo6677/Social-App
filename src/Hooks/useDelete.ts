import axios from "axios";
import { useContext } from "react";
import { TokenContext } from "../Components/Context/TokenContext";
import { useUploadProgress } from "../Context/ProgressContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function useDelete(path: string) {
    const progressContext = useUploadProgress();
    const tokenContext = useContext(TokenContext);
    const token = tokenContext?.token || localStorage.getItem("token");

    const deleteData = async () => {
        try {
            progressContext?.startProgress();

            const { data } = await axios.delete(`${baseUrl}${path}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    token: `${token}`,
                },
            });

            progressContext?.finishProgress();
            return data;
        } catch (error) {
            progressContext?.finishProgress();
            throw error;
        }
    };

    return deleteData;
}
