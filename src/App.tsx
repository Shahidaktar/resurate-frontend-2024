import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader";
import { UserReducerInitialState } from "./types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "./redux/api/userAPI";
import { auth } from "./firebase";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import ProtectedRoute from "./components/protectedRoute";

const Home = lazy(() => import("./pages/Home"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const UploadResume = lazy(() => import("./pages/UploadResume"));

const Job = lazy(() => import("./pages/admin/Job"));
const User = lazy(() => import("./pages/admin/User"));
const Apply = lazy(() => import("./pages/admin/Apply"));
const AddJob = lazy(() => import("./pages/admin/AddJob"));
const ManageJob = lazy(() => import("./pages/admin/ManageJob"));
const JobApplicants = lazy(() => import("./pages/admin/JobApplicants"));
const Applies = lazy(() => import("./pages/Applies"));
const JobApply = lazy(() => import("./pages/JobApply"));

const App = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />

          {/* admin*/}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={true}
                adminOnly={true}
                admin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/job" element={<Job />} />
            <Route path="/admin/job/new" element={<AddJob />} />
            <Route path="/admin/job/:id" element={<ManageJob />} />
            <Route
              path="/admin/job/applications/:id"
              element={<JobApplicants />}
            />

            <Route path="/admin/user" element={<User />} />
            <Route
              path="/admin/job/applications/status/:id"
              element={<Apply />}
            />
          </Route>

          {/* login needed*/}
          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/applies" element={<Applies />} />
            <Route path="/job-apply/:id" element={<JobApply />} />
            <Route path="/upload-resume" element={<UploadResume />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
