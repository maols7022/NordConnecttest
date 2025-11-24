import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NordConnect from "./NordConnect";
import RoomPage from "./pages/RoomPage";
import VideoDemoPage from "./pages/VideoDemoPage"; // Quizkveld
import StudyGroupDemoPage from "./pages/StudyGroupDemoPage"; // Studiegruppe
import BreakoutDemoPage from "./pages/BreakoutDemoPage"; // Breakout-rom

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Forsiden / hovedprototypen */}
        <Route path="/" element={<NordConnect />} />

        {/* Rom-visning som egen side, f.eks. /room/kaffe */}
        <Route path="/room/:id" element={<RoomPage />} />

        {/* Demo-sider */}
        <Route path="/quiz-demo" element={<VideoDemoPage />} />
        <Route path="/study-demo" element={<StudyGroupDemoPage />} />
        <Route path="/breakout-demo" element={<BreakoutDemoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
