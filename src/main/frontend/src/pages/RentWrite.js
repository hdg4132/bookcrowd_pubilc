import './RentWrite.css'
import AdmLayout from "../component/AdmLayout";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const RentWrite =()=>{
    const nav = useNavigate();
    // const {id} =  useParams();
    const [input, setInput] = useState({
        isbn:"", bookName:"",  author:"", publishDate:"", publisher:"", pages:"", genre:"", description:""
    })
    const [file, setFile] = useState()
    // const [isEdit, setIsEdit] = useState(false)
    const onChangeInput = (e) => {
        const { name, value} = e.target;

        setInput({
            ...input,
            [name]: value
        });
    };
    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const formSubmit =async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("bookId",input.bookId);
        formData.append("ISBN",input.ISBN);
        formData.append("bookName",input.bookName);
        if (file) {
            formData.append("file", file);
        }
        formData.append("publisher",input.publisher);
        formData.append("author",input.author);
        formData.append("publishDate",input.publishDate);
        formData.append("genre",input.genre);
        formData.append("pages",input.pages);
        formData.append("description",input.description);

        await axios
            .post('http://localhost:8080/books/write',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            .then((res) => {
                nav(`../../rent/${res.data.bookId}`)
                console.log(JSON.stringify(res.data))
            })

    }
    // useEffect(() => {
    //    if(id){
    //        setIsEdit(true);
    //        axios.get(`http://localhost:8080/books/${id}`)
    //            .then(response=> {
    //                setInput({
    //                    isbn: response.data.ISBN,
    //                    bookName: response.data.bookName,
    //                    author: response.data.author,
    //                    publishDate: response.data.publishDate,
    //                    publisher: response.data.publisher,
    //                    pages: response.data.pages,
    //                    genre: response.data.genre,
    //                    description: response.data.description
    //                })
    //            })
    //            .catch(err => console.error(err));
    //    }
    // }, [id]);



    return(
        <div className="CheckoutWrite">
            <AdmLayout/>
            <div className="adm_con write_checkout">
                <form onSubmit={formSubmit}>
                    <p>
                        <label htmlFor="title">제목</label>
                        <input onChange={onChangeInput} type="text" name="bookName" id="bookName" value={input.bookName}></input>
                    </p>
                    <p>
                        <label htmlFor="isbn">ISBN</label>
                        <input onChange={onChangeInput} type="text" name="isbn" id="isbn" value={input.isbn}></input>
                    </p>
                    <p>
                        <label htmlFor="author">저자</label>
                        <input onChange={onChangeInput} type="text" name="author" id="author" value={input.author}></input>
                    </p>
                    <p>
                        <label htmlFor="date">발행일</label>
                        <input onChange={onChangeInput} type="text" name="publishDate" id="publishDate" value={input.publishDate}></input>
                    </p>
                    <p>
                        <label htmlFor="public">출판사</label>
                        <input onChange={onChangeInput} type="text" name="publisher" id="publisher" value={input.publisher}></input>
                    </p>
                    <p>
                        <label htmlFor="page">면 수</label>
                        <input onChange={onChangeInput} type="text" name="pages" id="pages" value={input.pages}></input>
                    </p>
                    <p>
                        <label htmlFor="genre">장르</label>
                        <input onChange={onChangeInput} type="text" name="genre" id="genre" value={input.genre}></input>
                    </p>
                    <p>
                        <label htmlFor="info">책 소개</label>
                        <textarea onChange={onChangeInput} name="description" id="description" value={input.description}></textarea>
                    </p>
                    <p>
                        <label htmlFor="file">책 이미지</label>
                        <input onChange={onFileChange} type="file" name="bookImgUrl" id="bookImgUrl" value={input.bookImgUrl}
                               accept="image/gif, image/jpeg, image/png"/>
                    </p>
                    <div className="btn_area">
                        <button type="submit" className="btn btn_write">
                            작성하기
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