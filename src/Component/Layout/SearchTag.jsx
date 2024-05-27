import _ from "lodash";
import { Form, Input, Avatar, List } from "antd";
import { useCallback, useEffect, useState } from "react";
import { searchTask } from "@/services/task";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modal";
import ResultTaskList from "./ResultTaskList";
const { VITE_ORIGIN } = import.meta.env;

export default function SearchTask() {
  const [listTask, setListTask] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    function closeSearchPopup(e) {
      setListTask([]);
    }
    window.addEventListener("click", closeSearchPopup);

    return () => {
      window.removeEventListener("click", closeSearchPopup);
    };
  }, []);
  const onChange = useCallback(
    _.debounce(async (e) => {
      let txt = e.target.value.trim();
      try {
        if (txt) {
          let data = await searchTask(txt);
          data = data.data;

          setListTask(data);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000)
  );
  const handleClick = (item) => {
    dispatch(openModal(item));
  };
  // let result =<>

  // </>

  return (
    <Form name="searchTaskForm">
      <div className="board-search">
        <resultTaskList></resultTaskList>
        <Form.Item
          onChange={onChange}
          style={{ marginBottom: 0, position: "relative" }}
        >
          <Input
            type="search"
            className="board-search-input"
            aria-label="Board Search"
            placeholder="Tìm kiếm ..."
          />
        </Form.Item>
        <i className="fas fa-search search-icon" aria-hidden="true"></i>
      </div>
      {listTask.length > 0 ? (
        <ResultTaskList
          listTask={listTask}
          handleItemClick={(e) => {
            e.stopPropagation();
            setListTask([]);
          }}
        />
      ) : null}

    </Form>
  );
}
