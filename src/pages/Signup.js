import React from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";
import { selectAuth } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import SignupForm from "../components/SignupForm";
import Logo from "../components/Logo";
import { motion } from "framer-motion";
import { setAuth } from "../redux/slices/authSlice";

//////////////////////////////////
const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Signup = () => {
  const isAuth = useSelector(selectAuth)

  if (isAuth) return <Navigate to='/' />


  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Enter your details below.
            </Typography>
          </HeadingStyle>

          <SignupForm setAuth={setAuth} />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Signup;
