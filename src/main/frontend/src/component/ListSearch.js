import {useState} from "react";

const ListSearch=({ onSearch, searchKeyword})=>{
    const [changeSearchInput, setChangeSearchInput] = useState(searchKeyword || '');

    const ChangeSearchInput = (e) => {
        setChangeSearchInput(e.target.value);
    }

const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
        onSearch(changeSearchInput);
    }
}
    return(
        <div className="topSearch clearfix">
            <form className="board_search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={changeSearchInput}
                    onChange={ChangeSearchInput}

                />
                <button type="submit" >
                    <span className="icon_search"></span>
                </button>
            </form>
        </div>
    )
}

export default ListSearch;