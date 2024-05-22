import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/redux/modal";
import { updateTask, deleteTask } from "@/services/task";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useNotification from "@/customHook/useNotication";
dayjs.extend(customParseFormat);

export default function TaskDetailModal(props) {
  const showDetailTaskModal = useSelector(
    (state) => state.modal.showDetailTaskModal
  );
  const data = useSelector((state) => state.modal.dataDetailTaskModal);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const handleOk = () => {
    form.submit();
    // dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  async function handleUpdate(values) {
    try {
      console.log(values);
      let { title } = values;
      await updateTask(data?.id, title);
      if (typeof props.onOk == "function") {
        props.onOk();
      }
      infoNotify("topRight", "Thanh Cong Task", data?.id);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      errorNotify("topRight", "that bai task", data?.id);
    }
  }

  const arrStatus = [
    {
      label: "Doing",
      value: true,
    },
    {
      label: "Done",
      value: false,
    },
  ];

  async function handleDeleteTask() {
    try {
      await deleteTask(data?.id);
      if (typeof props.onDelete == "function") {
        props.onDelete();
      }
      infoNotify("topRight", "Thanh Cong Task", data?.id);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      errorNotify("topRight", "that bai task", data?.id);
    }
  }

  useEffect(() => {
    if (data) {
      let date = data?.attributes?.date
        ? dayjs(data?.attributes?.date)
        : undefined;
      form.setFieldsValue({
        title: data?.attributes?.title,
        complete: data?.attributes?.complete,
        date: date,
      });
    }
  }, [data?.attributes, form]);

  return (
    <>
      {contextHolder}
      <Modal
        forceRender
        title={data?.id || "DetailTask"}
        open={showDetailTaskModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" type="dashed" danger onClick={handleDeleteTask}>
            Xoa
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={{
            title: data?.attributes?.title,
            complete: data?.attributes?.complete,
            date: data?.attributes?.date,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item name="title">
            <Input value={data?.attributes?.title}></Input>
          </Form.Item>
          <Form.Item name="complete">
            <Select options={arrStatus}></Select>
          </Form.Item>
          <Form.Item name="date">
            <DatePicker format="YYYY/MM/DD"></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
