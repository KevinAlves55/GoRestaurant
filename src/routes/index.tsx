import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../page/dashboard/Dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};