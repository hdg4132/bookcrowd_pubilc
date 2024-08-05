import {useContext, useEffect, useState} from 'react'
import { Link, Outlet, useNavigate,useParams } from 'react-router-dom'
import "./Rent.css"
import "./Rent_item.js"
import axios from 'axios'
import Rent_item from './Rent_item.js'

const Rent_admin=()=>{

    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    const nav = useNavigate();
    const { page } = useParams();
    const postPerPage = 8;

    
    useEffect(() => {
        
        axios.get("api/api/rent/1")
        // rent뒤의 1은 승인상태 1은 미승인, 2는 승인, 3은 반려처리 현재 페이지는 미승인 페이지 재고 = 전체재고 - 승인재고 고객에게 
          .then(data => {setPosts(data.data);
          setCount(data.length);})
          .catch(error => console.error('Error fetching posts:', error));
          
          setCount(posts.length);
      }, []);

      console.log(posts)
       //검색 초기데이터 빈칸
       const [search,setSearch] = useState('');
       const onChangeSearch =(e)=>{
           setSearch(e.target.value)
       }

       //검색 필터링 함수
       const getSearchResult=()=>{
           //원하는 데이터만 남기려면>원치않는 데이터 빼기
           //검색창이 빈칸이면 데이터 전체표시, 아니라면 검색창안의 데이터를 전부 소문자로바꿔서 포함하고 있는 데이터만 남기기
           return search==='' ? posts : posts.filter((it)=>it.content.toLowerCase().includes(search.toLowerCase())) //  app.js에서 프롭스로 가져와서 쓸수있긴한데 각각의 항목안에 컨텐츠<에서 같은 걸 찾는거라 정확하게 지목을 list에서 하는게 좀더편해서 리스트에서 작성하는거고
       }
   
    /* 페이지네이션 */
    
    // useEffect(() => {
    //     const indexOfLastPost = (page || currentPage) * postPerPage;
    //     const indexOfFirstPost = indexOfLastPost - postPerPage;
    //     setCurrentPosts(getSearchResult().slice(indexOfFirstPost, indexOfLastPost));
    // }, [page, search, posts, currentPage]);

    return(
        <div className="Rent_Admin_List">
            <div className='Admin_side'>
                <div className='Admin_LOGO'> 사이트 로고 </div>
                <div>
                    <div>
                        <a href=''>회원관리</a>
                    </div>
                    <div>
                        <Link to="/rent_admin_canceled"> 
                            반려목록으로 <Outlet />
                        </Link>
                    </div>
                </div>
            </div>

             <div className="content_wrap">
                <div className="content_header">
                    <div className="container_fix clearfix">
                        <h3 className="content_tt">요즘 대여리스트</h3>
                    </div>
                </div>
                <div className="content_body">
                    <div className="container_fix">
                        <ul className="rent_item">
                        { posts && posts.map((it)=>(
                            <Rent_item key={it.id}{...it}/>))}
                        </ul>
                    </div>
                </div>
                <div className="content_tail">
                    <div className="container_fix">
                        <div className="btn_list">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default Rent_admin