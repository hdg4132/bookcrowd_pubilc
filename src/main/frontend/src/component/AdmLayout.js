import './AdmLayout.css'
import {useNavigate} from "react-router-dom";

const AdmLayout=()=>{
    const nav = useNavigate();
    return(
        <div className="AdmLayout">
            <div className="adm_side">
                <h2 className="adm_title">북적북적<span>ADMIN</span></h2>
                <ul className="adm_nav">
                    <li><a>회원관리</a></li>
                    <li><a href="chatpage">1:1 채팅관리</a></li>
                    <li><a onClick={()=>nav('/adm/list')}>책 보관 관리</a></li>
                    <li><a onClick={()=>nav('/adm/rent/')}>책 대여 관리</a></li>
                    <li></li>
                </ul>
            </div>
            <div className="adm_header adm_con">
                <a href="/" className="btn btn_home">홈페이지로 가기</a>
            </div>
        </div>
    )

}

export default AdmLayout;