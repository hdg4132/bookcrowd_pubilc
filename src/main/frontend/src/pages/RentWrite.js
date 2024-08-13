import './RentWrite.css'
import AdmLayout from "../component/AdmLayout";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";


const RentWrite =()=>{

    const location = useLocation();
    const nav = useNavigate();
    const {id} =  useParams();
    const [input, setInput] = useState({
        isbn:location.state?.isbn || "", bookName:location.state?.bookName || "",  author:"", publishDate:"", pages:"", publisher:"", genre:"", description:""
    })
    const [inputNum, setInputNum] = useState({})
    const [file, setFile] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const storedUserData    = sessionStorage.getItem("userData");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            nav("/login")
        }
    }, [nav])
    const onChangeInput = (e) => {
        const { name, value} = e.target;
        if(e.target.name=="pages" || e.target.name=="isbn"){
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
        }
        setInput({
            ...input,
            [name]: e.target.value
        });
    };
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchBookData = async() => {
        if (input.isbn) {
            try {
                const response = await axios.get(`/api/books/fetchBookData?isbn=${input.isbn}`);
                console.log(response.data)
                if (response.data) {
                    setInput({
                        ...input,
                        bookName: response.data.bookName,
                        author: response.data.author,
                        publishDate: response.data.publishDate,
                        publisher:response.data.publisher,
                        genre: response.data.genre,
                    });
                } else {
                    alert('최신 도서는 등록되어 있지 않습니다');
                }
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        }
    };


    const formSubmit =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("bookId",input.bookId);
        formData.append("ISBN",location.state?.isbn);
        formData.append("bookName",location.state?.bookName);
        if (file) {
            formData.append("file", file);
        }
        formData.append("publisher",input.publisher);
        formData.append("author",input.author);
        formData.append("publishDate",input.publishDate);
        formData.append("genre",input.genre);
        formData.append("pages",input.pages);
        formData.append("description",input.description);

       if(isEdit){
           await axios
               .put(`http://localhost:8080/books/edit/${id}`,
                   formData, {
                       headers: {
                           'Content-Type': 'multipart/form-data'
                       }
                   })
               .then((res) => {
                   nav(-1)
                   console.log(JSON.stringify(res.data))
               })
       }else{
           await axios
               .post('http://localhost:8080/books/write',
                   formData, {
                       headers: {
                           'Content-Type': 'multipart/form-data'
                       }
                   })
               .then((res) => {
                   nav(-1)
                   console.log(JSON.stringify(res.data))
               })
       }

    }
    useEffect(() => {
       if(id){
           setIsEdit(true);
           axios.get(`http://localhost:8080/books/${id}`)
               .then(response=> {
                   setInput({
                       isbn: response.data.isbn,
                       bookName: response.data.bookName,
                       author: response.data.author,
                       bookImgUrl: response.data.bookImgUrl,
                       publishDate: response.data.publishDate,
                       publisher: response.data.publisher,
                    pages: response.data.pages,
                       genre: response.data.genre,
                       description: response.data.description,
                   })

               })
               .catch(err => console.error(err));
       }
    }, [id]);


    return(
        <div className="CheckoutWrite">
            <AdmLayout/>
            <div className="adm_con write_checkout">
                <form onSubmit={formSubmit}>
                    <p> 
                        <label htmlFor="title">제목</label>
                        <input onChange={onChangeInput} type="text" name="bookName" id="bookName"
                               value={input.bookName} required/>
                    </p>
                    <p>
                        <label htmlFor="isbn">ISBN</label>
                        <input onChange={onChangeInput} type="text" name="isbn" id="isbn" value={isEdit?input.isbn :(location.state?.isbn || '')} required/>
                        <button className='btn1 btn_write' type='button' onClick={fetchBookData}>정보 가져오기</button>
                    </p>
                    <p>
                        <label htmlFor="author">저자</label>
                        <input onChange={onChangeInput} type="text" name="author" id="author" value={input.author} required/>
                    </p>
                    <p>
                        <label htmlFor="date">발행일</label>
                        <input onChange={onChangeInput} type="text" name="publishDate" id="publishDate" value={input.publishDate} required/>
                    </p>
                    <p>
                        <label htmlFor="public">출판사</label>
                        <input onChange={onChangeInput} type="text" name="publisher" id="publisher" value={input.publisher} required/>
                    </p>
                    <p>
                        <label htmlFor="page">면 수</label>
                        <input onChange={onChangeInput} type="text" name="pages" id="pages" value={input.pages}  required/>

                    </p>
                    <p>
                        <label htmlFor="genre">장르</label>
                        <input onChange={onChangeInput} type="text" name="genre" id="genre" value={input.genre} required/>
                    </p>
                    <p>
                        <label htmlFor="info">책 소개</label>
                        <textarea onChange={onChangeInput} name="description" id="description" value={input.description}></textarea>
                    </p>
                    <p>
                        <label htmlFor="file">책 이미지</label>
                        <input onChange={onFileChange} type="file" name="bookImgUrl" id="bookImgUrl" value={input.file}
                               accept="image/gif, image/jpeg, image/png"/>
                    </p>
                    <div className="btn_area">
                        <button type="submit" className="btn btn_write">
                            {isEdit ? '수정하기':'작성하기'}
                        </button>
                        <a href="" className="btn btn_cancel">
                            취소
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RentWrite;