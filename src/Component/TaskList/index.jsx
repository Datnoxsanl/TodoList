import { Skeleton, Pagination, Form, Input, Space, Avatar, Row } from "antd";
import useFetching from "@/customHook/useFetching";
import Render from "@/common/renderHelp";
import {
  CloseOutlined,
  ReloadOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Upload } from "antd";
import { addImgTask, createTask, getTasks } from "../../services/task";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modal";
import TaskDetailModal from "../Modals/TaskDetail";
import useNotification from "@/customHook/useNotication";
import { beforeUpload } from "@/common/imageHelper";
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
      var newTask = await createTask(title);
      newTask = newTask.data;
      await addImgTask(uploadImageObj.fileOriginObj, newTask?.id);
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

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const [uploadImageObj, setUploadImageObj] = useState({
    base64: "",
    fileOriginObj: null,
  });
  const handleChangeImg = (info) => {
    let errorMessage = beforeUpload(info.file);
    if (errorMessage) {
      errorNotify("topRight", "File ảnh không hợp lệ", errorMessage);
      return;
    }
    getBase64(info.file, (url) => {
      setUploadImageObj({
        base64: url,
        fileOriginObj: url.file,
        // info.fileList[0].originFileObj
      });
    });
  };
  const inputNew = (
    <Form onFinish={handleAddNew} form={form}>
      <Space>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          beforeUpload={beforeUpload}
          onChange={handleChangeImg}
        >
          {uploadImageObj.base64 ? (
            <img
              src={uploadImageObj.base64}
              alt="avatar"
              style={{
                width: "100%",
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
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
                      <Row align="middle" justify="space-between">
                        <Avatar
                          src={`https://backoffice.nodemy.vn${item?.attributes?.image?.data?.attributes?.url}`}
                        ></Avatar>
                        {item?.attributes?.title}
                        <DeleteOutlined
                          onClick={async (e) => {
                            try {
                              e.stopPropagation();
                              await deleteTask(item?.id);
                              infoNotify(
                                "topRight",
                                "Xoa thanh cong",
                                `task ${item?.id}`
                              );
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
                      </Row>
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
