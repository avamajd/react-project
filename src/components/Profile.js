import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import UserEditForm from "./UserEditForm";
import { getUserInfo } from "../actions/profileActions";
import { logout } from "../actions/authActions";
import "./profile.scss";
import Button from "@material-ui/core/Button";

const Profile = props => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let { token } = props;
    props.getUserInfo(token);
  }, []);

  //*************************************
  useEffect(() => {
    setUserInfo(props.data);
  }, [props.data]);

  //*************************************
  const [showForm, setShowForm] = useState(false);

  const handleSetEditForm = () => {
    setShowForm(true);
  };

  const handleUnsetEditForm = () => {
    setShowForm(false);
  };

  //*************************************
  const handleLogoutClick = () => {
    props.logout();
    props.history.push("/");
  };

  //*************************************
  return (
    <div className="profile">
      <div className="row no-gutters justify-content-center">
        <div className="col-4"></div>
        <div className="col-4">
          <div className="profile-body">
            {!showForm ? (
              <UserInfo setEditForm={handleSetEditForm} data={userInfo} />
            ) : (
              <UserEditForm
                unsetEditForm={handleUnsetEditForm}
                data={userInfo}
              />
            )}
          </div>
        </div>

        <div className="col-4">
          <div className="logout-button">
            <Button
              variant="outlined"
              color="primary"
              className="button"
              onClick={handleLogoutClick}
            >
              خروج
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.profile.data,
  token: state.auth.token
});

export default connect(mapStateToProps, { getUserInfo, logout })(Profile);
