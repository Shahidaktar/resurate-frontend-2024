export type User = {
  name: string;
  email: string;
  gender: string;
  photo: string;
  dob: string;
  _id: string;
  role: string;
};

export type Resume = {
  formdata: FormData;
};

export type UpdateResume = {
  singleresume: string;
  user: string;
};

export type Job = {
  name: string;
  company: string;
  pay: string;
  experience: string;
  jobType: string;
  location: string;
  openings: number;
  jobSummary: string;
  responsibities: string;
  skils: string;
  eligbilty: string;
  startDate: Date;
  endDate: Date;
  _id: string;
};

export type JobData = {
  name: string;
  company: string;
  pay: string;
  experience: string;
  jobType: string;
  location: string;
  openings: string;
  jobSummary: string;
  responsibities: string;
  skils: string;
  eligbilty: string;
  startDate: string;
  endDate: string;
};

export type Apply = {
  user: string;
  job: Job;
  resume: string;
  status?: string;
};

export type NewApplyforAll = {
  _id: string;
  user: User;
  job: string;
  score?: number;
  status?: string;
};
