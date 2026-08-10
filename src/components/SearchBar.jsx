import "./SearchBar.css";

// Nhận props onSearch
function SearchBar({ onSearch, searchKeyword }) {
  return (
    <div className="search-bar">
      <label htmlFor="search">Tìm kiếm việc làm:</label>
      <input
        id="search"
        type="text"
        placeholder="Tìm theo tên công việc hoặc công ty..."
        value={searchKeyword}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button>Tìm kiếm</button>
    </div>
  );
}

export default SearchBar;