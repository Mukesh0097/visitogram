import React,{useEffect,useState} from "react";
import ErrorModal from "../../shared/component/ErrorModal";
import LoadingSpinner from "../../shared/component/LoadingSpinner";
import UserList from "../component/userList";
import {useHttpsClient} from '../../shared/hook/http-hook.js'


const Users = ()=>{
    // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const {isLoading ,error, sendRequest , clearError} = useHttpsClient();

  useEffect(() => {
    const Request = async () => {
      // setIsLoading(true);
      try {
        const response = await sendRequest(process.env.REACT_APP_BACKEND_URL+'/users');

        // const responseData = await response.json();

        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }

        setLoadedUsers(response.users);
      } catch (err) {
        // setError(err.message);
      }
      // setIsLoading(false);
    };
    Request();
  }, [sendRequest]);

  // const errorHandler = () => {
  //   setError(null);
  // };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;