import "../App.css";
import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Input from "./common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateUseFormikJoi from "../utils/formikValidateJoi";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

function SignIn({ redirect }) {
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateUseFormikJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    }),
    async onSubmit(values) {
      try {
        await login(values);
        toast.success("sign is success!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (redirect) {
          navigate(redirect);
        }
      } catch ({ response }) {
        if (response?.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <PageHeader
        title='sign-In Page'
        description='Hi! please insert your Email and password to sign in Home page'
      />
      {/* <button onClick={logout}>logout</button>
      <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <form noValidate autoComplete='off' onSubmit={form.handleSubmit}>
        {error && <div className='alert alert-danger'>{error}</div>}
        <Input
          label='email'
          type='email'
          error={form.touched.email && form.errors.email}
          {...form.getFieldProps("email")}
        />
        <Input
          label='password'
          type='password'
          error={form.touched.password && form.errors.password}
          {...form.getFieldProps("password")}
        />
        <div className='my-2'>
          <button disabled={!form.isValid} className='buttons'>
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignIn;
