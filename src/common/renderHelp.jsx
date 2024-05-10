import { Button, Result, Spin } from "antd";
function Render(loading, error, element) {
  if (error) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
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
