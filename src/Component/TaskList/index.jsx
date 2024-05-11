import { Skeleton, Pagination } from "antd";
import useFetching from "@/customHook/useFetching";
import Render from "@/common/renderHelp";
// import { element } from "prop-types";
import { ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

function TaskList(Props) {
  const { data, loading, error, loadPage, page,reload } = useFetching("/tasks");

  const element = (
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
          : data?.map((item) => {
              return <li key={item.id}>{item?.attributes?.title}</li>;
            })}
      </ul>
      <button className="add-card-btn btn">Add a card</button>
    </div>
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
