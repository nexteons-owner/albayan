import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useAuth from "./global/auth/useAuth";
import useNetwork from "./global/network/useNetwork";
import "./App.css";

function App() {
  const { login } = useAuth();
  const { online } = useNetwork();
  const [username, setUserName] = useState<string>("naifmed");
  const [password, setPassword] = useState<string>("nmc@2018");

  return (
    <Stack>
      {username}
      {online ? "online" : "offline"}
      <TextField onChange={(e) => setUserName(e?.target?.value)} />
      <TextField onChange={(e) => setPassword(e?.target?.value)} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          login(username, password);
        }}
      >
        submit
      </Button>
    </Stack>
  );
}

export default App;
