import { Link, Outlet } from "react-router-dom";
import Rent from "./Rent";

function Main() {
  const user = {
    id: 1,
    name: "한만서",
    phone: "010-3791-1290",
  };

  localStorage.setItem("userInfo", JSON.stringify(user));

  const book = {
    bookname: "마음을 맡기는 보관가게 2",
    author: "오야마 준코",
    publisher: "모모",
    date: "2024년 07월 17일",
    ISBN13: "9791198809964",
    ISBN9: "1198809965",
    bookimgurl: "https://image.yes24.com/goods/129085141/XL",
  };

  localStorage.setItem("book", JSON.stringify(book));

  return (
    <div className="App">
      <Link to="/rent">
        대여로 <Outlet />
      </Link>
      <br />
      <Link to="/rent_admin">
        대여관리로 <Outlet />
      </Link>
    </div>
  );
}

export default Main;
