import React from "react";
import { usersList } from "../data/Users";

const UsersList = () => {
  return (
    <>
      <h2 className="text-lg font-extrabold dark:text-white">
        Registrerte brukere
      </h2>
      <div className="mb-6"></div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Brukernavn
              </th>
              <th scope="col" className="px-6 py-3">
                Passord
              </th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.navn}
                  </th>
                  <th>{user.hashed_password}</th>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
