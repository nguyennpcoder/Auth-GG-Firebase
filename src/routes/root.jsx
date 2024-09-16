import {
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import "./root.css";
import { Outlet, Link, useNavigate, useLocation ,Navigate} from "react-router-dom";
import { useAuth } from "./../main";

export default function Root() {
  let authStore = useAuth();
  
  const logoutPage = () => {
    authStore.signout(navigate("/"));
  };
  return (
    <>
      <div id="sidebar">
        <h1>Contact info phone: 0393204904 
          Gmail: nguyennpcoder@gmail.com</h1>
        
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">News</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={`/DashBoard`}>
                <DashboardOutlined style={{ fontSize: "16px", color: "red" }} />
                DashBoard
              </Link>
            </li>
            <li>
              <Link to={`/Contact`}>
                <SettingFilled style={{ fontSize: "16px", color: "blue" }} />
                Contact
              </Link>
            </li>
            <li>
              <Link to={`/Table`}>
                <SmileOutlined style={{ fontSize: "16px", color: "green" }} />
                List User
              </Link>
            </li>
            <li>
              <Link to={`/ListUser`}>
                <SyncOutlined style={{ fontSize: "16px", color: "black" }} />
                User
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet></Outlet>
      </div>
    </>
  );
}
