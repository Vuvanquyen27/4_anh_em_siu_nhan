// Sidebar Component
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faList, 
  faPlus, 
  faBarsProgress, 
  faCircleExclamation,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Sidebar() {
    const [isNarrow, setIsNarrow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Hàm xử lý toggle sidebar
    const toggleSidebar = () => {
        setIsNarrow(!isNarrow);
        setIsOpen(!isOpen);
    };

    return (
      <nav className={`sidebar ${isNarrow ? 'narrow' : ''} ${isOpen ? 'open' : ''}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img 
                className="logo" 
                src="hackathon-removebg-preview.png"
                alt="logo" 
                style={{
                  width: '70px',
                  height: '50px',
                  objectFit: 'contain'
                }}
              />
            </span>
            <div className="text header-text">
              <span className="name" id="username">Vũ Văn Quyến</span>
              <FontAwesomeIcon 
                icon={faArrowRight} 
                className="toggle icons" 
                onClick={toggleSidebar}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="search-box">
                <FontAwesomeIcon icon={faSearch} />
                <input type="search" placeholder="Search..." />
              </li>
              <li className="menu-nav-link">
                <a href="#">
                  <FontAwesomeIcon icon={faList} />
                  <span id="list" className="text nav-text">Danh sách nhân viên</span>
                </a>
              </li>
              <li className="menu-nav-link">
                <a href="#">
                  <FontAwesomeIcon icon={faPlus} />
                  <span id="add" className="text nav-text">Thêm nhân viên mới</span>
                </a>
              </li>
              <li className="menu-nav-link">
                <a href="#">
                  <FontAwesomeIcon icon={faBarsProgress} />
                  <span className="text nav-text">Quản lý hợp đồng</span>
                </a>
              </li>
              <li className="menu-nav-link">
                <a href="#">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  <span className="text nav-text">Báo cáo và thống kê nhân sự</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Sidebar               