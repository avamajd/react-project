import React, { useState, useEffect } from "react";
import "./user-edit-form.scss";
import { Formik, Form, ErrorMessage } from "formik";
// import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { editUserInfo } from "../actions/profileActions";
// import moment from "moment-jalaali";

const UserEditForm = props => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  //*************************************
  const handleClick = () => {
    props.unsetEditForm && props.unsetEditForm();
  };

  //*************************************
  const {
    first_name,
    last_name,
    email,
    telephone,
    mobile,
    national_code
  } = props.data;

  return (
    <div className="profile-form">
      <Formik
        initialValues={{
          first_name,
          last_name,
          email,
          telephone,
          mobile,
          national_code
        }}
        validate={values => {
          let errors = {};
          //**************************************
          if (!values.first_name) {
            errors.first_name = "لطفاً نام خود را وارد نمایید.";
          } else if (!/(^\s*)[A-Zآ-ی]+(\s*$)/i.test(values.first_name)) {
            errors.first_name = "نام واردشده معتبر نیست.";
          } else {
            let first_name = values.first_name
              .split(/\s+/)
              .filter(n => n !== "");
            setName(first_name);
          }
          //**************************************
          if (!values.last_name) {
            errors.last_name = "لطفاً نام خانوادگی خود را وارد نمایید.";
          } else if (!/(^\s*)[A-Zآ-ی]+(\s*$)/i.test(values.last_name)) {
            errors.last_name = "نام خانوادگی واردشده معتبر نیست.";
          } else {
            let last_name = values.last_name.split(/\s+/).filter(n => n !== "");
            setLastname(last_name);
          }
          //**************************************
          if (!values.email) {
            errors.email = "لطفاً ایمیل خود را وارد نمایید.";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "ایمیل وارد شده معتبر نیست.";
          }
          //**************************************
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { mobile, ...data } = values;

          props.editUserInfo(props.token, data);
          props.unsetEditForm && props.unsetEditForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          //   handleBlur,
          //   handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <div className="row no-gutters px-4">
              <div className="col-12">
                <TextField
                  error={errors.first_name && touched.first_name}
                  id="first_name"
                  label="نام"
                  name="first_name"
                  value={values.first_name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  dir="rtl"
                  className={`col`}
                />
                <ErrorMessage
                  className="error-msg"
                  name="first_name"
                  component="div"
                />
              </div>

              <div className="col-12">
                <TextField
                  error={errors.last_name && touched.last_name}
                  id="last_name"
                  label="نام خانوادگی"
                  name="last_name"
                  value={values.last_name}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  dir="rtl"
                  className={`col`}
                />
                <ErrorMessage
                  className="error-msg"
                  name="last_name"
                  component="div"
                />
              </div>

              <div className="col-12">
                <TextField
                  error={errors.email && touched.email}
                  id="email"
                  label="ایمیل"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  className={`col`}
                />
                <ErrorMessage
                  className="error-msg"
                  name="email"
                  component="div"
                />
              </div>

              <div className="col-12">
                <TextField
                  error={errors.telephone && touched.telephone}
                  id="telephone"
                  label="شماره تلفن"
                  name="telephone"
                  value={values.telephone}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  className={`col`}
                />
              </div>

              <div className="col-12">
                <TextField
                  disabled={true}
                  error={errors.mobile && touched.mobile}
                  id="mobile"
                  label="شماره موبایل"
                  name="mobile"
                  value={values.mobile}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  className={`col`}
                />
              </div>

              <div className="col-12">
                <TextField
                  error={errors.national_code && touched.national_code}
                  id="national_code"
                  label="شماره ملی"
                  name="national_code"
                  value={values.national_code}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                  type="text"
                  className={`col`}
                />
              </div>

              <div className="col-12">
                <div className="buttons">
                  <Button className="cancel-button" onClick={handleClick}>
                    انصراف
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="confirm-button"
                  >
                    تایید ویرایش
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps, { editUserInfo })(UserEditForm);
