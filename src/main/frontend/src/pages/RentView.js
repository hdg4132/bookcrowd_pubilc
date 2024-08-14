import {useEffect, useState} from "react";
import axios from "axios";
import SubBanner from "../component/SubBanner";
import {Link, useNavigate, useParams} from "react-router-dom";
import './RentView.css';
import icon_off from '../assets/icon_heart_off.png';
import icon_on from '../assets/icon_heart_on.png';
import { getCurrentDateTime } from "../util/util";
import UserChatPage from "../component/realChat/UserChatPage";

const RentView =()=>{
    const baseUrl = "http://localhost:8080";
    const {id} = useParams();
    const [ data, setData ] = useState();
    const nav = useNavigate();
    const currentTime = getCurrentDateTime();
    const [existCheck, setExistCheck] = useState(false);

    useEffect(() => {
        putSpringData();
    },[])
    async function putSpringData() {

         axios
            .get(baseUrl + `/books/${id}`)
            .then((res)=>{
                console.log(res.data);
                setData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })

    }
    const deletePost =()=>{
        axios.delete(baseUrl + `/books/delete/${id}`)
            .then(
                alert('삭제되었습니다.')

            )
        window.location.href='/rent';

    }

    const user = JSON.parse(sessionStorage.getItem("userData"))
    const rentRequest = () => {
        if(user == null) {
            alert("로그인이 필요한 서비스입니다")
            nav("/login")
        }
        else{
        axios.post("http://localhost:8080/rents/register", {
            approval:"1",
            borrowedId:user.userId,
            bookname:data.bookName,
            borrowedName:user.name,
            isbn:data.isbn,
            applicationDate:currentTime  
        })
        .then((response) => {
            console.log(response.data)
            alert("신청이 완료되었습니다")
        })
    }
    }

    useEffect(() =>{
            const user = JSON.parse(sessionStorage.getItem("userData"))
            if(user != null && data != null)
            axios.get(`http://localhost:8080/wishlist/${user.userId}/${data.isbn}`)
            .then((response) =>{
                console.log(response.data)
                setExistCheck(response.data)
            })
    }, [data])


    const wishlist = () => {
        const user = JSON.parse(sessionStorage.getItem("userData"))
        if(user == null) {
            alert("로그인이 필요한 서비스입니다")
            nav("/login")
        }
        else{
            if(existCheck != true){
            axios.post("http://localhost:8080/wishlist/register", {
                isbn:data.isbn,
                userId:user.userId,
            })
            .then((response) => {
                console.log(response.data)
                alert("위시리스트 등록이 완료되었습니다")
                setExistCheck(true)
            })
        } else{
            axios.delete(`http://localhost:8080/wishlist/${user.userId}/${data.isbn}`)
            .then((response) =>{
                console.log(response.data)
                alert("위시리스트 해제가 완료되었습니다")
                setExistCheck(false)
            })
        }
    }
    }


    return(
        <div className="RentView">
            <UserChatPage />
            <SubBanner page_name={"checkout"} title_en={"Checkout Book"} title_kr={"책 대여하기"}/>
            <div className="container_fix">
                {data && (
                    <div className="book_info">
                        <div className="img_wrap">
                            <img src={`http://localhost:8080/files/${data.bookImgUrl}`}/>
                        </div>
                        <div className="info_wrap">
                            <h4 className="book_tt">{data.bookName}</h4>
                            <div className="book_info_con">
                                <ul>
                                    <li>
                                        <p className="info_tt">저자</p>
                                        <p className="info_con">{data.author}</p>
                                    </li>
                                    <li>
                                        <p className="info_tt">발행일</p>
                                        <p className="info_con">{data.publishDate}</p>
                                    </li>
                                    <li>
                                        <p className="info_tt">출판사</p>
                                        <p className="info_con">{data.publisher}</p>
                                    </li>
                                    {data.pages ?
                                    <li>
                                        <p className="info_tt">면 수</p>
                                        <p className="info_con">{data.pages}</p>
                                    </li>
                                        : ''}
                                    {data.genre ?
                                        <li>
                                            <p className="info_tt">장르</p>
                                            <p className="info_con">{data.genre}</p>
                                        </li>
                                        : ''}
                                    <li>
                                        <p className="info_tt">대출가능 권 수</p>
                                        <p className="info_con"><span>{data.stock}</span> 권</p>
                                    </li>
                                </ul>
                            </div>
                            {data.stock>0 ?
                                (<div className="book_btn">
                                     <button className="btn" onClick={wishlist}><img src={existCheck ? icon_on : icon_off}/> 위시리스트</button>
                                     <button className="btn btn_color" onClick={rentRequest}>대여하기</button>
                                 </div>)
                            :''}
                        </div>
                    </div>

                )}
                {data && (
                    <div className="book_detail">
                        <h5>책 소개</h5>
                        <p>{data.description}</p>
                    </div>

                )}
                {user.userType==2 &&(
                <div className="btn_sec">
                    <Link className="btn" to={`/adm/rent/edit/${id}`}>수정</Link>
                    <button className="btn" onClick={deletePost}>삭제</button>
                </div>)
                }
                <div className="paging_sec clearfix">
                    <Link className="prev" to={`/rent/12`}><span
                        className="arrow"></span>Prev
                    </Link>
                    <button className="list" onClick={() => nav('/rent')}><span></span>List</button>
                    <Link className="next" to={`/rent/13`}>Next<span
                        className="arrow"></span></Link>
                </div>
            </div>
        </div>
    )
}

export default RentView;