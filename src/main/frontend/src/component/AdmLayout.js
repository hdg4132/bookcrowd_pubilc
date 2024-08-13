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
                    <li><a href="/adm/chatpage">1:1 채팅관리</a></li>
                    <li><a onClick={()=>nav('/adm/list')}>책 보관 관리</a></li>
                    <li><a onClick={()=>nav('/adm/rent/')}>책 정보 관리</a></li>
                    <li><a onClick={()=>nav('/adm/rent_admin')}>책 대여 관리</a>
                        <ul className ="adm_sub_nav">
                            <li><a onClick={()=>nav('/adm/rent_admin_canceled')}>책 대여 반려</a></li>
                            <li><a onClick={()=>nav('/adm/rent_admin_return')}>책 대여 반납</a></li>
                        </ul>
                    </li>

                </ul>
            </div>
            <div className="adm_header adm_con">
                <a href="/" className="btn btn_home">홈페이지로 가기</a>
            </div>
        </div>
    )

}

export default AdmLayout;