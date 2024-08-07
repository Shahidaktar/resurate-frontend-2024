import Layout from "../components/shared/Layout/Layout";
import { useState } from "react";
import { Skeleton } from "../components/Loader";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useApplyDetailsQuery } from "../redux/api/ApplyAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";

const Applies = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError, error } = useApplyDetailsQuery(user?._id!);
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
                  Company Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Job Role
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Job Type
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Location
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((order) => (
                <tr key={order.job._id}>
                  <td className="px-4 py-1">{order.job.company}</td>
                  <td className="px-4 py-1">{order.job.name}</td>
                  <td className="px-4 py-1">{order.job.jobType}</td>
                  <td className="px-4 py-1">{order.job.location}</td>
                  <td className="px-4 py-1">
                    <span
                      className={
                        order.status === "Pending"
                          ? "text-violet-700"
                          : order.status === "Selected"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {order.status}
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

export default Applies;
