import axios, { type AxiosProgressEvent } from "axios";
import { useContext } from "react";
import { TokenContext } from "../Components/Context/TokenContext";
import { useUploadProgress } from "../Context/ProgressContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function usePut(path: string) {
    const tokenContext = useContext(TokenContext);
    const progressContext = useUploadProgress();
    const token = tokenContext?.token;

    const putData = async (body?: object) => {
        try {
            progressContext?.startProgress();

            const { data } = await axios.put(
                `${baseUrl}${path}`,
                body ?? {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                        progressContext?.updateProgress(progressEvent.loaded, progressEvent.total);
                    },
                }
            );

            progressContext?.finishProgress();
            return data;
        } catch (error) {
            progressContext?.finishProgress();
            throw error;
        }
    };

    return putData;
}