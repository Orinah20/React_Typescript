import React, {useEffect, useState} from 'react';
import './App.css';
import axios, {AxiosError} from "axios";
import useApi from "./useApi";

function App() {
    const {response, error, status} = useApi<[]>({
        method : "GET",
        url: "http://85.159.214.103:8105/api/rest/master/applications/?page=-1",
        headers: {
            'AuthToken': 'LTFMOjo1Y2Q3OWVhZDQ0ODc0MWRjMThiOTRiYTg2MjE2M2ViMjZmN2Q5NTQyNTc4ZjllYzQwY2JiYTc1ZTMxNDc1MjQ4',
            'RequestReference': 'bnnnnkkkmkk'
        }
    })

    const arrData = response ? response.map((data :any) => {
        return(
            <div className={"py-1"} key={data.application_code}>{data.application_familiar_name}</div>
        )
    }) : []

  return (
      <div>
        <div className="App App-header">
          <div>
             <a href={"/"}  className={"cursor-pointer"}>DMD Editor</a>

          </div>
        </div>
      <div className={"cursor-pointer px-3 py-1"}>
          {arrData}
      </div>
      </div>
  );
}

export default App;
