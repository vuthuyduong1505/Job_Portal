import "./JobTable.css";

function JobTable({ jobs, onDelete, onEdit, totalJobsCount = 0 }) {

  const getTypeClass = (type) => {
    switch (type) {
      case "Full-time": return "job-type-full-time";
      case "Part-time": return "job-type-part-time";
      case "Remote": return "job-type-remote";
      default: return "";
    }
  };

  return (
    <div className="job-table-wrapper">
      {jobs.length === 0 ? (
        <div className="job-table-empty">
          {totalJobsCount === 0
            ? "Chưa có công việc nào trong hệ thống. Bấm \"Thêm việc làm\" để tạo mới!"
            : "Không tìm thấy công việc nào phù hợp."}
        </div>
      ) : (
        <table className="job-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Vị trí</th>
              <th>Công ty</th>
              <th>Địa điểm</th>
              <th>Mức lương</th>
              <th>Loại hình</th>
              <th colSpan="2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td className="job-title">{job.title}</td>
                <td className="job-company">{job.company}</td>
                <td>
                  <span className="job-location">📍 {job.location}</span>
                </td>
                <td className="job-salary">{job.salary}</td>
                <td>
                  <span className={`job-type ${getTypeClass(job.type)}`}>
                    {job.type}
                  </span>
                </td>
                <td colSpan="2">
                  <div className="actions-cell">
                    <button className="btn-action btn-edit" title="Sửa" onClick={() => onEdit(job)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="btn-action btn-delete" title="Xóa" onClick={() => onDelete(job.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default JobTable;