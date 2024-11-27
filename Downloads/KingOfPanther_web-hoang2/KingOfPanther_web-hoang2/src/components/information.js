import React, { useState } from 'react';
import './information.css';


function RegistrationForm() {
  const [formData, setFormData] = useState({
    ethnicity: '',
    idCard: '',
    issueDate: '',
    issuePlace: '',
    doanvienId: '',
    name: '',
    dob: '',
    gender: '',
    religion: '',
    education: '',
    major: '',
    politicalTheory: '',
    hometownProvince: '',
    hometownDistrict: '',
    hometownWard: '',
    currentJob: '',
    phone: '',
    doanCoso: '',
    itCourse: '',
    foreignLanguage: '',
    documents: []
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const documents = checked
        ? [...prevData.documents, value]
        : prevData.documents.filter((doc) => doc !== value);
      return { ...prevData, documents };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <div className="form-row">
        <div className="form-group avatar-container">
          <div className="avatar-section">
            <img alt="Logo" />
            <button type="button" className="change-avatar">ĐỔI AVATAR</button>
          </div>
          <div className="form-row">
        <div className="form-group">
          <label htmlFor="doanvienId">Mã định danh đoàn viên</label>
          <input type="text" id="doanvienId" value={formData.doanvienId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input type="text" id="name" required value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Ngày Sinh</label>
          <input type="date" id="dob" required value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Giới tính</label>
          <select id="gender" required value={formData.gender} onChange={handleChange}>
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
      </div>
          <div className="form-cccd">
            <div className="form-group">
              <label htmlFor="ethnicity">Dân tộc</label>
              <input id="ethnicity" type="text" value={formData.ethnicity} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="idCard">Chứng minh nhân dân</label>
              <input type="text" id="idCard" required value={formData.idCard} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="issueDate">Ngày cấp</label>
              <input type="date" id="issueDate" required value={formData.issueDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="issuePlace">Nơi cấp</label>
              <input id="issuePlace" type="text" value={formData.issuePlace} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="religion">Tôn giáo</label>
          <input id="religion" type="text" value={formData.religion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="education">Trình độ phổ thông</label>
          <select id="education" value={formData.education} onChange={handleChange}>
            <option value="">Chọn trình độ</option>
            <option value="1">Tốt Nghiệp THPT</option>
            <option value="2">Đại Học</option>
            <option value="3">Cao Đẳng</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="major">Trình độ chuyên môn</label>
          <select id="major" value={formData.major} onChange={handleChange}>
            <option value="">Chọn trình độ chuyên môn</option>
            <option value="1">Thạc Sĩ</option>
            <option value="2">Tiến Sĩ</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="politicalTheory">Lý luận chính trị</label>
          <select id="politicalTheory" value={formData.politicalTheory} onChange={handleChange}>
            <option value="">Chọn lý luận chính trị</option>
            <option value="1">Sơ cấp</option>
            <option value="2">Trung cấp</option>
            <option value="3">Cao cấp</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="hometownProvince">Tỉnh thành</label>
          <input id="hometownProvince" type="text" value={formData.hometownProvince} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hometownDistrict">Quận huyện</label>
          <input id="hometownDistrict" type="text" value={formData.hometownDistrict} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hometownWard">Xã phường</label>
          <input id="hometownWard" type="text" value={formData.hometownWard} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="currentJob">Nghề nghiệp hiện nay</label>
          <select id="currentJob" required value={formData.currentJob} onChange={handleChange}>
            <option value="">Chọn nghề nghiệp</option>
            <option value="1">Giáo Viên</option>
            <option value="2">Quân Nhân</option>
            <option value="3">Sinh Viên</option>
            <option value="4">Công nhân</option>
            <option value="5">Khác</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="phone">Điện thoại</label>
          <input type="tel" id="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="doanCoso">Đoàn cơ sở tiếp nhận</label>
          <select id="doanCoso" required value={formData.doanCoso} onChange={handleChange}>
            <option value="">Đoàn cơ sở Công nghệ thông tin</option>
            <option value="1">Đoàn cơ sở 1</option>
            <option value="2">Đoàn cơ sở 2</option>
            <option value="3">Đoàn cơ sở 3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="itCourse">Trình độ tin học</label>
          <select id="itCourse" value={formData.itCourse} onChange={handleChange}>
            <option value="">Chọn trình độ tin học</option>
            <option value="1">Tin học căn bản</option>
            <option value="2">Tin học nâng cao</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="foreignLanguage">Ngoại ngữ</label>
          <select id="foreignLanguage" value={formData.foreignLanguage} onChange={handleChange}>
            <option value="">Chọn ngoại ngữ</option>
            <option value="1">Tiếng Anh</option>
            <option value="2">Tiếng Pháp</option>
            <option value="3">Tiếng Nhật</option>
            <option value="4">Tiếng Trung</option>
          </select>
        </div>
      </div>

      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="documents" value="cv" onChange={handleCheckboxChange} />
          Lý lịch và đơn xin vào đoàn
        </label>
        <label>
          <input type="checkbox" name="documents" value="report" onChange={handleCheckboxChange} />
          Biên bản họp xét kết nạp đoàn viên của chi đoàn
        </label>
        <label>
          <input type="checkbox" name="documents" value="guarantee" onChange={handleCheckboxChange} />
          Giấy đảm bảo thanh niên vào đoàn
        </label>
        <label>
          <input type="checkbox" name="documents" value="certificate" onChange={handleCheckboxChange} />
          Giấy chứng nhận đã học lớp cảm tình đoàn
        </label>
      </div>

      <button type="submit" className="submit-button">CHUYỂN XỬ LÝ</button>
    </form>
  );
}

export default RegistrationForm;
