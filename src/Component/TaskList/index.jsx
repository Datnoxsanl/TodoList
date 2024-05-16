import { Skeleton, Pagination, Form, Input, Space } from "antd";
import useFetching from "@/customHook/useFetching";
import Render from "@/common/renderHelp";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { createTask, getTasks } from "../../services/task";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modal";
import TaskDetailModal from "../Modals/TaskDetail";

function TaskList(Props) {
  const dispatch = useDispatch()
  const { data, loading, error, loadPage, page, reload } =
    useFetching(getTasks);
  const [form] = Form.useForm();
  const [showAdd, setShowAdd] = useState(false);
  const pendingApi = useRef(null);
  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };
  const onFinish = async (value) => {
    try {
      let { title } = value;
      form.resetFields();
      pendingApi.current.disabled = true;
      await createTask(title);
      pendingApi.current.disabled = false;
      reload();
      setShowAdd(false);
    } catch (error) {
      pendingApi.current.disabled = false;
      console.log(error);
    }
  };
  const inputNew = (
    <Form onFinish={onFinish} form={form}>
      <Space>
        <Form.Item name="title" style={{ marginBottom: 0 }}>
          <Input placeholder="Enter Task Title"></Input>
        </Form.Item>
        <Button ref={pendingApi} type="primary" htmlType="submit">
          Add
        </Button>
        <CloseOutlined onClick={toggleAdd}></CloseOutlined>
      </Space>
    </Form>
  );

  const element = (
    <>
    <TaskDetailModal/>
      <div className="list">
        <h3 className="list-title">{Props.title}</h3>
        <Pagination
          showSizeChanger
          current={page.page}
          total={page.total}
          onChange={(page, pageSize) => {
            loadPage(page, pageSize);
          }}
        />
        <ul className="list-items">
          {loading
            ? Array(10)
                .fill(0)
                .map((item, index) => <Skeleton key={index} active></Skeleton>)
            : data
                ?.sort((task1, task2) => {
                  let date1 = new Date(task1.attributes.createdAt);
                  let date2 = new Date(task2.attributes.createdAt);
                  if (date1 < date2) {
                    return -1;
                  }
                  if (date1 > date2) {
                    return 1;
                  }
                  if ((date1 = date2)) {
                    return 0;
                  }
                })
                .map((item) => {
                  return <li key={item.id} onClick={()=>{
                    dispatch(openModal(item))
                  }}>{item?.attributes?.title}</li>;
                })}
        </ul>
        {showAdd ? inputNew : null}
        <button className="add-card-btn btn" onClick={toggleAdd}>
          Add a card
        </button>
      </div>
    </>
  );

  let btnReload = (
    <Button
      icon={<ReloadOutlined />}
      onClick={() => {
        reload();
      }}
    >
      Reload
    </Button>
  );
  return Render(loading, error, element, btnReload);
}

export default TaskList;
