

const RentItem =({bookId, bookImgUrl, bookName, author, publisher, description})=>{

    return(
        <li>

            <a href={'/rent/'+bookId}>
                <div className='list_img'>
                    <img src={`http://localhost:8080/files/${bookImgUrl}`}/>
                </div>
                <div className='list_con'>
                    <h4 className='con_title'>{bookName}</h4>
                    <ul className="con_info">
                        <li>저자: {author}</li>
                        <li>출판사: {publisher}</li>
                    </ul>
                    <p className='con_con'>{description}</p>
                </div>

            </a>
        </li>

    )
}

export default RentItem;