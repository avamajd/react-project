import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { login, setToken } from "../actions/authActions";
import Validator from "./Validator";
import "./login.scss";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
      // width: 200
    }
  }
}));

const LoginForm = props => {
  const classes = useStyles();

  const [values, setValues] = useState({ phoneNumber: "", otp: "" });
  const [validationMsg, setValidationMsg] = useState("");
  const [notifMsg, setNotifMsg] = useState("");

  const [showOTP, setShowOTP] = useState(false);

  //*************************************
  useEffect(() => {
    if (!Validator.isEmpty(props.auth.username)) {
      setShowOTP(true);
    }
  }, [props.auth.username]);

  //*************************************
  useEffect(() => {
    if (!Validator.isEmpty(props.auth.error)) {
      setValidationMsg(props.auth.error);
    }
    if (!Validator.isEmpty(props.auth.message)) {
      setNotifMsg(props.auth.message);
    }
  }, [props.auth.error, props.auth.message]);

  //*************************************
  useEffect(() => {
    if (!Validator.isEmpty(props.auth.token)) {
      props.history.push("/account");
    }
  }, [props.auth.token]);

  //*************************************
  const handleSendCode = otp => {
    if (otp.length == 6) {
      props.setToken(otp);
    }
  };

  //*************************************
  const handleChange = e => {
    let { name, value } = e.target;

    if (name === "phoneNumber") {
      if (Validator.isEmpty(value) || Validator.isNumber(value)) {
        setValidationMsg("");
      } else {
        value = value.slice(0, -1);
        setValidationMsg("لطفاً تنها مقدار عددی وارد نمایید.");
      }
      setValues({ ...values, [name]: value });
    } else if (name === "otp") {
      if (Validator.isNumber(value) && Validator.isShorterThan(value, 7)) {
        setValidationMsg("");
      } else {
        value = value.slice(0, -1);
      }
      setValues({ ...values, [name]: value });
      handleSendCode(value);
    }
  };

  //*************************************
  const handleBlur = e => {
    let { value } = e.target;
    if (!Validator.isPhoneNumber(value)) {
      setValidationMsg("لطفاً یک شماره موبایل معتبر وارد نمایید.");
    }
  };

  //*************************************
  const handleSubmit = e => {
    e.preventDefault();
    setValidationMsg("");
    props.login(values.phoneNumber);
  };

  //*************************************

  return (
    <Fragment>
      <form
        className={`${classes.root} form`}
        // noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        dir="rtl"
      >
        {showOTP ? (
          <div>
            <TextField
              error={validationMsg !== ""}
              name="otp"
              value={values.otp}
              onChange={handleChange}
              // required
              label="کد تایید"
              dir="rtl"
            />

            {validationMsg ? (
              <div className="validation-msg">
                <span>{validationMsg}</span>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <TextField
              error={validationMsg !== ""}
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              label="شماره تلفن"
              dir="rtl"
            />
            {validationMsg ? (
              <div className="validation-msg">
                <span>{validationMsg}</span>
              </div>
            ) : null}
          </div>
        )}
        {!showOTP ? (
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            value="Submit"
          >
            ورود
          </Button>
        ) : null}
      </form>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, setToken })(LoginForm);
