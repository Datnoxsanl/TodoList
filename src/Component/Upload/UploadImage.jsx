import useNotification from "@/customHook/useNotication";
import { Upload } from "antd";
import { beforeUpload, getBase64 } from "@/common/imageHelper";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
export default function UploadImage(props) {
  const { contextHolder, infoNotify, errorNotify } = useNotification();
  const [uplaodImageObj, setUploadImageObj] = useState({
    base64: props.initSrc || "",
    fileOriginObj: null,
  });
  useEffect(() => {
    setUploadImageObj({ ...uplaodImageObj, base64: props.initSrc });
  }, [props.initSrc]);
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
      props.setImg({
        base64: url,
        fileOriginObj: info.fileList[0].originFileObj,
      });
    });
  };

  const uploadComponent = (
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
  );
  return (
    <>
      {contextHolder}
      {uploadComponent}
    </>
  );
}
