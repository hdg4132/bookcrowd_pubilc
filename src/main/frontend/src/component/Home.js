import React, { useEffect, useState, useRef } from "react";
import "./Home.css";
import bookLogo from "../assets/MainLogo.png";
import img1 from "../assets/Main1.png";
import img2 from "../assets/Main2.png";
import HomeBookList from "./HomeBookList";
import HomeCommunityList from "./HomeCommunityList";
import axios from "axios";
import Main from "./Main.js";
import UserChatPage from "./realChat/UserChatPage.js";

function Home() {
  const [posts, setPosts] = useState([]);
  const scrollDown = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/community");
        setPosts(response.data);
      } catch (error) {
        console.error("커뮤니티 데이터를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchPosts();
  }, []);

  const clickDown = () => {
    if (scrollDown.current) {
      scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <UserChatPage />
      <Main />
      <div className="main_banner">
        <div className="logo">
          <p className="main_banner_text">책 대여 보관 시스템</p>
          <img alt="logo" src={bookLogo} />
          <div className="scroll">
            <span className="scroll_down">scroll down</span>
            <div className="animation">
              <span className="arrow" onClick={clickDown}></span>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="container_fix">
          <section className="section_1">
            <div className="content">
              <div className="text_1">
                <h3>북적북적은?</h3>
                <p>북적북적은 책을 보관하고, 대여할 수 있는 공간입니다.</p>
                <p>
                  책을 보관할 공간이 필요한 분들은 <br />
                  도서 보관하기를 통해 북적북적에 책을 보관할 수 있습니다.
                </p>
              </div>
              <div>
                <img alt="image1" src={img1} />
              </div>
            </div>
            <div className="content">
              <div className="imgage">
                <img alt="image2" src={img2} />
              </div>
              <div className="text_2">
                <h3>책 보관 · 대여 시스템</h3>
                <p>
                  책을 보고 싶은 분들은
                  <br />
                  도서 대여하기를 통해 북적북적에 있는 책을 빌릴 수 있습니다.
                </p>
                <p>
                  보관 신청 시 대여가 가능하다고 설정된 책은
                  <br />
                  다른 회원들이 빌려볼 수 있습니다.
                </p>
              </div>
            </div>
          </section>
          <section className="section_2">
            <div className="book_list">
              <div className="main_list_text">
                <h4>대여 가능한 도서</h4>
                <div>
                  <a href="/checkout">
                    <span>+ 더보기</span>
                  </a>
                </div>
              </div>
              <div className="book_list_slide">
                <HomeBookList />
              </div>
            </div>
          </section>
          <section className="section_3">
            <div>
              <div className="main_list_text">
                <h4>커뮤니티</h4>
                <div>
                  <a href="/community">
                    <span>+ 더보기</span>
                  </a>
                </div>
              </div>
              <div className="community_content">
                <HomeCommunityList posts={posts} />
              </div>
            </div>
          </section>
        </div>
        <section>
          <div className="bottom_banner" ref={scrollDown}>
            <div className="bottom_banner_content">
              <p className="bottom_banner_text">메인타이틀이 노출됩니다</p>
              <div>
                <a href="#">
                  <button className="bottom_banner_btn">시작하기</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
