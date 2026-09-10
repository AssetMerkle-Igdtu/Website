import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchMyTeam } from "../lib/teams";

// Wraps a route element and only renders it once the signed-in user
// belongs to a team with 2-4 members. Otherwise sends them to /register
// to finish registration / team setup first. Does not touch Submission.jsx.
const RequireTeam = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [status, setStatus] = useState("checking"); // checking | ok | blocked

  useEffect(() => {
    let mounted = true;

    if (authLoading) return;
    if (!user) {
      setStatus("blocked");
      return;
    }

    fetchMyTeam(user.id)
      .then((team) => {
        if (!mounted) return;
        setStatus(team && team.members.length >= 2 ? "ok" : "blocked");
      })
      .catch(() => {
        if (mounted) setStatus("blocked");
      });

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  if (authLoading || status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "blocked") {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default RequireTeam;
