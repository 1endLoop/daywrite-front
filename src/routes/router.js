  import { createBrowserRouter } from "react-router-dom";
  import { Navigate } from "react-router-dom";
  import Main from "../pages/main/Main";
  import NotFound from "../pages/not_found/NotFound";
  import Layout from "../pages/layout/Layout";

  // Auth
  import Login from "../pages/auth/Login";
  import Signup from "../pages/auth/SignUp";

  // Category
  import CategoryContainer from "../pages/category/CategoryContainer";
  import TypingPage from "../pages/category/TypingPage";
  import MainCategory from "../pages/main/MainCategory"; // TypingPage.jsx를 위한!

  // Archive
  import ArchiveContainer from "../pages/archive/ArchiveContainer";
  import HistoryList from "../pages/archive/HistoryList";
  import CalendarHome from "../pages/archive/CalendarHome";
  import CalendarList from "../pages/archive/CalendarList";
  import BookmarkHome from "../pages/archive/BookmarkHome";
  import BookmarkTypedList from "../pages/archive/BookmarkTypedList";
  import BookmarkPlyedList from "../pages/archive/BookmarkPlyedList";
  import LikedList from "../pages/archive/LikedList";

  // Community
  import CommunityContainer from "../pages/community/CommunityContainer";
  import CommunityList from "../pages/community/CommunityList";
  import CommunityHome from "../pages/community/CommunityHome";
  import CommunityMyPosts from "../pages/community/CommunityMyPosts";
  import CommunityCollection from "../pages/community/CommunityCollection";
  import PostDetail from "../pages/community/PostDetail";
  import PostWrite from "../pages/community/PostWrite";
  import CollectionDetail from "../pages/community/CollectionDetail";
  import CollectionAllview from "../pages/community/CollectionAllview";
  import CommunitySongList from "../pages/community/CommunitySongList";

  // My Page
  import MyPageContainer from "../pages/my_page/MyPageContainer";
  import ProfileHome from "../pages/my_page/ProfileHome";
  import TypingSetting from "../pages/my_page/TypingSetting";
  import EditUserInfo from "../pages/my_page/EditUserInfo";
  import CategoryData from "../pages/my_page/CategoryData";
  import NoticeHome from "../pages/my_page/NoticeHome";
  import NoticeWrite from "../pages/my_page/NoticeWrite";
  import Faq from "../pages/my_page/Faq";
  import InquiryHome from "../pages/my_page/InquiryHome";
  import InquiryWrite from "../pages/my_page/InquiryWrite";
  import Terms from "../pages/my_page/Terms";
  import ProfileHomePopup from "../pages/my_page/ProfileHomePopup";
  import BookmarkMain from "../pages/archive/BookmarkMain";
import BookmarkAll from "../pages/archive/ BookmarkAll";
import BookmarkTyped from "../pages/archive/BookmarkTyped";
  import BookmarkNewFolder from "../pages/archive/BookmarkNewFolder"; // 추가
  
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    
    // 카테고리
    {
      path: "category",
      element: <CategoryContainer />,
    },
    {
      path: "/",
      element:<MainCategory/>,
      children:[
        {
          path:"category/typing",
          element:<TypingPage/>

        }
      ]
    },
    {
      path: "/",
      element: <Layout/>,
      children: [
        // Archive
        {
          path: "archive",
          element: <ArchiveContainer />,
          children: [
          {
            index: true,
            element: <Navigate to="history" replace />,
          },
          {
            path: "history",
            element: <HistoryList />,
          },
          {
            path: "calendar",
            element: <CalendarHome />,
          },
          {
            path: "calendar/:date",
            element: <CalendarList />,
          },
          {
            path: "bookmark/bookmarkNewFolder",
            element: <BookmarkNewFolder /> // 추가
          },
          {
            path: "bookmark",
            element: <BookmarkMain />,
          },
          {
            path: "bookmark/:type",
            element: <BookmarkAll />,
          },
          {
            path: "bookmark/:type/:id",
            element: <BookmarkTyped />,
          },
          {
            path: "liked",
            element: <LikedList />,
          },
        ],
      },
      // 커뮤니티
      {
        path: "community",
        element: <CommunityContainer />,
        children: [
          {
            index: true,
            element: <CommunityHome />,
          },
          {
            path: "list",
            element: <CommunityList />,
          },
          {
            path: "my",
            element: <CommunityMyPosts />,
          },
          {
            path: "collection",
            element: <CommunityCollection />,
          },
          {
            path: ":id",
            element: <PostDetail />,
          },
          {
            path: "communitysonglist",
            element: <CommunitySongList />,
          },
          {
            path: "collection/collectionAllview", // 추가
            element: <CollectionAllview />,
          },
          {
            path: "collection/detail", // detail 수정(/:id)
            element: <CollectionDetail />,
          },
        ],
      },
      {
        path: "community/write",
        element: <PostWrite />,
      },
      // {
      //   path: "collection/:id",
      //   element: <CollectionDetail />,
      // },

        // 마이페이지
        {
          path: "mypage",
          element: <MyPageContainer />,
          children: [
            {
              index: true,
              element: <ProfileHome />,
            },
            {
              path: "shared",
              element: <ProfileHomePopup />,
            },
            {
              path: "followers",
              element: <ProfileHomePopup />,
            },
            {
              path: "following",
              element: <ProfileHomePopup />,
            },
            {
              path: "typing-setting",
              element: <TypingSetting />,
            },
            {
              path: "user-info",
              element: <EditUserInfo />,
            },
            {
              path: "data",
              element: <CategoryData />,
            },
            {
              path: "notice",
              element: <NoticeHome />,
            },
            {
              path: "notice/write",
              element: <NoticeWrite />,
            },
            {
              path: "faq",
              element: <Faq />,
            },
            {
              path: "inquiry",
              element: <InquiryHome />,
            },
            {
              path: "inquiry/write",
              element: <InquiryWrite />,
            },
            {
              path: "terms",
              element: <Terms />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  export default router;
