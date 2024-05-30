import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import SearchTag from "./SearchTag";
import { useEffect, useState } from "react";
import { warningTasksThunk } from "@/redux/taskList/thunk";
import {LogoutOutlined} from '@ant-design/icons'
import ResultTaskList from "./ResultTaskList";
import { logout } from "@/redux/auth";
import { useNavigate } from "react-router-dom";
function Header() {
  const [showWarning, setShowWarning] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const warningTasks = useSelector((state) => {
    state.taskList.warningTasks;
  });
  useEffect(() => {
    dispatch(warningTasksThunk());
  }, []);
  function handleLogout() {
    dispatch(logout());
    nav('/login');
    console.log('logout')
  }
  return (
    <>
      <header className="masthead">
        <div className="boards-menu">
          <button className="boards-btn btn">
            <i className="fab fa-trello boards-btn-icon"></i>Boards
          </button>
          <SearchTag></SearchTag>
        </div>
        <div className="logo">
          <h1>
            <i className="fab fa-trello logo-icon" aria-hidden="true"></i>
            TodoList Pro
          </h1>
        </div>
        <div className="user-settings">
          <button className="user-settings-btn btn" aria-label="Create">
            <i className="fas fa-plus" aria-hidden="true"></i>
          </button>
          <button
            className="user-settings-btn btn"
            aria-label="Information"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            {/* <i className="fas fa-info-circle" aria-hidden="true"></i> */}
          </button>
          <button
            className="user-settings-btn btn"
            aria-label="Notifications"
            onClick={() => {
              setShowWarning(!showWarning);
            }}
          >
            <i className="fas fa-bell" aria-hidden="true"></i>
            <span>{warningTasks?.length}</span>
          </button>
          {showWarning ? (
            <ResultTaskList
              handleItemClick={() => {
                setShowWarning(false);
              }}
              listTask={warningTasks}
              style={{
                right: "50px",
              }}
            />
          ) : null}
          <Tooltip title={user?.username}>
            <button
              className="user-settings-btn btn"
              aria-label="User Settings"
            >
              <i className="fas fa-user-circle" aria-hidden="true"></i>
            </button>
          </Tooltip>
        </div>
      </header>
    </>
  );
}

export default Header;
