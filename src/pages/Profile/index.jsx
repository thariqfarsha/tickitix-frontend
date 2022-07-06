import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../components/BookingCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getUserById } from "../../stores/action/user";
import axios from "../../utils/axios";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.data);

  const [isLoading, setIsLoading] = useState(false);
  const [isTabActive, setIsTabActive] = useState({
    profile: true,
    history: false
  });
  const [isFormEditable, setIsFormEditable] = useState({
    profile: false,
    pwd: false
  });
  const [formProfile, setFormProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    noTelp: user.noTelp
  });
  const [formPwd, setFormPwd] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (isTabActive.history === true) {
      getBookingByUserId();
    }

    return () => {
      setBookings([]);
    };
  }, [isTabActive.history]);

  const handleChangeTab = () => {
    setIsTabActive({
      profile: !isTabActive.profile,
      history: !isTabActive.history
    });
  };

  const handleFormToggle = (e, formName) => {
    e.preventDefault();

    setIsFormEditable({
      ...isFormEditable,
      [formName]: !isFormEditable[formName]
    });
  };

  const handleChangeFormProfile = (e) => {
    const { name, value } = e.target;

    setFormProfile({ ...formProfile, [name]: value });
  };

  const handleChangeFormPwd = (e) => {
    const { name, value } = e.target;

    setFormPwd({ ...formPwd, [name]: value });
  };

  const handleSubmitFormProfile = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const result = await axios.patch(`user/profile/${user.id}`, formProfile);
      await dispatch(getUserById(user.id));
      setIsLoading(false);
      setIsFormEditable({ ...isFormEditable, profile: false });
      resetForm.pwd();
      console.log(result.data.msg);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmitFormPwd = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const result = await axios.patch(`user/password/${user.id}`, formPwd);
      setIsLoading(false);
      setIsFormEditable({ ...isFormEditable, pwd: false });
      resetForm.pwd();
      console.log(result.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = {
    profile: () =>
      setFormProfile({
        firstName: "",
        lastName: "",
        noTelp: ""
      }),
    pwd: () =>
      setFormPwd({
        newPassword: "",
        confirmPassword: ""
      })
  };

  const getBookingByUserId = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(`booking/user/${user.id}`);
      setBookings(result.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <main className="bg-primary-light pb-4">
        <div className="container-lg">
          <div className="row my-4">
            <div className="col-md-3">
              <div
                className="bg-white rounded shadow-sm d-flex flex-column justify-content-center align-items-center px-4 py-5 sticky-md-top"
                style={{ top: 100 }}
              >
                <img
                  src={user.imagePath}
                  alt="profile"
                  className="rounded-circle shadow-sm mb-5"
                  style={{ width: "40%", height: "40%", objectFit: "cover" }}
                />
                <h2 className="h5 fw-semibold">{`${user.firstName} ${user.lastName}`}</h2>
                <p className="text-secondary mb-4">Moviegoers</p>
                <button className="btn btn-outline-primary py-2 w-50">Logout</button>
              </div>
            </div>
            <div className="col-md-9">
              <div className="bg-white rounded shadow-sm mb-4">
                <div
                  className={`d-inline-block mx-4 py-3 ${
                    isTabActive.profile && "border-bottom border-primary border-3"
                  }`}
                  onClick={handleChangeTab}
                  style={{ cursor: "pointer" }}
                >
                  <p className={`mb-0 ${isTabActive.profile && "text-primary"}`}>
                    Account Settings
                  </p>
                </div>
                <div
                  className={`d-inline-block mx-4 py-3 ${
                    isTabActive.history && "border-bottom border-primary border-3"
                  }`}
                  onClick={handleChangeTab}
                  style={{ cursor: "pointer" }}
                >
                  <p className={`mb-0 ${isTabActive.history && "text-primary"}`}>Order History</p>
                </div>
              </div>
              {isTabActive.profile && (
                <>
                  <div className="bg-white rounded p-4 mb-4">
                    <h5 className="fw-semibold">Details Information</h5>
                    <hr className="mb-4" />
                    <form onSubmit={handleSubmitFormProfile}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstName"
                              name="firstName"
                              value={formProfile.firstName}
                              onChange={handleChangeFormProfile}
                              placeholder="Enter your first Name"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastName"
                              name="lastName"
                              value={formProfile.lastName}
                              onChange={handleChangeFormProfile}
                              placeholder="Enter your last Name"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={user.email}
                              placeholder="Enter your email"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              maxLength={13}
                              className="form-control"
                              id="phoneNumber"
                              name="noTelp"
                              value={formProfile.noTelp}
                              onChange={handleChangeFormProfile}
                              placeholder="08XXXXXXXXXX"
                              disabled={!isFormEditable.profile}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          {!isFormEditable.profile ? (
                            <button
                              type="button"
                              className="btn btn-primary py-2 w-50 fw-semibold"
                              onClick={(e) => handleFormToggle(e, "profile")}
                            >
                              Update Profile
                            </button>
                          ) : (
                            <div className="row">
                              <div className="col-md-6">
                                <button
                                  type="submit"
                                  className="btn btn-primary py-2 w-100 fw-semibold"
                                >
                                  {isLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm text-white"
                                      role="status"
                                    >
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                              </div>
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary py-2 w-100"
                                  onClick={(e) => handleFormToggle(e, "profile")}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="bg-white rounded p-4">
                    <h5 className="fw-semibold">Account and Privacy</h5>
                    <hr className="mb-4" />
                    <form onSubmit={handleSubmitFormPwd}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="newPassword"
                              name="newPassword"
                              value={formPwd.newPassword}
                              onChange={handleChangeFormPwd}
                              placeholder="Enter new password"
                              disabled={!isFormEditable.pwd}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formPwd.confirmPassword}
                              onChange={handleChangeFormPwd}
                              placeholder="Confirm your password"
                              disabled={!isFormEditable.pwd}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mt-3">
                          {!isFormEditable.pwd ? (
                            <button
                              type="button"
                              className="btn btn-primary py-2 fw-semibold"
                              onClick={(e) => handleFormToggle(e, "pwd")}
                            >
                              Update Password
                            </button>
                          ) : (
                            <div className="row">
                              <div className="col-md-6">
                                <button
                                  type="submit"
                                  className="btn btn-primary py-2 w-100 fw-semibold"
                                >
                                  {isLoading ? (
                                    <div
                                      className="spinner-border spinner-border-sm text-white"
                                      role="status"
                                    >
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  ) : (
                                    "Save Changes"
                                  )}
                                </button>
                              </div>
                              <div className="col-md-6">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary py-2 w-100"
                                  onClick={(e) => handleFormToggle(e, "pwd")}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
              {isTabActive.history && isLoading ? (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                bookings
                  .sort(
                    (b, a) => new Date(a.dateBooking).getTime() - new Date(b.dateBooking).getTime()
                  )
                  .map((booking) => (
                    <div key={booking.id}>
                      <BookingCard booking={booking} />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
