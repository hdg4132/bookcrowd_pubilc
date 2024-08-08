import SubBanner from '../component/SubBanner';
import './RentList.css'
import RentItem from './RentItem'
import {useEffect, useState} from "react";
import axios from "axios";


const RentList =()=>{

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
        <div className='CheckoutList'>
            <SubBanner page_name={"checkout"} title_en={"Checkout Book"} title_kr={"책 대여하기"} search onSearch={handleSearch}/>

            <div className='container_fix'>
                <ul className="checkout_list">

                    {filteredData ? (
                        filteredData.map((item) => (
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

export default RentList;