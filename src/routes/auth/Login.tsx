import { Box, Button, Stack, TextField } from "@mui/material";
import { Reveal } from "../../components";
import { useRef, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export function Login() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [adminDetails, setAdminDetails] = useState({ email: "", password: "" });
  const isLoading = false;

  const updateAdminDetails = (propToChange: string, value: string) => {
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      [propToChange]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(adminDetails);
  };

  // useEffect(() => {
  //   const prevPage = location.state?.from?.pathname || "/";
  //   if (success === true) {
  //     window.location.href = prevPage;
  //   }
  // }, [success]);

  const content = isLoading ? (
    // <DefaultLoader loading={isLoading} />
    <>Default Loader</>
  ) : (
    <div className="h-screen w-full flex items-center justify-center">
      <Reveal>
        {/* <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >Email</label>
              <input
                type="email"
                id="email"
              />
            </div>
          </form> */}

        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <Stack>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              />
              <Button variant="contained">Login</Button>
          </Stack>
        </Box>
      </Reveal>
    </div>
  );

  return content;
}
