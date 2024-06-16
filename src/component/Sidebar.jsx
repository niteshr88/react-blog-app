import { useState } from "react";


const  Sidebar =() => {
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container-fluid mt-3">
      
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sd-header">
        
          <div className="btn btn-primary" onClick={toggleSidebar}>
            <i className="fa fa-times"></i>
          </div>
        </div>
        <div className="sd-body">
          <ul>
          <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Skills</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                    
          </ul>
        </div>
      </div>
      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={toggleSidebar}></div>
    </div>
  );
};

export default Sidebar