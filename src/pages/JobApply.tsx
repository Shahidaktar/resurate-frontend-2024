import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useExistingApplyQuery,
  useNewApplyMutation,
} from "../redux/api/ApplyAPI";
import { useResumeScoreMutation } from "../redux/api/RankAPI";
import { useJobDetailsQuery } from "../redux/api/jobAPI";
import { useResumeUploadMutation } from "../redux/api/resumeAPI";
import { RootState, server } from "../redux/store";
import { responseToast } from "../utils/features";
import Layout from "./../components/shared/Layout/Layout";

const JobApply = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [buttonText, setButtonText] = useState("Submit");
  const navigate = useNavigate();
  const [resume, setResume] = useState<File>();
  const params = useParams();
  const { data: jobData, isError } = useJobDetailsQuery(params.id!);
  const { data: ExistingApply } = useExistingApplyQuery({
    user: user?._id,
    job: params.id!,
  });
  const [resumeUpload] = useResumeUploadMutation();
  const [resumeScore] = useResumeScoreMutation();
  const [newApply] = useNewApplyMutation();

  const resumeUploader = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setResume(file);
        }
      };
    }
  };
  if (isError) toast.error("Cannot Fetch the Job");
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume || !user?._id) return;
    setButtonText("Processing...");
    try {
      const formData = new FormData();
      formData.set("user", user?._id!);
      formData.set("singleresume", resume);

      const resResumeUpload: any = await resumeUpload({ formdata: formData });
      let data = {
        url: `${server}/${resResumeUpload.data.resume.singleresume}`,
        skills: jobData?.data.skils.split(",")!,
      };
      const resResumeScore: any = await resumeScore(data);

      const dataSubmit = {
        job: params.id!,
        resume: resResumeUpload.data.resume.singleresume!,
        score: resResumeScore.data.score,
      };
      const res = await newApply({
        user: user?._id as string,
        data: dataSubmit,
      });
      setButtonText("Submitted");
      responseToast(res, navigate, "/applies");
    } catch (error) {
      console.log(error);
      setButtonText("Submit");
    }
  };
  return (
    <Layout>
      {ExistingApply ? (
        <form onSubmit={submitHandler}>
          <div className="flex min-h-full flex-1 flex-col justify-center px-2 py-2 lg:px-2">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Required Fields
              </h2>
            </div>
            <img
              src={`${user?.photo}`}
              height={150}
              width={150}
              className="mx-auto rounded-full mt-4"
            />
            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
              <div className="flex flex-col items-start space-y-2">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="gender"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={user?.name}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="flex flex-col items-start space-y-2">
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="gender"
                >
                  Email
                </label>

                <input
                  type="text"
                  id="gender"
                  name="gender"
                  value={user?.email}
                  readOnly
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-2">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-2 text-start text-sm font-medium leading-6 text-gray-900 tracking-tight ">
                Resume
              </h2>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
              <div className="col-span-full ">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-2 flex text-sm leading-6 text-gray-600">
                      <div className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none  hover:text-indigo-500">
                        <input
                          id="file"
                          required
                          type="file"
                          onChange={resumeUploader}
                          className="bg-gray-100 "
                        />
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-gray-600 p-2">
                      PDF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center items-center space-x-3 rounded-md bg-indigo-600 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 border border-gray-300"
                >
                  <span className="text-white">{buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              You have already applied
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the job you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default JobApply;
