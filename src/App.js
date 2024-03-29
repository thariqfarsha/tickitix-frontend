import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import MovieDetails from "./pages/MovieDetails";
import Unauthorized from "./pages/Unauthorized";
import ListMovie from "./pages/ListMovie";
import Ticket from "./pages/Ticket";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./helpers/route/PrivateRoute";
import PublicRoute from "./helpers/route/PublicRoute";
import ManageMovie from "./pages/ManageMovie";
import ManageSchedule from "./pages/ManageSchedule";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<MovieDetails />} />
        <Route path="list-movie" element={<ListMovie />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PublicRoute restricted={true} />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:id" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-movie" element={<ManageMovie />} />
          <Route path="manage-schedule" element={<ManageSchedule />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
          <Route path="booking/id/:id" element={<Ticket />} />
          <Route path="user/:id" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
