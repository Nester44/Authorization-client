import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { checkAuth, selectAuth, selectLoading } from "./redux/slices/authSlice";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)
  const isLoading = useSelector(selectLoading)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (isLoading) return (
    <>
      <CssBaseline>
        <Loader />
      </CssBaseline>
    </>
  )
  console.log(location);
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            isAuth ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </>
  );
}


export default App;
