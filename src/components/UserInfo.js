import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./user-info.scss";

const UserInfo = props => {
  const { data } = props;

  const [userData, setuserData] = useState({});

  const userInfoItems = [
    { field: "نام:", value: userData.first_name },
    { field: "نام خانوادگی:", value: userData.last_name },
    { field: "ایمیل:", value: userData.email },
    { field: "تلفن:", value: userData.telephone },
    { field: "موبایل:", value: userData.mobile },
    { field: "کد ملی:", value: userData.national_code }
    // { field: "تاریخ تولد:", value: userData.birthdate }
  ];

  useEffect(() => {
    setuserData(data);
  }, [data]);

  const handleEditClick = () => {
    props.setEditForm && props.setEditForm();
  };

  return (
    <div className="user-info">
      <div className="row no-gutters">
        {userInfoItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="info-item" id={index}>
              <span className="info-title">{item.field}</span>

              <span className="fa-num">{item.value}</span>
            </div>
            {index !== userInfoItems.length - 1 ? (
              <Divider className="divider" />
            ) : null}
          </div>
        ))}
        <div className="col-12">
          <div className="info-button">
            <Button
              variant="contained"
              color="primary"
              className="button"
              onClick={handleEditClick}
            >
              ویرایش پروفایل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
