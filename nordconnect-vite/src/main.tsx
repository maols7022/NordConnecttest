import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RoomPage from "./pages/RoomPage";
import VideoDemoPage from "./pages/VideoDemoPage";
import BreakoutDemoPage from "./pages/BreakoutDemoPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/video-demo" element={<VideoDemoPage />} />
        <Route path="/breakout-demo" element={<BreakoutDemoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
