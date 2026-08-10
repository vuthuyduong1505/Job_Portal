export function validateJob(formData) {
  const errors = {};

  // 1. Validate title (Vị trí)
  if (!formData.title || !formData.title.trim()) {
    errors.title = "Vui lòng nhập vị trí công việc";
  } else if (formData.title.trim().length < 3) {
    errors.title = "Vị trí phải có ít nhất 3 ký tự";
  }

  // 2. Validate company (Công ty)
  if (!formData.company || !formData.company.trim()) {
    errors.company = "Vui lòng nhập tên công ty";
  }
  else if (formData.company.trim().length < 3) {
    errors.company = "Tên công ty phải có ít nhất 3 ký tự";
  }

  // 3. Validate location (Địa điểm)
  if (!formData.location || !formData.location.trim()) {
    errors.location = "Vui lòng nhập địa điểm";
  }
  else if (formData.location.trim().length < 3) {
    errors.location = "Địa điểm phải có ít nhất 3 ký tự";
  }

  // 4. Validate salary (Mức lương)
  if (!formData.salary && formData.salary !== 0) {
    errors.salary = "Vui lòng nhập mức lương";
  } else {
    const salaryStr = String(formData.salary).trim();
    if (!salaryStr) {
      errors.salary = "Vui lòng nhập mức lương";
    } else if (isNaN(Number(salaryStr))) {
      errors.salary = "Mức lương phải là số hợp lệ";
    } else if (Number(salaryStr) <= 0) {
      errors.salary = "Mức lương phải lớn hơn 0";
    }
  }

  return errors;
}
