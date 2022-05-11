import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasicCounter from "./pages/basic/Counter/classComponent";
import BasicReact from "./pages/basic/React";
import BasicLogin from "./pages/basic/Login";
import BasicHome from "./pages/basic/Home";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import MovieDetails from "./pages/MovieDetails";
import Unauthorized from "./pages/Unauthorized";
import ListMovie from "./pages/ListMovie";

import PrivateRoute from "./helpers/route/PrivateRoute";
import PublicRoute from "./helpers/route/PublicRoute";
import ManageMovie from "./pages/ManageMovie";
import ManageSchedule from "./pages/ManageSchedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="basic/counter" element={<BasicCounter />} />
        <Route path="basic/react" element={<BasicReact />} />
        <Route path="basic/login" element={<BasicLogin />} />
        <Route path="basic/home" element={<BasicHome />} />

        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<MovieDetails />} />
        <Route path="list-movie" element={<ListMovie />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<PublicRoute restricted={true} />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="manage-movie" element={<ManageMovie />} />
          <Route path="manage-schedule" element={<ManageSchedule />} />
        </Route>

        <Route element={<PrivateRoute isAdmin={false} />}>
          <Route path="order" element={<Order />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
