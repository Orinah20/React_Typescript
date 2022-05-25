import useApi from "./useApi";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/ext-language_tools"
import "./App.css"
import {Ace} from "ace-builds";

interface DatamapKeys {
    datamap_dictionary? : string;
    application_code? : string;
    application_familiar_name? : string;
    creation_datamap_xml? : string;
    deletion_datamap_xml? : string;
    modification_datamap_xml? : string;
    dictionary_name? : string;
}

type Result = string | undefined;

type ValueOptions = "datamap_dictionary" | "creation_datamap_xml" | "deletion_datamap_xml" | "modification_datamap_xml" ;

function Main(this: any){

    let { application_code } = useParams();

    let [selectedValue, setSelectedValue] = useState<ValueOptions>("datamap_dictionary");
    let [disabled, setDisabled] = useState("true")

    const handleClick = () => {
        console.log(selectedValue)
    }

    const {status, response, error} = useApi<DatamapKeys>({
        method: "GET",
        url: `http://85.159.214.103:8105/api/rest/master/applications/model-information/${application_code}`,
        headers: {
            'AuthToken': 'LTFMOjpiYzZjNGZhYjJlNTA4MjcyNTY0ZjU1ZDgzMjM0Y2Q5MDBlOWVkOWE4YjlkZGQ1NDA1YjI2NDg0OTdmYjMyOGEz',
            'RequestReference': 'bnnnnkkkmkk'
        },
    }, application_code)

    const result : Result = response ? (response[selectedValue]) : "";

    const label : Result = response ? response.dictionary_name : "";

    function selectText(){
        if (response) {
            navigator.clipboard.writeText(response[selectedValue] as ValueOptions);
        }
        alert("Copied")
    }

    return (
        <div>
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
                <div className={"flex flex-col overflow-y-auto"}>
                    <div className={"flex max-w-full"}>
                        <div className={"bg-gray-800 text-white cursor-default w-1/2 px-5 py-1"}>
                            {label}
                        </div>

                        <div className={"bg-gray-800 flex justify-end w-1/2 items-end px-5 py-1"}>
                            <select name={"choices"} className={"cursor-pointer rounded text-white bg-gray-800"} value={selectedValue} onChange={e => setSelectedValue(e.target.value as ValueOptions)}>
                            <option value={"datamap_dictionary"}>View</option>
                                <option value={"creation_datamap_xml"}>Add</option>
                                <option value={"deletion_datamap_xml"}>Delete</option>
                                <option value={"modification_datamap_xml"}>Edit</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <AceEditor
                            mode="xml"
                            theme="clouds_midnight"
                            onChange={
                                value => {
                                    setSelectedValue(value as ValueOptions)
                                    setDisabled("false")
                                }
                            }
                            height={"505px"}
                            width={"1143px"}
                            fontSize={"14px"}
                            value={result}
                            wrapEnabled={true}
                            name="UNIQUE_ID_OF_DIV"
                            setOptions={{useWorker: false}}
                            editorProps={{$blockScrolling: true}}
                        />
                    </div>

                    <div className={"flex flex-row w-full py-2 px-4"}>
                       <div className={"flex flex-col w-1/2 justify-start items-start"}>
                           <button
                               onClick={() => selectText()}
                               className={"bg-gray-300 rounded px-5"}>
                               Copy
                           </button>
                       </div>

                        {disabled === "false" &&
                            <div className={"flex flex-col w-1/2 justify-end items-end rounded"}>
                                <button
                                    className={"bg-gray-800 rounded text-white px-5 "}
                                    onClick={() => {
                                        handleClick();
                                    }}>
                                    Save
                                </button>
                            </div>
                        }

                    </div>
                </div>
            }

            {status === "error" &&
                <div className={"fixed top-1/2 left-1/3 h-screen"}>
                    <div className={"text-2xl"}>{error}</div>
                </div>
            }
        </div>
    )
}

export default Main
