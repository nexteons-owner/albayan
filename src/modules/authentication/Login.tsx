import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import PageContainer from "../../global/layouts/pageContainer";

import {
  Scheckbox,
  StextField,
  SformLabel,
} from "../../components/customUiControls";
import useAuth from "../../global/auth/useAuth";

import img1 from "../../assets/images/svg/login-bg.svg";

const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const { login } = useAuth();
  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid
        container
        spacing={0}
        sx={{ height: "100vh", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          sx={{
            background: (theme) =>
              `${theme.palette.mode === "dark" ? "#1c1f25" : "#ffffff"}`,
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                position: {
                  xs: "relative",
                  lg: "absolute",
                },
                height: { xs: "auto", lg: "100vh" },
                right: { xs: "auto", lg: "-50px" },
                margin: "0 auto",
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: "100%",
                  maxWidth: "812px",
                }}
              />
            </Box>

            <Box
              sx={{
                p: 4,
                position: "absolute",
                top: "0",
              }}
            >
              {/* <LogoIcon /> */}
              Logo
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
          <Grid container spacing={0} display="flex" justifyContent="center">
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  p: 4,
                }}
              >
                <Typography fontWeight="700" variant="h2">
                  Welcome to Flexy
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="500"
                    sx={{
                      mr: 1,
                    }}
                  >
                    New to Flexy?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/auth/register"
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Create an account
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  <SformLabel htmlFor="email">Email Address</SformLabel>
                  <StextField
                    id="email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setLoginInfo((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                  <SformLabel htmlFor="password">Password</SformLabel>
                  <StextField
                    id="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    sx={{
                      mb: 3,
                    }}
                    onChange={(e) =>
                      setLoginInfo((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        sm: "flex",
                        lg: "flex",
                      },
                      alignItems: "center",
                    }}
                  >
                    <FormGroup>
                      <FormControlLabel
                        control={<Scheckbox defaultChecked />}
                        label="Remeber this Device"
                        sx={{
                          mb: 2,
                        }}
                      />
                    </FormGroup>
                    <Box
                      sx={{
                        ml: "auto",
                      }}
                    >
                      <Typography
                        component={Link}
                        to="/auth/reset-password"
                        fontWeight="500"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          mb: "16px",
                          color: "primary.main",
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={() => {
                      console.log("working");
                      try {
                        login(loginInfo.username, loginInfo.password);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                    sx={{
                      pt: "10px",
                      pb: "10px",
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
