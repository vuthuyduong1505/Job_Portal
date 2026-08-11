import { Link } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Không tìm thấy trang</h2>
        <p className="not-found-text">
          Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển.
        </p>
        <Link to="/" className="btn-home">
          🏠 Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
