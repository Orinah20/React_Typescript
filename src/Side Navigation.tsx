import useApi from "./useApi";
import React, {useState} from "react";
import {NavLink, Outlet, useParams} from "react-router-dom";
import './App.css'

interface DatamapKeys {
    datamap_dictionary? : string;
    application_code? : string;
    application_familiar_name : string;
}

function Navigation(){

    let { application_code } = useParams();

    const {response, error, status} = useApi<[]>({
        method : "GET",
        url: `http://85.159.214.103:8105/api/rest/master/applications/?page=-1`,
        headers: {
            'AuthToken': 'LTFMOjpkMWY1ZGIyN2IxYmNjNmZkOWZiM2JmMDBkNjc2YmQ3M2IwMzFkOThhZjRiZGE3NWIzYjgzZjIyN2U4N2U5OTVi',
            'RequestReference': 'bnnnnkkkmkk'
        }
    })

    let active : React.CSSProperties = {
        backgroundColor : "lightblue",
    }

    let inactive : React.CSSProperties = {
        backgroundColor: ""
    }

    const arrData = response ? response.map((data : DatamapKeys) => {
        return(
            <NavLink
                className={"px-3 py-1  active:bg-gray-300 hover:bg-gray-300"}
                style ={({ isActive }) =>
                    isActive ? active : inactive
                }
                to={`/${data.application_code}`}
                key={data.application_code}
            >
                {data.application_familiar_name}
            </NavLink>
        )
    }) : []

    return (
        <div className={"main-content"}>
            {status === "loading" &&
                <div className={"fixed top-1/2 left-1/2 w-10/12 h-screen text-center align-center py-1 pt-1.5 "}>
                    <svg role="status"
                         className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"></path>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"></path>
                    </svg>
                </div>
            }

            {status === "success" &&
                <div className={"flex flex-col border-r-2 border-r-gray-400 w-1/6 h-full overflow-y-auto"}>
                   <div className={"py-1 px-3 text-white border-r-gray-400 cursor-default bg-gray-800"}>Applications List</div>
                    {arrData}
                </div>
            }

            {status === "error" &&
                <div className="flex h-full w-full justify-center text-center items-center">
                    <div className={"text-2xl"}>{error}</div>
                </div>
            }

            {application_code === undefined && status === "success" &&
                <div className="flex flex-row justify-center items-center w-9/12">
                    <div className={"text-2xl"}>No Application Selected</div>
                </div>
            }

            {status === "success" &&
                <div><Outlet/></div>
            }

        </div>
    )
}

export default Navigation;
