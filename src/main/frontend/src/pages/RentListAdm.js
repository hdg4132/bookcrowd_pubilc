import RentItem from "./RentItem";
import AdmLayout from "../component/AdmLayout";
import ListSearch from "../component/ListSearch"
import {useEffect, useState} from "react";
import axios from "axios";

const RentListAdm=()=>{

    const baseUrl = "http://localhost:8080";

    const [ data, setData ] = useState();
    const [ filteredData, setFilteredData ] = useState();

    useEffect(() => {
        putSpringData();
    },[])
    async function putSpringData() {
        await axios
            .get(baseUrl + "/books")
            .then((res)=>{
                console.log(res.data);
                setData(res.data);
                setFilteredData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    const handleSearch = async(keyword)=>{

        if(keyword===''){
            setFilteredData(data);
            return
        }
        try {
            await axios
                .get(baseUrl + '/books/getSearchList',
                    {
                        params:
                            {keyword: keyword}
                    }
                )
                .then((res)=>{
                    setFilteredData(res.data)
                })
        } catch(err){
            console.error(err)
        }
    }
    return(
        <div className="RentList">
            <AdmLayout/>
            <div className="adm_con">
                <h2 className="adm_tt">대여 책 목록</h2>
                <ListSearch onSearch={handleSearch}/>
                <ul className="checkout_list">

                    {filteredData ? (
                        filteredData.reverse().map((item) => (
                            <RentItem key={item.id} {...item} />
                        ))
                    ) : (
                        '데이터가 없습니다'
                    )}
                </ul>
            </div>
        </div>
    )
}

export default RentListAdm;