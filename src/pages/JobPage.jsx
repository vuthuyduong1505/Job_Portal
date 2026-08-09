import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobTable from "../components/JobTable";
import JobForm from "../components/JobForm";
import JobStats from "../components/JobStats";
import useLocalStorage from "../hooks/useLocalStorage";
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
];

function JobPage() {
  const [jobs, setJobs] = useLocalStorage("jobs", initialJobs);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

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

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    job.company.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div>
      <div className="job-page-header">
        <h1>Job Portal</h1>
        <p>Quản lý danh sách việc làm</p>
      </div>

      <JobStats jobs={jobs} />

      <div className="job-page-toolbar">
        <SearchBar onSearch={setSearchKeyword} />
        <button className="btn-add-job" onClick={handleOpenAddForm}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Thêm việc làm
        </button>
      </div>

      <JobTable jobs={filteredJobs} onDelete={handleDeleteJob} onEdit={handleOpenEditForm} />

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