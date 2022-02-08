import React from "react";
import { useNavigate } from "react-router-dom";
import "./history.css"

export const History = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="historyBtn" onClick={() => navigate(-1)}> back </button>
    </div>
  );
};
