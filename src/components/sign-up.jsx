import "../App.css";
import { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import Input from "./common/Input";
import { useFormik } from "formik";
import Joi from "joi";
import validateUseFormikJoi from "../utils/formikValidateJoi";
// import { createUser } from "../services/usersService";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

function SignUp({ redirect }) {
  const { user, createUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: validateUseFormikJoi({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(2).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: false });
        toast.success("signUp success!", {
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
      <PageHeader title='signUp Page' description='this is page description' />

      <form noValidate autoComplete='off' onSubmit={form.handleSubmit}>
        {error && <div className='alert alert-danger'>{error}</div>}
        <Input
          label='name'
          type='text'
          error={form.touched.name && form.errors.name}
          {...form.getFieldProps("name")}
        />
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
