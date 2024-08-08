import {useState} from "react";

const ListSearch=()=>{
    const [changeSearchInput, SetChangeSearchInput] = useState();
    return(
        <div className="topSearch clearfix">
            <form className="board_search">
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value=""
                    onChange={changeSearchInput}
                />
                <button type="submit" onClick="">
                    <span className="icon_search"></span>
                </button>
            </form>
        </div>
    )
}

export default ListSearch;