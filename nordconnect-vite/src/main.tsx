import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NordConnect from "./NordConnect";
import RoomPage from "./pages/RoomPage";
import VideoDemoPage from "./pages/VideoDemoPage"; // Quizkveld
import StudyGroupDemoPage from "./pages/StudyGroupDemoPage"; // Studiegruppe
import BreakoutDemoPage from "./pages/BreakoutDemoPage"; // Breakout-rom
import HowItWorksPage from "./pages/HowItWorksPage";
import GamificationDemoPage from "./pages/GamificationDemoPage"; // NY: Gamification-demo

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NordConnect />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/quiz-demo" element={<VideoDemoPage />} />
        <Route path="/study-demo" element={<StudyGroupDemoPage />} />
        <Route path="/breakout-demo" element={<BreakoutDemoPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/gamification-demo" element={<GamificationDemoPage />} /> {/* NY */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
