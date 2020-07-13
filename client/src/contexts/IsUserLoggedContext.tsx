import React, { createContext, useState } from "react";

const IsUserLoggedContext: React.Context<any> = createContext('initialVal');

const IsUserLoggedProvider = (props: { children: React.ReactNode; }) => {
    const [isUserLogged, setIsUserLogged] = useState(localStorage.getItem('userInfo') ? true : false);
 return (
    <IsUserLoggedContext.Provider value={{ isUserLogged, setIsUserLogged }}>
      {props.children}
    </IsUserLoggedContext.Provider>
  );
};

export { IsUserLoggedProvider, IsUserLoggedContext}
