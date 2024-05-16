import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function PrivateRouter(props) {
  const user = useSelector((state) => state.auth.user);
  const roleUser = user?.role?.name;

  switch (props.role) {
    case "authenticatedCheck":
        if(roleUser == 'managerCheck'|| roleUser == 'authenticatedCheck'){
            return props.children
        }
      break;
    case "managerCheck":
        if(roleUser == 'managerCheck'){
            return props.children
        }
      break;
  }
  return <>
   <Navigate to='/login'></Navigate>
  </>;
}
