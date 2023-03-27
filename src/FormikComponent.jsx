import React,{useState} from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "Shubham",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const savedValues = {
  name: "Shubham",
  email: "s@gmail.com",
  channel: "shubh",
  comments: "shbham",
  address: "Ghazipur",
  social: {
    facebook: "techphobia",
    twitter: "tecphobia",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values,onSubmitProps) => {
  console.log(onSubmitProps);
  console.log("Form data", values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const FormikComponent = () => {
  //   console.log(formik.values);
  //   console.log(formik.touched)
  const[formValues,setFormValues]=useState(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
      // validateOnBlur={false}
      // validateOnChange={false}
    >
      {(formik) => {
        return (
          <Form>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component={TextError} />

            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email">
              {(errormsg) => <div>{errormsg}</div>}
            </ErrorMessage>

            <label htmlFor="channel">Channel</label>
            <Field type="text" name="channel" id="channel" />
            <ErrorMessage name="channel" />
            <Field
              as="textarea"
              type="text"
              name="comments"
              id="comments"
              validate={validateComments}
            />
            <ErrorMessage name="comments" component={TextError} />
            <FastField type="text" name="address" id="address">
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </FastField>

            <Field type="text" name="social.facebook" id="facebook" />
            <Field type="text" name="social.twitter" id="twitter" />
            <Field type="text" name="phoneNumbers[0]" id="primaryPh" />
            <Field type="text" name="phoneNumbers[1]" id="secondaryPh" />
            <label>Lsit of Phone Numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values;
                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field name={`phNumbers[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              visited comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              visited all
            </button>
            <button type="button" onClick={()=>setFormValues(savedValues)}>Load saved data</button>
            <button type="reset">Reset</button>
            {/* !formik.dirty && fromik.isvalid */}
            <button type="submit"
            //  disabled={!(formik.isValid)}>
            disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormikComponent;
