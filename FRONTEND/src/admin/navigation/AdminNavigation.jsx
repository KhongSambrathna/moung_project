import { Link,useNavigate  } from 'react-router-dom';

function AdminNavigation() {
    const navigate = useNavigate();

    // Logout function
    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem("authToken");
        // Redirect to the login page
        navigate("/auth");
        //Reload page
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-white nav-shadow koulen">
            <div className="container">
                <Link to={"/admin/editor"} className="nav-link text-primary">ទំព័រដើម</Link>
                <button className="navbar-toggler border-primary btn" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to={"/admin/editor"} className="nav-link text-primary">ពត៍មាន</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link to={"#"} className="nav-link text-primary dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                បាល់ទាត់
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={"/admin/test"} className="dropdown-item">កីឡាករ</Link>
                                <Link to={"/admin/test"} className="dropdown-item">ចំណាត់ថ្នាក់កីឡាករ</Link>
                                <Link to={"/admin/test"} className="dropdown-item">ប្រវត្តិប្រកួត</Link>
                                {/* <div className="dropdown-divider"></div> */}
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin/test"} className="nav-link text-primary">អំពីអនុ.មោង</Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={handleLogout} className="nav-link text-danger">ចាកចេញ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavigation;
