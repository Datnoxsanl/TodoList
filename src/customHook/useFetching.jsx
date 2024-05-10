import { useEffect, useRef, useState } from "react";
import axios from "axios";

function useFetching(api) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const Controller = new AbortController();
    isMounted.current = true;
    axios({
      url: api,
    })
      .then((res) => {
        if (isMounted.current) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      Controller.abort();
      isMounted.current = false;
    };
  }, []);

  return { data, error, loading };
}

export default useFetching;
