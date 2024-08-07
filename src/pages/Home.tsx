import { ArrowDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link as LinkScroll } from "react-scroll";
import Card from "../components/Card";
import Footer from "../components/shared/Layout/Footer";
import Layout from "../components/shared/Layout/Layout";
import { useSearchJobsQuery } from "../redux/api/jobAPI";
import { Skeleton } from "../components/Loader";

const Home = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useSearchJobsQuery({
    search,
    page: "1",
  });

  if (isError) toast.error("Cannot Fetch the Jobs");
  return (
    <Layout>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-2 md:py-10">
        <div className="wrapper flex flex-col items-center justify-center grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0  p-4 rounded-md">
          <div className="ml-2 flex flex-col justify-center items-center gap-8">
            <h1 className="h1-bold text-center">
              Unlock Your Future: Find Your Dream Job Today!
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-center">
              Join and apply to world-class companies with our global community
              in just a few steps.
            </p>

            <button className="animate-bounce p-6  bg-white  font-semibold text-indigo-600 shadow-xl rounded-full">
              <LinkScroll to="jobs" smooth={true} duration={100}>
                <ArrowDownIcon className="h-10 w-10" aria-hidden="true" />
              </LinkScroll>
            </button>
          </div>
        </div>
      </section>
      {isLoading ? (
        <Skeleton />
      ) : (
        <section
          id="jobs"
          className="wrapper my-2 flex flex-col gap-8 md:gap-12"
        >
          <div className="flex items-center justify-center">
            <h2 className="h2-bold ">Trust by Thousands of Job Seekers</h2>
          </div>

          <div>
            <input
              type="text"
              id="search"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none focus:ring-transparent text-sm "
            />
            {
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
                  <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:gap-x-8">
                    {data?.jobs.map((job) => (
                      <Card
                        key={job._id}
                        jobid={job._id}
                        name={job.name}
                        company={job.company}
                        price={job.pay}
                        exp={job.experience}
                        location={job.location}
                        jobType={job.jobType}
                        jobSummary={job.jobSummary}
                        skils={job.skils}
                        Eligbilty={job.eligbilty}
                      />
                    ))}
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      )}
      <Footer />
    </Layout>
  );
};

export default Home;
