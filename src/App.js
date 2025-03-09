import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequiredAuthLayout from "./layouts/RequiredAuthLayout";
import RootLayout from "./layouts/RootLayout";
import ChatListPage from "./pages/chat/ChatListPage";
import ChatRoomPage from "./pages/chat/ChatRoomPage";
import CreatePortfolioPage from "./pages/createportfolio/CreatePortfolioPage";
import FavoriteListPage from "./pages/favorite/FavoriteListPage";
import LoginPage from "./pages/common/LoginPage";
import MainPage from "./pages/main/MainPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import PaymentCompletePage from "./pages/common/PaymentCompletePage";
import PaymentFailPage from "./pages/common/PaymentFailPage";
import PortfolioDetailPage from "./pages/portfoliodetail/PortfolioDetailPage";
import PrivacyPolicyPage from "./pages/main/PrivacyPolicyPage";
import ProfilePage from "./pages/main/ProfilePage";
import SearchPage from "./pages/portfolios/SearchPage";
import SignupPage from "./pages/common/SignupPage";
import TermsPage from "./pages/main/TermsPage";
import DuplicatedCheckLayout from "./layouts/DuplicatedCheckLayout";
import QuotationCollectPage from "./pages/quotation/QuotationCollectPage";
import WritableReviewListPage from "./pages/review/WritableReviewListPage";
import ReviewListPage from "./pages/review/ReviewListPage";
import PortfolioReviewPage from "./pages/review/PortfolioReviewPage";

function App() {
  // 주석
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
            <Route
              path="/portfolios/reviews/:plannerId"
              element={<PortfolioReviewPage />}
            />
            {/* <Route path="/reviews/:reviewId" element={<ReviewDetailPage />} /> */}
          </Route>
          <Route element={<DuplicatedCheckLayout />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<RequiredAuthLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/payments/complete"
              element={<PaymentCompletePage />}
            />
            <Route path="/payments/fail" element={<PaymentFailPage />} />
            <Route path="/chat/list" element={<ChatListPage />} />
            <Route path="/chat/:chatId" element={<ChatRoomPage />} />
            <Route
              path="/profile/create/portfolio"
              element={<CreatePortfolioPage />}
            />
            <Route path="/profile/favorites" element={<FavoriteListPage />} />
            <Route
              path="/quotations/collect"
              element={<QuotationCollectPage />}
            />
            <Route
              path="/profile/reviews/writable"
              element={<WritableReviewListPage />}
            />
            <Route
              path="/profile/reviews/collect"
              element={<ReviewListPage />}
            />
            {/* <Route path="/quotations/:chatId" element={<QuotationListPage />} /> */}
            {/* <Route */}
            {/*  path="/quotations/create/:chatId" */}
            {/*  element={<QuotationCreatePage />} */}
            {/* /> */}
            {/* <Route */}
            {/*  path="/quotations/update/:quotationId" */}
            {/*  element={<QuotationUpdatePage />} */}
            {/* /> */}
            {/* <Route */}
            {/*  path="/profile/reviews/create/:chatId" */}
            {/*  element={<ReviewCreatePage />} */}
            {/* /> */}
            {/* <Route */}
            {/*  path="/profile/reviews/update/:reviewId" */}
            {/*  element={<ReviewUpdatePage />} */}
            {/* /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
