import { useState, useEffect } from "react";
import JobFilterBar from "../components/JobFilterBar";
import JobTable from "../components/JobTable";
import JobForm from "../components/JobForm";
import JobStats from "../components/JobStats";
import useLocalStorage from "../hooks/useLocalStorage";
import { applyJobFilters } from "../utils/jobFilters";
import "./JobPage.css";

const initialJobs = [
    { id: 1, title: "Frontend Developer", company: "FPT Software", location: "Hà Nội", salary: "15-25 triệu", type: "Full-time" },
    { id: 2, title: "Backend Developer", company: "VNG Corporation", location: "TP.HCM", salary: "20-35 triệu", type: "Full-time" },
    { id: 3, title: "UI/UX Designer", company: "Tiki", location: "TP.HCM", salary: "12-20 triệu", type: "Full-time" },
    { id: 4, title: "DevOps Engineer", company: "Viettel", location: "Hà Nội", salary: "25-40 triệu", type: "Full-time" },
    { id: 5, title: "React Developer", company: "Shopee", location: "TP.HCM", salary: "22-38 triệu", type: "Full-time" },
    { id: 6, title: "Data Analyst", company: "MoMo", location: "TP.HCM", salary: "18-30 triệu", type: "Part-time" },
    { id: 7, title: "Mobile Developer", company: "VNPAY", location: "Hà Nội", salary: "20-32 triệu", type: "Full-time" },
    { id: 8, title: "QA Engineer", company: "Grab Vietnam", location: "TP.HCM", salary: "15-28 triệu", type: "Full-time" },
    { id: 9, title: "Product Manager", company: "Zalo", location: "TP.HCM", salary: "30-50 triệu", type: "Full-time" },
    { id: 10, title: "Scrum Master", company: "FPT Software", location: "Đà Nẵng", salary: "20-35 triệu", type: "Full-time" },
    { id: 11, title: "iOS Developer", company: "VinAI", location: "Hà Nội", salary: "25-40 triệu", type: "Full-time" },
    { id: 12, title: "Android Developer", company: "Be Group", location: "TP.HCM", salary: "20-35 triệu", type: "Full-time" },
    { id: 13, title: "Data Engineer", company: "Techcombank", location: "Hà Nội", salary: "28-45 triệu", type: "Full-time" },
    { id: 14, title: "Cloud Architect", company: "CMC Global", location: "Hà Nội", salary: "35-55 triệu", type: "Remote" },
    { id: 15, title: "Technical Writer", company: "Axon", location: "TP.HCM", salary: "12-18 triệu", type: "Part-time" },
    { id: 16, title: "Security Engineer", company: "BKAV", location: "Hà Nội", salary: "22-38 triệu", type: "Full-time" },
    { id: 17, title: "Fullstack Developer", company: "Ến Vàng Tech", location: "Đà Nẵng", salary: "18-30 triệu", type: "Full-time" },
    { id: 18, title: "AI/ML Engineer", company: "VinAI", location: "Hà Nội", salary: "35-60 triệu", type: "Full-time" },
    { id: 19, title: "System Admin", company: "Viettel IDC", location: "Hà Nội", salary: "15-25 triệu", type: "Full-time" },
    { id: 20, title: "Business Analyst", company: "TMA Solutions", location: "TP.HCM", salary: "18-30 triệu", type: "Full-time" },
    { id: 21, title: "Graphic Designer", company: "Tiki", location: "TP.HCM", salary: "10-18 triệu", type: "Part-time" },
    { id: 22, title: "Node.js Developer", company: "NashTech", location: "TP.HCM", salary: "20-35 triệu", type: "Remote" },
    { id: 23, title: "Java Developer", company: "Samsung Vietnam", location: "Hà Nội", salary: "25-42 triệu", type: "Full-time" },
    { id: 24, title: "Python Developer", company: "Fossil Vietnam", location: "TP.HCM", salary: "22-38 triệu", type: "Remote" },
    { id: 25, title: "Project Manager", company: "KMS Technology", location: "TP.HCM", salary: "30-50 triệu", type: "Full-time" },
];

function JobPage() {
  const [jobs, setJobs] = useLocalStorage("jobs", initialJobs);

  const [filters, setFilters] = useState({
    keyword: "",
    type: "all",
    location: "all",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      keyword: "",
      type: "all",
      location: "all",
    });
  };

  const handleDeleteJob = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
      const updatedJobs = jobs.filter((job) => job.id !== id);
      setJobs(updatedJobs);
    }
  };

  const handleOpenAddForm = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingJob(null);
  };

  const handleSaveJob = (jobData) => {
    if (editingJob) {
      setJobs(jobs.map((job) => (job.id === jobData.id ? jobData : job)));
    } else {
      setJobs([jobData, ...jobs]);
    }
    handleCloseForm();
  };

  // Lọc danh sách công việc theo filters
  const filteredJobs = applyJobFilters(jobs, filters);

  // TASK 4.2 — TÍNH totalPages (Derived Value)
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // TASK 4.3 — LẤY JOBS CỦA TRANG HIỆN TẠI (currentJobs)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div>
      <div className="job-page-header">
        <h1>Job Portal</h1>
        <p>Quản lý danh sách việc làm</p>
      </div>

      <JobStats jobs={jobs} />

      <div className="job-page-toolbar">
        <JobFilterBar
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={handleResetFilters}
        />
        <button className="btn-add-job" onClick={handleOpenAddForm}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Thêm việc làm
        </button>
      </div>

      <div className="job-result-count" style={{ marginBottom: "16px", color: "var(--text-secondary)", fontSize: "14px", fontWeight: "500" }}>
        Tìm thấy <strong>{filteredJobs.length}</strong> việc làm phù hợp (trên tổng số {jobs.length})
      </div>

      <JobTable
        jobs={currentJobs}
        totalJobsCount={jobs.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onDelete={handleDeleteJob}
        onEdit={handleOpenEditForm}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹ Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              className={`btn-page ${page === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn-page"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next ›
          </button>
        </div>
      )}

      {isFormOpen && (
        <JobForm
          editingJob={editingJob}
          onClose={handleCloseForm}
          onSave={handleSaveJob}
        />
      )}
    </div>
  );
}

export default JobPage;