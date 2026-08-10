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
