import { useState, useEffect } from "react";
import { JOB_TYPES } from "../constants/jobTypes";
import { validateJob } from "../utils/jobValidation";
import "./JobForm.css";

function JobForm({ onClose, onSave, editingJob = null }) {

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
  });


  const [errors, setErrors] = useState({});

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

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // TASK 5.3 — Validate khi submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateJob(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

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
            <input
              type="text"
              name="title"
              placeholder="VD: Frontend Developer"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? "input-error" : ""}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Công ty</label>
            <input
              type="text"
              name="company"
              placeholder="VD: FPT Software"
              value={formData.company}
              onChange={handleChange}
              className={errors.company ? "input-error" : ""}
            />
            {errors.company && <span className="error-message">{errors.company}</span>}
          </div>
          <div className="form-group">
            <label>Địa điểm</label>
            <input
              type="text"
              name="location"
              placeholder="VD: Hà Nội"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? "input-error" : ""}
            />
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
          <div className="form-group">
            <label>Mức lương</label>
            <input
              type="text"
              name="salary"
              placeholder="VD: 15000000"
              value={formData.salary}
              onChange={handleChange}
              className={errors.salary ? "input-error" : ""}
            />
            {errors.salary && <span className="error-message">{errors.salary}</span>}
          </div>
          <div className="form-group">
            <label>Loại hình</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              {JOB_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
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