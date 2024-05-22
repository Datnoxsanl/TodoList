import { Button, Result, Spin } from "antd";
function Render(
  loading,
  error,
  element,
  btnElement = <Button type="primary">Back Home</Button>
) {
  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={btnElement}
      />
    );
  }

  return (
    <Spin tip="Loading" size="large" spinning={loading}>
      {element}
    </Spin>
  );
}

export default Render;
