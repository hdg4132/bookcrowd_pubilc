import RentItem from "./RentItem";
import AdmLayout from "../component/AdmLayout";
import {useEffect, useState} from "react";
import axios from "axios";

const RentListAdm=()=>{
    const baseUrl = "http://localhost:8080";

    const [ data, setData ] = useState();

    useEffect(() => {
        putSpringData();
    },[])
    async function putSpringData() {
        await axios
            .get(baseUrl + "/books")
            .then((res)=>{
                console.log(res.data);
                setData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    return(
        <div className="RentList">
            <AdmLayout/>
            <div className="adm_con">
                <ul className="checkout_list">

                    {data ? data.map((datas) => (

                        <RentItem key={datas.id}{...datas} />

                    )) : ''}
                </ul>
            </div>
        </div>
    )
}

export default RentListAdm;