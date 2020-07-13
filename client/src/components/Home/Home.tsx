import React, { useContext } from "react";
import { IsUserLoggedContext } from "../../contexts/IsUserLoggedContext";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { isUserLogged } = useContext(IsUserLoggedContext);

  if (isUserLogged) return <Redirect to="/tasks" />;

  return (
    <div>
      <h1>ברוכים הבאים</h1>
      <p> יש להרשם כדי לנהל משימות</p>
    </div>
  );
};

export default Home;
