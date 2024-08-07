import { FormEvent, useEffect, useState } from "react";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import InputType from "../../components/shared/InputType";

import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { Skeleton } from "../../components/Loader";
import {
  useDeleteJobMutation,
  useJobDetailsQuery,
  useUpdateJobMutation,
} from "../../redux/api/jobAPI";
import { responseToast } from "../../utils/features";

const ManageJob = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();

  const {
    data: productDetailsResponse,
    isLoading,
    isError,
  } = useJobDetailsQuery(params.id!);
  const {
    name,
    company,
    pay,
    experience,
    jobType,
    jobSummary,
    responsibities,
    skils,
    eligbilty,
    startDate,
    endDate,
    openings,
    location,
  } = productDetailsResponse?.data || {
    name: "",
    company: "",
    location: "",
    jobType: "",
    jobSummary: "",
    responsibities: "",
    skils: "",
    eligbilty: "",
    startDate: "",
    endDate: "",
    pay: 0,
    openings: 0,
    experience: "",
  };

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [companyUpdate, setCompanyUpdate] = useState<string>(company);
  const [payUpdate, setPayUpdate] = useState<number>(Number(pay));
  const [experienceUpdate, setExperienceUpdate] = useState<string>(experience);
  const [jobTypeUpdate, setJobTypeUpdate] = useState<string>(jobType);
  const [locationUpdate, setLocationUpdate] = useState<string>(location);
  const [jobSummaryUpdate, setJobSummaryUpdate] = useState<string>(jobSummary);
  const [responsibitiesUpdate, setResponsibitiesUpdate] =
    useState<string>(responsibities);
  const [skilsUpdate, setSkilsUpdate] = useState<string>(skils);
  const [eligbiltyUpdate, setEligbiltyUpdate] = useState<string>(eligbilty);
  const [startDateUpdate, setStartDateUpdate] = useState<string>(
    startDate.toString()
  );
  const [endDateUpdate, setEndDateUpdate] = useState<string>(
    endDate.toString()
  );
  const [openingsUpdate, setOpeningsUpdate] = useState<number>(
    Number(openings)
  );

  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const JobData = {
      name: nameUpdate,
      company: companyUpdate,
      experience: experienceUpdate,
      jobType: jobTypeUpdate,
      location: locationUpdate,
      endDate: endDateUpdate,
      startDate: startDateUpdate,
      responsibities: responsibitiesUpdate,
      eligbilty: eligbiltyUpdate,
      jobSummary: jobSummaryUpdate,
      skils: skilsUpdate,
      pay: payUpdate.toString(),
      openings: openingsUpdate.toString(),
    };
    const res = await updateJob({
      userId: user?._id!,
      JobData,
      jobId: productDetailsResponse?.data._id!,
    });
    responseToast(res, navigate, "/admin/job");
  };

  const deleteHandler = async () => {
    const res = await deleteJob({
      userId: user?._id!,
      jobId: productDetailsResponse?.data._id!,
    });
    responseToast(res, navigate, "/admin/job");
  };

  useEffect(() => {
    if (productDetailsResponse) {
      setNameUpdate(productDetailsResponse.data.name);
      setCompanyUpdate(productDetailsResponse.data.company);
      setExperienceUpdate(productDetailsResponse.data.experience);
      setEligbiltyUpdate(productDetailsResponse.data.eligbilty);

      setLocationUpdate(productDetailsResponse.data.location);
      setJobTypeUpdate(productDetailsResponse.data.jobType);
      setJobSummaryUpdate(productDetailsResponse.data.jobSummary);
      setSkilsUpdate(productDetailsResponse.data.skils);

      setResponsibitiesUpdate(productDetailsResponse.data.responsibities);
      setPayUpdate(Number(productDetailsResponse.data.pay));
      setOpeningsUpdate(productDetailsResponse.data.openings);
      setStartDateUpdate(productDetailsResponse.data.startDate.toString());
      setEndDateUpdate(productDetailsResponse.data.endDate.toString());
    }
  }, [productDetailsResponse]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <button className="cursor-pointer" onClick={deleteHandler}>
            <ArchiveBoxIcon
              className="h-6 w-6 absolute right-[10%] top-[17%] text-red-600  hover:rotate-12 transition-all rounded-full"
              aria-hidden="true"
            />
          </button>

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Manage
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={submitHandler}>
                <InputType
                  id="name"
                  name="name"
                  placeholder="name"
                  type="text"
                  value={nameUpdate}
                  required
                  autoComplete="autocomplete"
                  label="name"
                  labelFor="name"
                  onChange={(e) => setNameUpdate(e.target.value)}
                />
                <InputType
                  id="company"
                  name="company"
                  placeholder="company"
                  type="text"
                  value={companyUpdate}
                  required
                  autoComplete="autocomplete"
                  label="company"
                  labelFor="company"
                  onChange={(e) => setCompanyUpdate(e.target.value)}
                />
                <InputType
                  id="pay"
                  name="pay"
                  placeholder="pay"
                  type="number"
                  value={payUpdate}
                  required
                  autoComplete="autocomplete"
                  label="pay"
                  labelFor="pay"
                  onChange={(e) => setPayUpdate(Number(e.target.value))}
                />
                <InputType
                  id="openings"
                  name="openings"
                  placeholder="openings"
                  type="number"
                  value={openingsUpdate}
                  required
                  autoComplete="autocomplete"
                  label="openings"
                  labelFor="openings"
                  onChange={(e) => setOpeningsUpdate(Number(e.target.value))}
                />
                <InputType
                  id="experience"
                  name="experience"
                  placeholder="experience"
                  type="text"
                  value={experienceUpdate}
                  required
                  autoComplete="autocomplete"
                  label="experience"
                  labelFor="experience"
                  onChange={(e) => setExperienceUpdate(e.target.value)}
                />

                <InputType
                  id="jobType"
                  name="jobType"
                  placeholder="jobType"
                  type="text"
                  value={jobTypeUpdate}
                  required
                  autoComplete="autocomplete"
                  label="jobType"
                  labelFor="jobType"
                  onChange={(e) => setJobTypeUpdate(e.target.value)}
                />

                <InputType
                  id="location"
                  name="location"
                  placeholder="location"
                  type="text"
                  value={locationUpdate}
                  required
                  autoComplete="autocomplete"
                  label="location"
                  labelFor="location"
                  onChange={(e) => setLocationUpdate(e.target.value)}
                />
                <div className="flex items-center justify-between space-x-4">
                  <InputType
                    type="date"
                    value={startDateUpdate}
                    onChange={(e) => setStartDateUpdate(e.target.value)}
                    id="startDate"
                    name="startDate"
                    label="startDate"
                    labelFor="startDate"
                  />
                  <p className="block text-sm font-medium leading-6 text-gray-900 pt-10">
                    {startDateUpdate.slice(0, 10)}
                  </p>
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <InputType
                    type="date"
                    value={endDateUpdate}
                    onChange={(e) => setEndDateUpdate(e.target.value)}
                    id="endDate"
                    name="endDate"
                    label="endDate"
                    labelFor="endDate"
                  />
                  <p className="block text-sm font-medium leading-6 text-gray-900 pt-10">
                    {endDateUpdate.slice(0, 10)}
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="jobSummary"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    jobSummary
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="jobSummary"
                      name="jobSummary"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={jobSummaryUpdate}
                      onChange={(e) => setJobSummaryUpdate(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="responsibities"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    responsibities
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="responsibities"
                      name="responsibities"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={responsibitiesUpdate}
                      onChange={(e) => setResponsibitiesUpdate(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="skils"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    skils
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="skils"
                      name="skils"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={skilsUpdate}
                      onChange={(e) => setSkilsUpdate(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="eligbilty"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    eligbilty
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="eligbilty"
                      name="eligbilty"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={eligbiltyUpdate}
                      onChange={(e) => setEligbiltyUpdate(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default ManageJob;
