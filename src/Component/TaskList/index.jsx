import { Skeleton, Pagination, Form, Input, Space } from "antd";
import useFetching from "@/customHook/useFetching";
import Render from "@/common/renderHelp";
import {
  CloseOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { createTask, getTasks } from "../../services/task";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modal";
import TaskDetailModal from "../Modals/TaskDetail";
import useNotification from "@/customHook/useNotication";
function TaskList(Props) {
  const dispatch = useDispatch();
  const { data, loading, error, loadPage, page, reload } =
    useFetching(getTasks);
  const [form] = Form.useForm();
  const [showAdd, setShowAdd] = useState(false);
  const pendingApi = useRef(null);
  const { contextHolder, infoNotify, errorNotify } = useNotification();

  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };
  async function handleAddNew(values) {
    try {
      let { title } = values;
      form.resetFields();
      pendingApi.current.disabled = true;
      await createTask(title);
      pendingApi.current.disabled = false;
      reload();
      setIsAddNew(false);
    } catch (error) {
      console.log("loi", error);
    }
  }
  function handleOpenModal(task) {
    dispatch(openModal(task));
  }
  const inputNew = (
    <Form onFinish={handleAddNew} form={form}>
      <Space>
        <Form.Item name="title" style={{ marginBottom: 0 }}>
          <Input placeholder="Enter Task Title"></Input>
        </Form.Item>
        <Button ref={pendingApi} type="primary" htmlType="submit">
          Add
        </Button>
        <CloseOutlined onClick={toggleAdd} />
      </Space>
    </Form>
  );

  const element = (
    <>
      {contextHolder}
      <TaskDetailModal
        onOk={() => {
          reload();
        }}
        onDelete={() => {
          reload;
        }}
      />
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
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        handleOpenModal(item);
                      }}
                    >
                      <DeleteOutlined
                        onClick={async (e) => {
                          try {
                            e.stopPropagation();
                            await deleteTask(item?.id);
                            infoNotify('topRight','Xoa thanh cong',`task ${item?.id}`)
                            reload();
                          } catch (error) {
                            errorNotify(
                              "topRight",
                              "Không thành công",
                              `Xoá taskID ${item?.id}`
                            );
                          }
                        }}
                      />
                      {item?.attributes?.title}
                    </li>
                  );
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
