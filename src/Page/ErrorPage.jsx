import { Button, Result } from "antd";
import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <Result
        status={error.status}
        title={error.status}
        subTitle={error.message}
        extra={<Button type="primary">Back Home</Button>}
      />
    </>
  );
}
