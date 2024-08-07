import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import toast from "react-hot-toast";
import { User } from "../../../types/types";

interface PropsType {
  user: User | null;
}
const Header = ({ user }: PropsType) => {
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <header className="w-full border-b ">
      <div className="wrapper flex items-center justify-between">
        <Link to="/" className="w-36">
          <img src="/hire.png" width={85} height={85} alt="logo" />
        </Link>

        {user?._id ? (
          <>
            <div className="flex w-32 justify-end gap-3">
              <Link
                to="/upload-resume"
                className="relative rounded-full  p-1 text-gray-400 hover:text-gray-500"
              >
                <UserCircleIcon className="h-10 w-10 " aria-hidden="true" />
              </Link>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="relative rounded-full  p-1 text-gray-400 hover:text-gray-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">login</span>
                    <Bars3Icon className="h-10 w-10 " aria-hidden="true" />
                  </MenuButton>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {user?.role === "admin" && (
                        <MenuItem>
                          <Link
                            to="/admin/job"
                            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-600"
                          >
                            Dashboard
                          </Link>
                        </MenuItem>
                      )}
                      <MenuItem>
                        <Link
                          to="/applies"
                          className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-600"
                        >
                          Applies
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={() => logoutHandler()}
                          className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:text-gray-600"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-600"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">login</span>
            <ArrowRightEndOnRectangleIcon
              className="h-10 w-10 "
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
