import { Link } from "react-router-dom";
import JobStats from "../components/JobStats";
import useLocalStorage from "../hooks/useLocalStorage";
import "./HomePage.css";

const initialJobs = [
  { id: 1, title: "Frontend Developer", company: "FPT Software", location: "Hà Nội", salary: "15-25 triệu", type: "Full-time" },
  { id: 2, title: "Backend Developer", company: "VNG Corporation", location: "TP.HCM", salary: "20-35 triệu", type: "Full-time" },
  { id: 3, title: "UI/UX Designer", company: "Tiki", location: "TP.HCM", salary: "12-20 triệu", type: "Full-time" },
];

function HomePage() {
  const [jobs] = useLocalStorage("jobs", initialJobs);

  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">Chào mừng đến với Job Portal</h1>
        <p className="home-subtitle">
          Hệ thống kết nối ứng viên và nhà tuyển dụng hàng đầu Việt Nam. Tìm kiếm công việc mơ ước của bạn ngay hôm nay!
        </p>
        <div className="home-actions">
          <Link to="/jobs" className="btn-hero-primary">
            🔍 Xem việc làm ({jobs.length})
          </Link>
        </div>
      </div>

      <div className="home-section">
        <h2 className="section-title">Thống kê hệ thống</h2>
        <JobStats jobs={jobs} />
      </div>
    </div>
  );
}

export default HomePage;
