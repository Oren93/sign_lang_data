import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("signLangRecToken"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch(
          "http://localhost:8001/user/current",
          requestOptions
        );
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setToken(null);
          setUser(null);
        }
      }
    };

    fetchUser();
    localStorage.setItem("signLangRecToken", token);
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
