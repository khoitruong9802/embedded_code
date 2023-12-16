import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useDispatch, useSelector } from "react-redux";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserServices";
import { resetUser } from "./redux/slices/UserSlices";
import { updateUser } from "./redux/slices/UserSlices";
import Loading from "./components/LoadingComponent/Loading";

function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);
  // console.log("process.env:", process.env.REACT_APP_API_URL);
  // const fetchApi = async () => {
  //   const res = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/user/sign-up`
  //   );
  //   console.log("res", res);
  // };
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let storageData = localStorage.getItem("access_token");
  //   if (storageData && isJsonString(storageData)) {
  //     storageData = JSON.parse(storageData);
  //     const decoded = jwt_decode(storageData);
  //     console.log("decode:", decoded);
  //     if (decoded?.id) {
  //       handleGetDetailsUser(decoded?.id, storageData);
  //     }
  //   }
  // }, []);
  // const handleGetDetailsUser = async (id, token) => {
  //   try {
  //     const res = await UserService.getDetailsUser(id, token);
  //     console.log("res", res);
  //     dispatch(updateUser({ ...res?.data, access_token: token }));
  //   } catch (error) {}
  // };

  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwt_decode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storageRefreshToken);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refreshToken: refreshToken,
      })
    );
  };

  return (
    <div>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
    </div>
  );
}
export default App;
