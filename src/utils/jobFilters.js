export function filterJobsByKeyword(jobs = [], keyword = "") {
  if (!keyword || !keyword.trim()) {
    return jobs;
  }

  const lowerKeyword = keyword.toLowerCase().trim();

  return jobs.filter((job) => {
    const matchTitle = job.title ? job.title.toLowerCase().includes(lowerKeyword) : false;
    const matchCompany = job.company ? job.company.toLowerCase().includes(lowerKeyword) : false;

    return matchTitle || matchCompany;
  });
}


export function applyJobFilters(jobs = [], filters = {}) {
  const { keyword = "", type = "all", location = "all" } = filters;
  const lowerKeyword = keyword.toLowerCase().trim();

  return jobs.filter((job) => {
    // 1. Lọc theo từ khóa (Title hoặc Company)
    const matchKeyword =
      !lowerKeyword ||
      (job.title && job.title.toLowerCase().includes(lowerKeyword)) ||
      (job.company && job.company.toLowerCase().includes(lowerKeyword));

    // 2. Lọc theo loại hình công việc
    const matchType = type === "all" || job.type === type;

    // 3. Lọc theo địa điểm
    const matchLocation =
      location === "all" ||
      (job.location && job.location.toLowerCase().includes(location.toLowerCase()));

    return matchKeyword && matchType && matchLocation;
  });
}
