/**
 * Lọc danh sách việc làm theo từ khóa tìm kiếm (tiêu đề công việc hoặc tên công ty).
 * 
 * @param {Array} jobs - Danh sách công việc gốc
 * @param {string} keyword - Từ khóa tìm kiếm từ ô input
 * @returns {Array} Mảng công việc đã qua lọc
 */
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

/**
 * Lọc danh sách việc làm kết hợp nhiều tiêu chí (Từ khóa, Loại hình, Địa điểm) - AND Logic
 * 
 * @param {Array} jobs - Danh sách công việc gốc
 * @param {Object} filters - Đối tượng chứa tham số lọc { keyword, type, location }
 * @returns {Array} Mảng công việc thỏa mãn tất cả tiêu chí
 */
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
