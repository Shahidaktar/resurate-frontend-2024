import { FormEvent, useState } from "react";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import InputType from "../../components/shared/InputType";
import { useSelector } from "react-redux";
import { responseToast } from "../../utils/features";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useNewJobMutation } from "../../redux/api/jobAPI";

const AddJob = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [pay, setPay] = useState<number>(0);
  const [experience, setExperience] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [jobSummary, setJobSummary] = useState<string>("");
  const [responsibities, setResponsibities] = useState<string>("");
  const [skils, setSkils] = useState<string>("");
  const [eligbilty, setEligbilty] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [openings, setOpenings] = useState<number>(0);

  const [newJob] = useNewJobMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !company ||
      !pay ||
      openings < 0 ||
      !experience ||
      !jobType ||
      !location ||
      !jobSummary ||
      !responsibities ||
      !skils ||
      !eligbilty ||
      !startDate ||
      !endDate
    )
      return;

    const JobData = {
      name,
      company,
      experience,
      jobType,
      location,
      endDate: endDate.toString(),
      startDate: startDate.toString(),
      responsibities,
      eligbilty,
      jobSummary,
      skils,
      pay: pay.toString(),
      openings: openings.toString(),
    };
    const res = await newJob({ id: user?._id!, JobData });

    responseToast(res, navigate, "/admin/job");
  };
  return (
    <AdminLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            New Job
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <InputType
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={name}
              required
              autoComplete="autocomplete"
              label="name"
              labelFor="name"
              onChange={(e) => setName(e.target.value)}
            />
            <InputType
              id="company"
              name="company"
              placeholder="company"
              type="text"
              value={company}
              required
              autoComplete="autocomplete"
              label="company"
              labelFor="company"
              onChange={(e) => setCompany(e.target.value)}
            />
            <InputType
              id="pay"
              name="pay"
              placeholder="pay"
              type="number"
              value={pay}
              required
              autoComplete="autocomplete"
              label="pay"
              labelFor="pay"
              onChange={(e) => setPay(Number(e.target.value))}
            />
            <InputType
              id="openings"
              name="openings"
              placeholder="openings"
              type="number"
              value={openings}
              required
              autoComplete="autocomplete"
              label="openings"
              labelFor="openings"
              onChange={(e) => setOpenings(Number(e.target.value))}
            />
            <InputType
              id="experience"
              name="experience"
              placeholder="experience"
              type="text"
              value={experience}
              required
              autoComplete="autocomplete"
              label="experience"
              labelFor="experience"
              onChange={(e) => setExperience(e.target.value)}
            />

            <InputType
              id="jobType"
              name="jobType"
              placeholder="jobType"
              type="text"
              value={jobType}
              required
              autoComplete="autocomplete"
              label="jobType"
              labelFor="jobType"
              onChange={(e) => setJobType(e.target.value)}
            />

            <InputType
              id="location"
              name="location"
              placeholder="location"
              type="text"
              value={location}
              required
              autoComplete="autocomplete"
              label="location"
              labelFor="location"
              onChange={(e) => setLocation(e.target.value)}
            />

            <InputType
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              id="startDate"
              name="startDate"
              label="startDate"
              labelFor="startDate"
            />

            <InputType
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              id="endDate"
              name="endDate"
              label="endDate"
              labelFor="endDate"
            />

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
                  value={jobSummary}
                  onChange={(e) => setJobSummary(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about job.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="responsibities"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                responsibilities
              </label>
              <div className="mt-2">
                <textarea
                  id="responsibities"
                  name="responsibities"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={responsibities}
                  onChange={(e) => setResponsibities(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about responsibilities.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="skils"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                skills
              </label>
              <div className="mt-2">
                <textarea
                  id="skils"
                  name="skils"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={skils}
                  onChange={(e) => setSkils(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about skills.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="eligbilty"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                eligibility
              </label>
              <div className="mt-2">
                <textarea
                  id="eligbilty"
                  name="eligbilty"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={eligbilty}
                  onChange={(e) => setEligbilty(e.target.value)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about eligibility.
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddJob;
