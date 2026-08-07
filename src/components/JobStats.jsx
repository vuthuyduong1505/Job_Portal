import "./JobStats.css";

function JobStats({ jobs = [] }) {
  const totalJobs = jobs.length;
  const fullTimeJobs = jobs.filter((job) => job.type === "Full-time").length;
  const partTimeJobs = jobs.filter((job) => job.type === "Part-time").length;
  const remoteJobs = jobs.filter((job) => job.type === "Remote").length;

  const stats = [
    {
      title: "Tổng việc làm",
      count: totalJobs,
      type: "total",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      title: "Full-time",
      count: fullTimeJobs,
      type: "full-time",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      title: "Part-time",
      count: partTimeJobs,
      type: "part-time",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Remote",
      count: remoteJobs,
      type: "remote",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="job-stats-grid">
      {stats.map((item) => (
        <div key={item.type} className={`stat-card stat-card-${item.type}`}>
          <div className="stat-icon">{item.icon}</div>
          <div className="stat-info">
            <span className="stat-count">{item.count}</span>
            <span className="stat-title">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobStats;
