import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "Vishwas",
  email: "",
  channel: "",
};

const onSubmit = (values) => {
  console.log("Form data", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});
const Form = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  //   console.log(formik.values);
  //   console.log(formik.touched)

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          name="channel"
          id="channel"
          {...formik.getFieldProps("channel")}
        />
        {formik.touched.channel && formik.errors.channel ? (
          <div>{formik.errors.channel}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
