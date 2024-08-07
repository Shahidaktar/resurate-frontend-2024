import {
  BriefcaseIcon,
  ClockIcon,
  CurrencyRupeeIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import Layout from "../components/shared/Layout/Layout";
import { useJobDetailsQuery } from "../redux/api/jobAPI";

export default function JobDetails() {
  const params = useParams();
  const { data, isLoading, isError } = useJobDetailsQuery(params.id!);
  if (isError) toast.error("Cannot Fetch the Job");

  return (
    <Layout>
      <div className="bg-white">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <form>
              <div className="pt-6">
                <div className="mx-auto max-w-2xl px-4 pb-2 pt-2 sm:px-6 lg:flex lg:flex-col lg:max-w-7xl  lg:gap-x-8 lg:px-8 lg:pb-2 lg:pt-6">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="h2-bold ">{data?.data.name}</h1>
                    <h1 className="p-bold-20 text-gray-500 pt-1">
                      {data?.data.company}
                    </h1>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-around">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <CurrencyRupeeIcon
                        className="h-6 w-6 "
                        aria-hidden="true"
                      />
                      <p className="p-medium-18 text-gray-500 tracking-tight ">
                        {data?.data.pay}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <ClockIcon className="h-6 w-6 " aria-hidden="true" />
                      <p className="p-medium-18 text-gray-500 tracking-tight ">
                        {data?.data.experience}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-500">
                      <BriefcaseIcon className="h-6 w-6 " aria-hidden="true" />
                      <p className="p-medium-18 text-gray-500 tracking-tight ">
                        {data?.data.jobType}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPinIcon className="h-6 w-6 " aria-hidden="true" />
                      <p className="p-medium-18 text-gray-500 tracking-tight ">
                        {data?.data.location}
                      </p>
                    </div>
                    <div>
                      <p className="p-medium-18 text-gray-500 tracking-tight ">
                        Openings: {data?.data.openings}
                      </p>
                    </div>
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <div>
                      <h3 className="sr-only">Description</h3>

                      <div className="space-y-6">
                        <p className="text-base text-gray-900">
                          {data?.data.jobSummary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h3 className="text-sm font-medium text-gray-900">
                        Responsibilities
                      </h3>

                      <div className="mt-4">
                        <ul
                          role="list"
                          className="list-disc space-y-2 pl-4 text-sm"
                        >
                          {data?.data.responsibities
                            .split(",")
                            .map((highlight) => (
                              <li key={highlight} className="text-gray-400">
                                <span className="text-gray-600">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h3 className="text-sm font-medium text-gray-900">
                        Skills Required
                      </h3>

                      <div className="mt-4">
                        <ul
                          role="list"
                          className="list-disc space-y-2 pl-4 text-sm"
                        >
                          {data?.data.skils.split(",").map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                              <span className="text-gray-600">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-10">
                      <h2 className="text-sm font-medium text-gray-900">
                        Eligibility
                      </h2>

                      <div className="mt-4 space-y-6">
                        <p className="text-sm text-gray-600">
                          {data?.data.eligbilty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex  pb-10 items-center justify-center">
                  {
                    <Link
                      to={`/job-apply/${data?.data._id}`}
                      className="flex w-fit  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Apply
                    </Link>
                  }
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}
