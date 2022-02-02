import { useState, useEffect } from "react";

export const usePasswordValidation = ({ password = "" }) => {
  const [validLength, setValidLength] = useState(null);
  const [upperCase, setUpperCase] = useState(null);

  useEffect(() => {
    console.log("from usePasswordValidation");
    setValidLength(password.length >= 6 ? true : false);
    setUpperCase(password.toLocaleLowerCase() !== password);
  }, [password]);

  return [validLength, upperCase];
};
