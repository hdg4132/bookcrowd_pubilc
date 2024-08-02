import SubBanner from '../component/SubBanner';
import './RentList.css'
import RentItem from './RentItem'
import {useEffect, useState} from "react";
import axios from "axios";


const RentList =()=>{

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
        <div className='CheckoutList'>
            <SubBanner page_name={"checkout"} title_en={"Checkout Book"} title_kr={"책 대여하기"} search/>

            <div className='container_fix'>
                <ul className="checkout_list">

                    {data ? data.map((datas)=> (

                        <RentItem key={datas.id}{...datas} />

                    )) : ''}
                </ul>
            </div>
        </div>
    )
}

export default RentList;