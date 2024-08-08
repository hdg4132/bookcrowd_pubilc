import "./SubBanner.css";
import img_route from "../assets/subbanner_checkout.png";
import { useState } from "react";
import axios from "axios";

const SubBanner = ({ page_name, title_en, title_kr, search, onSearch, searchKeyword }) => {
    const subBanner_img = `${img_route}${page_name}.png`;
    const [changeSearch, setChangeSearch] = useState(searchKeyword || '');

    const changeSearchInput = (e) => {
        setChangeSearch(e.target.value);
    };

    const handleSearchList = async (e) => {
        e.preventDefault();

        if(onSearch){
            await onSearch(changeSearch)
        }
    };

    return (
        <div className="sub_header">
            <div className={`subBanner subBanner_${page_name}`}>
                <div className="subBanner_txt">
                    <div className="container_fix">
                        <h3 className="subBanner_subTt">{title_en}</h3>
                        <h2 className="subBanner_tt">{title_kr}</h2>
                    </div>
                </div>
            </div>
            <div className="sub_title">
                <div className="container_fix">
                    <h4 className="sub_title_txt">{title_kr}</h4>
                    {search && (
                        <form className="board_search">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={changeSearch}
                                onChange={changeSearchInput}
                            />
                            <button type="submit" onClick={handleSearchList}>
                                <span className="icon_search"></span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubBanner;
