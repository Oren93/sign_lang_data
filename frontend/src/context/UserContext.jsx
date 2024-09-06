import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("signLangRecToken"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

        try {
          const response = await fetch(
            "http://localhost:8001/user/current",
            requestOptions
          );

          if (response.ok) {
            const data = await response.json();
            setUser({ ...data, token });
          } else {
            setToken(null);
            setUser(null);
            localStorage.removeItem("signLangRecToken");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setToken(null);
          setUser(null);
          localStorage.removeItem("signLangRecToken");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("signLangRecToken", token);
    } else {
      localStorage.removeItem("signLangRecToken");
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, loading }}>
      {props.children}
    </UserContext.Provider>
  );
};
