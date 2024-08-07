import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../../components/Loader";
import Layout from "../../components/shared/Layout/Layout";
import { useAllAppliesQuery } from "../../redux/api/ApplyAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";

const JobApplicants = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const { data, isLoading, isError, error } = useAllAppliesQuery({
    adminId: user?._id!,
    jobId: params.id!,
  });
  const [page, setPage] = useState(1);
  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <Layout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="lg:w-2/3 w-full mx-auto space-y-3 overflow-x-scroll scrollbar-hide">
          <h1 className=" p-3 w-full overflow-hidden rounded-md text-gray-700 text-2xl lg:aspect-none group-hover:opacity-75 flex justify-center ">
            My Applications
          </h1>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Applicant Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  DOB
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Score
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Manage
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((applicant) => (
                <tr key={applicant.user._id}>
                  <td className="px-4 py-1">{applicant.user.name}</td>
                  <td className="px-4 py-1">{applicant.user.email}</td>
                  <td className="px-4 py-1">{applicant.user.dob.slice(0, 10)}</td>
                  <td className="px-4 py-1">{applicant.score}</td>
                  <td className="px-4 py-1">
                    <Link to={`/admin/job/applications/status/${applicant._id}`} className="text-blue-950 text-sm font-semibold">
                      Manage
                    </Link>
                  </td>
                  <td className="px-4 py-1">
                    <span
                      className={
                        applicant.status === "Pending"
                          ? "text-violet-700"
                          : applicant.status === "Selected"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {applicant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data?.data.length! > 6 && (
            <div>
              <article className="flex justify-center space-x-3 items-center">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={!isPrevPage}
                >
                  Prev
                </button>
                <span className="text-sm text-gray-700 font-sans ">
                  {page} of {4}
                </span>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded-lg disabled:bg-red-400"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!isNextPage}
                >
                  Next
                </button>
              </article>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default JobApplicants;
