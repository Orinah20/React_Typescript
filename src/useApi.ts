import axios, {AxiosRequestConfig} from "axios";
import {useEffect, useState} from "react";

type Dependency = number | string;
type ErrorDeclaration = null | Error;
type ApiStatus = "idle" | "success" | "loading" ;


function useApi<T>(
    config: AxiosRequestConfig,
    dependency?: Dependency)
{

    let [response, setResponse] = useState<T>();
    let [error, setError] = useState<ErrorDeclaration>(null);
    let [status, setStatus] = useState<ApiStatus>("idle");

    const getData : () => Promise<void> = async () => {
        try {
            setStatus("loading")
            await
                axios(config)
                    .then((res) => {
                        if(res.status >= 200){
                            setStatus("success")
                            console.log(res)
                            setResponse(res.data)
                        }
                    })
        }catch (err : unknown ){
            setError(error)
            if (axios.isAxiosError(error)){
                console.log(error)
                if (err instanceof Error) {
                    console.log(err)
                    console.log(error)
                    console.log(err.message);
                }
            }
        }
    }

    useEffect(() => {
            getData();
        },
        [dependency])

    return {response, error, status}
}

export default useApi
