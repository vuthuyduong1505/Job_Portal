import { JOB_TYPES, LOCATIONS } from "../constants/jobTypes";
import "./JobFilterBar.css";

function JobFilterBar({ filters, onFilterChange, onResetFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const isFiltered =
    Boolean(filters.keyword && filters.keyword.trim()) ||
    (filters.type && filters.type !== "all") ||
    (filters.location && filters.location !== "all");

  return (
    <div className="job-filter-bar">
      <div className="filter-item filter-search">
        <input
          type="text"
          name="keyword"
          placeholder="Tìm theo tên công việc hoặc công ty..."
          value={filters.keyword || ""}
          onChange={handleChange}
        />
      </div>

      <div className="filter-item">
        <select name="type" value={filters.type || "all"} onChange={handleChange}>
          <option value="all">Tất cả loại hình</option>
          {JOB_TYPES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-item">
        <select name="location" value={filters.location || "all"} onChange={handleChange}>
          <option value="all">Tất cả địa điểm</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {isFiltered && (
        <button type="button" className="btn-reset-filter" onClick={onResetFilters}>
          ✕ Xóa bộ lọc
        </button>
      )}
    </div>
  );
}

export default JobFilterBar;
