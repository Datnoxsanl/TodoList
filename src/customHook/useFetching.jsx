import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FETCH_DATA } from "../common/errorCode";
import { useSelector } from "react-redux";

function useFetching(api) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const countReloadFetching = useSelector(state=>state.modal.countReloadFetching)
  const [page, setPage] = useState({
    page: 1,
    pageSize: 15,
    pageCount: 5,
    total: 30,
  });
  const isMounted = useRef(true);

  function loadPage(page, pageSize) {
    setLoading(true);
    setPage((pre) => {
      return { ...pre, page: page, pageSize: pageSize };
    });
  }

  const [count, setCount] = useState(0);

  function reload() {
    setLoading(true);
    setCount(count + 1);
    setError(null);
  }

  useEffect(() => {
    const Controller = new AbortController();
    isMounted.current = true;
    // axios({
    //   url: `${api}?=&pagination[pageSize]=${page.pageSize}&pagination[page]=${page.page}`,
    //   signal:Controller.signal
    // })
    api(page.page, page.pageSize, Controller.signal)
      .then((data) => {
        if (isMounted.current) {
          setPage({ ...data.meta.pagination });
          setData(data.data);
          setLoading(false);
          setError(null);
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(FETCH_DATA);
          setLoading(false);
        }
      });

    return () => {
      Controller.abort();
      isMounted.current = false;
    };
  }, [api, page.page, page.pageSize, count,countReloadFetching]);

  return { data, error, loading, loadPage, page, reload };
}

export default useFetching;

// function nextPage() {
//   if (page.page < page.pageCount) {
//     setLoading(true);
//     setPage((prev) => {
//       return { ...prev, page: prev.page + 1 };
//     });
//   }
// }
// function prevPage() {
//   if (page.page > 1) {
//     setLoading(true);
//     setPage((prev) => {
//       return { ...prev, page: prev.page - 1 };
//     });
//   }
// }
