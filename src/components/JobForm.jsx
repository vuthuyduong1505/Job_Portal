import { useState, useEffect } from "react";
import "./JobForm.css";

function JobForm({ onClose, onSave, editingJob = null }) {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title || "",
        company: editingJob.company || "",
        location: editingJob.location || "",
        salary: editingJob.salary || "",
        type: editingJob.type || "Full-time",
      });
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      id: editingJob ? editingJob.id : Date.now(),
      ...formData,
    };

    onSave(jobData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editingJob ? "Chỉnh sửa việc làm" : "Thêm việc làm mới"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Vị trí</label>
            <input required type="text" name="title" placeholder="VD: Frontend Developer" value={formData.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Công ty</label>
            <input required type="text" name="company" placeholder="VD: FPT Software" value={formData.company} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Địa điểm</label>
            <input required type="text" name="location" placeholder="VD: Hà Nội" value={formData.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Mức lương</label>
            <input required type="text" name="salary" placeholder="VD: 15-25 triệu" value={formData.salary} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Loại hình</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-save">{editingJob ? "Cập nhật" : "Lưu"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;