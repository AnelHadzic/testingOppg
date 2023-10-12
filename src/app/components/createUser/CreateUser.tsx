"use client";
import React, { useState, useEffect } from "react";

// Lærte om validering av signup sider via denne youtube videoen:
// https://www.youtube.com/watch?v=brcHK3P6ChQ&ab_channel=DaveGray

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState("");
  const [Status, setStatus] = useState("");

  // REGEX htmlFor VALIDERING AV BRUKERNAVN OG PASSORD
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  // INPUT VALIDERING
  const [validUser, setValidUser] = useState(true);
  const [validPwd, setValidPwd] = useState(true);
  const [validPwdMatch, setValidPwdMatch] = useState(true);

  useEffect(() => {
    setValidUser(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidPwdMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  useEffect(() => {
    setError("");
  }, [username, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (!validUser || !validPwd || !validPwdMatch) {
      setError("Ikke gyldig inputs");
      return;
    }

    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setStatus("Bruker er nå registrert");
    } catch (error) {
      setError("Opplevd en feil ved opprettelse av bruker: " + error);
    }
  };

  return (
    <>
      <h2 className="text-lg">Registrer en bruker</h2>
      {validUser ? null : (
        <p data-testid="error_username">
          Brukernavn må starte med en bokstav, må være mellom 4 og 24
          characters.
        </p>
      )}

      {validPwd ? null : (
        <p data-testid="error_password">
          Passordet må minst ha en lowercase, en uppercase, et tall, og en
          special character: !, @, #, $, %, og må være mellom 8 og 24
          characters.
        </p>
      )}

      <div className="mb-6"></div>
      <form role="form" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Brukernavn
          </label>
          <input
            data-testid="brukernavn"
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Anelh00"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Ditt passord
          </label>
          <input
            data-testid="passord"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gjenta passord
          </label>
          <input
            data-testid="confirm_passord"
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {validPwdMatch ? null : <p>Passord må være like</p>}
        </div>
        <button
          data-testid="submit_button"
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        {Error && <p>{Error}</p>}
        {Status && <p data-testid="success_status">{Status}</p>}
      </form>
    </>
  );
};

export default CreateUser;
