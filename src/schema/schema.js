import * as yup from "yup";

export const applicantSchema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters long").required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
});


export const loginSchemaUser = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required"),
});
