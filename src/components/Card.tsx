import { Link } from "react-router-dom";
import {
  CurrencyRupeeIcon,
  MapPinIcon,
  ClockIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

interface jobProps {
  jobid: string;
  name: string;
  company: string;
  price: string;
  exp: string;
  location: string;
  jobType: string;
  jobSummary: string;
  skils: string;
  Eligbilty: string;
}

const ProductCard = ({
  jobid,
  name,
  company,
  price,
  exp,
  location,
  jobSummary,
  skils,
}: jobProps) => {
  return (
    <div className="group relative space-y-6 flex flex-col border border-gray-300 transition-all duration-700 hover:scale-110 hover:shadow-md p-5 rounded-md">
      <Link to={`/job/${jobid}`}>
        <div className="flex flex-col ">
          <h1 className="h3-medium pb-2">{name}</h1>
          <p className="p-bold-20 text-gray-500 pb-3">{company}</p>
          <div className="flex flex-wrap justify-between">
            <div className="flex items-center space-x-1 justify-center text-gray-500">
              <CurrencyRupeeIcon className="h-6 w-6 " aria-hidden="true" />
              <p className="p-medium-18 text-gray-500 tracking-tight ">
                {price}
              </p>
            </div>
            <div className="flex items-center space-x-1 justify-center text-gray-500">
              <ClockIcon className="h-6 w-6 " aria-hidden="true" />
              <p className="p-medium-18 text-gray-500 tracking-tight ">{exp}</p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-gray-500">
              <MapPinIcon className="h-6 w-6 " aria-hidden="true" />
              <p className="p-medium-18 text-gray-500 tracking-tight ">
                {location}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between space-x-2 text-gray-500">
            <DocumentTextIcon className="h-20 w-20 " aria-hidden="true" />
            <p className="p-regular-16 text-gray-500 pt-6">{jobSummary}</p>
          </div>
          <div className="py-3 p-regular-14 text-gray-500 flex flex-wrap space-x-1">
            <InformationCircleIcon className="h-6 w-6 " aria-hidden="true" />
            {skils.split(",").map((skill) => (
              <p className="pl-2" key={skill}>
                {skill}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
