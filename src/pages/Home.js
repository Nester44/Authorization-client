import { Button, Typography, Container, ButtonGroup } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import UsersTable from "../components/UsersTable";
import styled from "@emotion/styled";



import { getUsers, logout, selectUserName, selectUsers } from "../redux/slices/authSlice";
//////////////////////////////////////
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const Home = () => {
  const username = useSelector(selectUserName)
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <RootStyle>
      <Container
        maxWidth="lg"
        sx={{
          background: 'white',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "80vh",
          borderRadius: '10px'
        }}
      >
        <Typography sx={{ justifySelf: 'start' }} variant="h2">
          {`Hello, ${username}`}
        </Typography>
        <ButtonGroup variant="text" color="primary" aria-label="">
          <Button size="large" variant="outlined" onClick={logoutHandler}>
            Log out
          </Button>

        </ButtonGroup>
        <UsersTable users={users} />
      </Container>
    </RootStyle>
  );
};
export default Home;
