import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import { Context } from "../../context/context";
import "./Dashboard.scss";

const Dashboard = () => {
  const { getUser } = useContext(Context);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard__content container">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
