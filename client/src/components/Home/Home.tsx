import React, { useContext } from "react";
import { IsUserLoggedContext } from "../../contexts/IsUserLoggedContext";
import { Redirect } from "react-router-dom";
import { useStore } from "../../contexts/storeContext";



const Home = () => {
  const stateStore = useStore()
  const { isUserLogged } = useContext(IsUserLoggedContext);

  if (stateStore.isUserLogged) return <Redirect to="/tasks" />;

  return (
    <div>
      <h1>ברוכים הבאים</h1>
      <p> יש להרשם כדי לנהל משימות</p>
    </div>
  );
};

export default Home;
