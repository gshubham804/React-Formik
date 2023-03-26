import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "Shubham",
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
const FormikComponent = () => {
  //   console.log(formik.values);
  //   console.log(formik.touched)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="text" name="name" id="name" />
        <ErrorMessage name="name" />
        <label htmlFor="email">E-mail</label>
        <Field type="email" name="email" id="email" />
        <ErrorMessage name="email" />
        <label htmlFor="channel">Channel</label>
        <Field type="text" name="channel" id="channel" />
        <ErrorMessage name="channel" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikComponent;
