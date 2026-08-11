import { useParams, useNavigate, Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import "./JobDetailPage.css";

const initialJobs = [];

function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobs] = useLocalStorage("jobs", initialJobs);

  // Tìm job theo id (so sánh dạng chuỗi để tránh lệch kiểu dữ liệu)
  const job = jobs.find((item) => String(item.id) === String(id));

  const getTypeClass = (type) => {
    switch (type) {
      case "Full-time": return "job-type-full-time";
      case "Part-time": return "job-type-part-time";
      case "Remote": return "job-type-remote";
      default: return "";
    }
  };

  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="job-detail-not-found">
          <h2>⚠️ Không tìm thấy việc làm</h2>
          <p>Công việc bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.</p>
          <button className="btn-back" onClick={() => navigate("/jobs")}>
            ← Quay lại danh sách việc làm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-page">
      <button className="btn-back" onClick={() => navigate("/jobs")}>
        ← Quay lại danh sách việc làm
      </button>

      <div className="job-detail-card">
        <div className="job-detail-header">
          <div>
            <h1 className="job-detail-title">{job.title}</h1>
            <p className="job-detail-company"> {job.company}</p>
          </div>
          <span className={`job-type ${getTypeClass(job.type)}`}>
            {job.type}
          </span>
        </div>

        <hr className="divider" />

        <div className="job-detail-grid">
          <div className="detail-item">
            <span className="detail-label"> Địa điểm</span>
            <span className="detail-value">{job.location}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label"> Mức lương</span>
            <span className="detail-value salary-highlight">{job.salary}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label"> Loại hình làm việc</span>
            <span className="detail-value">{job.type}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label"> Mã công việc</span>
            <span className="detail-value">#{job.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;
