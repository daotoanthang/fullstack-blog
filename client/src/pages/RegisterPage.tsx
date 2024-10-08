import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../components/input/InputPassword";
import Label from "../components/label/Label";
import Input from "../components/input/Input";

/// react hook form
import { useForm, Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// call api
import { registerUser } from "../redux/apiRequest";
import { toast } from "react-toastify";

type Props = {};
type FormValues = {
  fullname: string;
  email: string;
  password: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const err = useSelector((state: any) => state.auth.register.message);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((user) =>
    registerUser(user, dispatch, navigate)
  );
  useEffect(() => {
    if (err) {
      toast.error(err);
    }
  }, []);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="fullname"> Fullname</Label>
            <div className="mt-2">
              <Input
                {...register("fullname")}
                name="fullname"
                type="text"
                className=""
              />
              {errors?.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="email"> Email</Label>
            <div className="mt-2">
              <Input
                {...register("email")}
                name="email"
                type="email"
                className=""
              />
              {errors?.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="mt-2">
              <InputPassword {...register("password")} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          You already have an account?
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
