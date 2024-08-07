import { Link } from "react-router-dom";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton } from "../../components/Loader";
import { useAllJobsQuery } from "../../redux/api/jobAPI";
import AdminLayout from "../../components/shared/Layout/AdminLayout";

const Job = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError, error } = useAllJobsQuery(user?._id!);
  const [page, setPage] = useState(1);
  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className=" w-full  space-y-3 overflow-x-scroll scrollbar-hide">
          <h1 className=" p-3 w-full overflow-hidden rounded-md text-gray-700 text-2xl lg:aspect-none group-hover:opacity-75 flex justify-center ">
            Jobs
          </h1>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Job Role
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Company
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 ">
                  Pay
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Location
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Applicants
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.data.map((record) => (
                <tr key={record.name}>
                  <td className="px-4 py-1">{record.name}</td>
                  <td className="px-4 py-1">{record.company}</td>
                  <td className="px-4 py-1">₹{record.pay}</td>
                  <td className="px-4 py-1">{record.location}</td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/job/${record._id}`}
                      className="bg-indigo-400 text-white p-1 rounded-lg text-sm"
                    >
                      Manage
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/job/applications/${record._id}`}
                      className="bg-indigo-400 text-white p-1 rounded-lg text-sm"
                    >
                      Applicants
                    </Link>
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

          <Link className="cursor-pointer" to="/admin/job/new">
            <PlusIcon
              className="h-6 w-6 absolute right-[10%] top-[17%] text-white  bg-red-600 hover:rotate-12 transition-all rounded-full"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}
    </AdminLayout>
  );
};

export default Job;
