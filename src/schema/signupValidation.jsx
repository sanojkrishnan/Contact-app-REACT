import * as Yup from "yup";

export const SignupValidation = Yup.object({
  name: Yup.string().min(3).required("Please enter your name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("please enter your email"),
});
