import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "@/redux/modal";
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);



export default function TaskDetailModal() {
  const showDetailTaskModal = useSelector(state=> state.modal.showDetailTaskModal)
  const data = useSelector(state=> state.modal.dataDetailTaskModal)

 const dispatch = useDispatch()


  const handleOk = () => {
   dispatch(closeModal())
  };

  const handleCancel = () => {
   dispatch(closeModal())
  };
 const [form] = Form.useForm();
 function onFinish(values){
        
 }
  useEffect(()=>{
    let date = data?.attributes?.date ? dayjs(data?.attributes?.date) : undefined;
    form.setFieldsValue({
      title: data?.attributes?.title,
      complete: data?.attributes?.complete,
      date: date
    })
  },[data?.attributes,form])
  const arrStatus = [{ 
    label:'Doing',
    value: true,
  },{
    label:'Done',
    value: false,
  }]
  return (
    <>
      <Modal
      forceRender
        title={data?.id}
        open={showDetailTaskModal}
        onOk={handleOk}
        onCancel={handleCancel}
        onFinish={onFinish}
      >
        <Form>
          <Form.Item name = "title">
            <Input></Input>
          </Form.Item>
          <Form.Item name="complete">
            <Select options={arrStatus}></Select>
          </Form.Item>
          <Form.Item name="date">
            <DatePicker></DatePicker>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
