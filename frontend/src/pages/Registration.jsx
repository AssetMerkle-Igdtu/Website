import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Github,
  School,
  Phone,
  Mail,
  Users,
  Crown,
  Copy,
  Check,
  LogOut,
  ArrowRight,
  UserPlus,
  KeyRound,
} from "lucide-react";

import GridBackground from "../components/GridBackground";
import MoltenMetal from "../components/MoltenMetal";
import { useAuth } from "../context/AuthContext";
import {
  fetchMyProfile,
  completeRegistration,
  fetchMyTeam,
  createTeam,
  joinTeam,
  leaveTeam,
  friendlyError,
} from "../lib/teams";

// ----------------------------------------
// Small shared bits
// ----------------------------------------

const GoogleIcon = (props) => (
  <svg viewBox="0 0 48 48" width="20" height="20" {...props}>
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.4-4.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 16 3 9.1 7.6 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 36.4 26.7 37 24 37c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9 41 15.9 45 24 45z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.4-.1-2.8-.4-3.5z"
    />
  </svg>
);

const ErrorBanner = ({ message }) =>
  message ? (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 mb-6"
    >
      <p className="text-red-400 text-sm text-center">{message}</p>
    </motion.div>
  ) : null;

const Spinner = ({ className = "w-8 h-8" }) => (
  <div
    className={`${className} border-2 border-[#CF547A]/30 border-t-[#E38DA3] rounded-full animate-spin`}
  />
);

const PageShell = ({ eyebrow, title, subtitle, children, wide, onSignOut }) => (
  <div className="relative min-h-screen bg-[#050507] text-white overflow-hidden">
    {/* Background MoltenMetal for SheVibes Theme */}
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <MoltenMetal
        color1="#e41ade"
        color2="#FF9FFC"
        color3="#FFFFFF"
        colorMode="molten"
        speed={0.35}
        scale={4}
        detail={3}
        glow={1.6}
        coreSize={0.1}
        swirl={1}
        fold={-0.2}
        blackPoint={0.05}
        brightness={1.3}
        opacity={0.85}
        grain
        grainIntensity={0.05}
      />
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full ${wide ? "max-w-3xl" : "max-w-md"}`}
      >
        {onSignOut && (
          <div className="flex justify-end mb-3">
            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white bg-[#120c18]/80 hover:bg-[#CF547A]/30 border border-[#CF547A]/40 px-3.5 py-1.5 rounded-full transition-all duration-300 backdrop-blur-xl shadow-md cursor-pointer"
            >
              <LogOut size={14} className="text-[#E38DA3]" /> Log Out
            </button>
          </div>
        )}
        <div className="text-center mb-8">
          <p className="text-[#E38DA3] uppercase tracking-[0.3em] text-xs font-semibold mb-3 drop-shadow">
            {eyebrow}
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#F4C4C9] via-[#E38DA3] to-[#CF547A] drop-shadow-[0_0_20px_rgba(207,84,122,0.4)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-gray-300 mt-3 max-w-md mx-auto">{subtitle}</p>
          )}
        </div>
        <div className="bg-[#120c18]/80 backdrop-blur-xl border border-[#CF547A]/30 rounded-2xl shadow-2xl shadow-[#CF547A]/20 p-8 md:p-10">
          {children}
        </div>
      </motion.div>
    </div>
  </div>
);

const InputField = ({ icon: Icon, label, hint, ...props }) => (
  <div className="w-full">
    <label className="flex items-baseline justify-between mb-2">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      {hint && <span className="text-xs text-gray-500">{hint}</span>}
    </label>
    <div className="relative">
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[#E38DA3]/60 pointer-events-none">
        <Icon size={18} />
      </div>
      <input
        {...props}
        className="w-full bg-black/40 border border-[#CF547A]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E38DA3] focus:ring-1 focus:ring-[#E38DA3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  </div>
);

// ----------------------------------------
// Main component
// ----------------------------------------

const Registration = () => {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();

  // phase: signin | loading | profile-form | team-choice | team-view
  const [phase, setPhase] = useState("loading");
  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // profile form state
  const [fullName, setFullName] = useState("");
  const [github, setGithub] = useState("");
  const [college, setCollege] = useState("IGDTUW");
  const [phone, setPhone] = useState("");

  // team join form state
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);

  const loadState = useCallback(async () => {
    if (!user) {
      setPhase("signin");
      return;
    }
    setError("");
    try {
      const myProfile = await fetchMyProfile(user.id);

      if (!myProfile?.registration_complete) {
        setFullName(myProfile?.full_name || "");
        setGithub(myProfile?.github || "");
        setCollege("IGDTUW");
        setPhone(myProfile?.phone || "");
        setPhase("profile-form");
        return;
      }

      const myTeam = await fetchMyTeam(user.id);
      if (myTeam) {
        setTeam(myTeam);
        setPhase("team-view");
      } else {
        setPhase("team-choice");
      }
    } catch (err) {
      setError(friendlyError(err));
      setPhase(user ? "team-choice" : "signin");
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    loadState();
  }, [authLoading, loadState]);

  // ----------------------------------------
  // Handlers
  // ----------------------------------------

  const handleGoogleSignIn = async () => {
    setError("");
    setBusy(true);
    try {
      await signInWithGoogle("/register");
    } catch (err) {
      setError(friendlyError(err));
      setBusy(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) return setError("Please enter your full name.");
    if (!github.trim())
      return setError("Please enter your GitHub username or profile link.");
    if (!college.trim()) return setError("Please enter your college.");

    setBusy(true);
    try {
      await completeRegistration({ fullName, github, college, phone });
      const myTeam = await fetchMyTeam(user.id);
      if (myTeam) {
        setTeam(myTeam);
        setPhase("team-view");
      } else {
        setPhase("team-choice");
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleCreateTeam = async () => {
    setError("");
    setBusy(true);
    try {
      await createTeam();
      const myTeam = await fetchMyTeam(user.id);
      setTeam(myTeam);
      setPhase("team-view");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setError("");
    if (!joinCode.trim()) return setError("Enter a team code to join.");

    setBusy(true);
    try {
      await joinTeam(joinCode.trim());
      const myTeam = await fetchMyTeam(user.id);
      setTeam(myTeam);
      setPhase("team-view");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleLeaveTeam = async () => {
    setError("");
    setBusy(true);
    try {
      await leaveTeam();
      setTeam(null);
      setPhase("team-choice");
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleCopyCode = async () => {
    if (!team?.code) return;
    try {
      await navigator.clipboard.writeText(team.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — code is still visible on screen either way
    }
  };

  // ----------------------------------------
  // Loading
  // ----------------------------------------

  if (authLoading || phase === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Spinner />
      </div>
    );
  }

  // ----------------------------------------
  // 1. Sign in
  // ----------------------------------------

  if (phase === "signin") {
    return (
      <PageShell
        eyebrow="SheVibes"
        title="Register to Participate"
        subtitle="Sign in with Google to get started. Your college email works best."
      >
        <ErrorBanner message={error} />
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={busy}
          whileHover={!busy ? { scale: 1.02 } : {}}
          whileTap={!busy ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white rounded-lg font-semibold text-black hover:bg-gray-100 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {busy ? (
            <Spinner className="w-5 h-5 border-black/30 border-t-black" />
          ) : (
            <GoogleIcon />
          )}
          {busy ? "Redirecting..." : "Continue with Google"}
        </motion.button>
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing you agree to be contacted about SheVibes.
        </p>
      </PageShell>
    );
  }

  // ----------------------------------------
  // 2. Individual registration form
  // ----------------------------------------

  if (phase === "profile-form") {
    return (
      <PageShell
        eyebrow="Step 1 of 2"
        title="Your Details"
        subtitle="Tell us a bit about yourself. You'll pick or form a team next."
        onSignOut={signOut}
      >
        <ErrorBanner message={error} />
        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <InputField
            icon={Mail}
            label="Email"
            value={user?.email || ""}
            disabled
            readOnly
          />
          <InputField
            icon={User}
            label="Full Name"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <InputField
            icon={Github}
            label="GitHub"
            placeholder="github.com/janedoe or just janedoe"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            required
          />
          {/* <InputField
            icon={School}
            label="College"
            placeholder="Your college / university"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          /> */}
          <div>
  <InputField
    icon={School}
    label="College"
    placeholder="IGDTUW"
    value="IGDTUW"
    disabled
    required
  />

  <p className="mt-1 text-sm text-gray-500">
    Only students from IGDTUW are eligible.
  </p>
</div>

<div className="mt-4">
  <InputField
    icon={School}
    label="Grade"
    placeholder="1st Year"
    value="1st Year"
    disabled
    required
  />

  <p className="mt-1 text-sm text-gray-500">
    Only first-year students are eligible.
  </p>
</div>

        
          <InputField
            icon={Phone}
            label="Phone"
            hint="Optional"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <motion.button
            type="submit"
            disabled={busy}
            whileHover={!busy ? { scale: 1.02 } : {}}
            whileTap={!busy ? { scale: 0.98 } : {}}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-lg text-white transition-all duration-300 ${
              busy
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#E38DA3] to-[#CF547A] hover:from-[#F4C4C9] hover:to-[#E38DA3] shadow-lg shadow-[#CF547A]/30"
            }`}
          >
            {busy ? "Saving..." : "Save & Continue"}
          </motion.button>
        </form>

        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-[#E38DA3] transition-colors mt-6"
        >
          <LogOut size={14} /> Not you? Sign out
        </button>
      </PageShell>
    );
  }

  // ----------------------------------------
  // 3. Team choice
  // ----------------------------------------

  if (phase === "team-choice") {
    return (
      <PageShell
        eyebrow="Step 2 of 2"
        title="Form or Join a Team"
        subtitle="Teams need 2–4 members. Create one and share the code, or join with a code you already have."
        wide
        onSignOut={signOut}
      >
        <ErrorBanner message={error} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form a team */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#CF547A]/15 border border-[#CF547A]/30 flex items-center justify-center mb-4">
              <Crown className="text-[#E38DA3]" size={22} />
            </div>
            <h3 className="text-lg font-bold mb-1">Form a Team</h3>
            <p className="text-sm text-gray-400 mb-6 flex-1">
              Create a new team and become its leader. You'll get a unique
              code to share with your teammates.
            </p>
            <motion.button
              onClick={handleCreateTeam}
              disabled={busy}
              whileHover={!busy ? { scale: 1.02 } : {}}
              whileTap={!busy ? { scale: 0.98 } : {}}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-[#E38DA3] to-[#CF547A] hover:from-[#F4C4C9] hover:to-[#E38DA3] transition-all duration-300 disabled:opacity-60 shadow-md shadow-[#CF547A]/20"
            >
              {busy ? "Creating..." : "Create Team"}
            </motion.button>
          </div>

          {/* Join a team */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#CF547A]/15 border border-[#CF547A]/30 flex items-center justify-center mb-4">
              <UserPlus className="text-[#E38DA3]" size={22} />
            </div>
            <h3 className="text-lg font-bold mb-1">Join a Team</h3>
            <p className="text-sm text-gray-400 mb-4 flex-1">
              Got a code from a teammate? Paste it below to join their team.
            </p>
            <form onSubmit={handleJoinTeam} className="space-y-3">
              <div className="relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[#E38DA3]/60 pointer-events-none">
                  <KeyRound size={18} />
                </div>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="SHE-X7K9P"
                  className="w-full bg-black/40 border border-[#CF547A]/30 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#E38DA3] focus:ring-1 focus:ring-[#E38DA3] transition-all duration-300 tracking-widest uppercase"
                />
              </div>
              <motion.button
                type="submit"
                disabled={busy}
                whileHover={!busy ? { scale: 1.02 } : {}}
                whileTap={!busy ? { scale: 0.98 } : {}}
                className="w-full py-3 px-4 rounded-lg font-semibold border-2 border-[#E38DA3] text-[#E38DA3] hover:bg-[#E38DA3] hover:text-white transition-all duration-300 disabled:opacity-60"
              >
                {busy ? "Joining..." : "Join Team"}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Signed in as <strong className="text-white">{user?.email}</strong></span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </PageShell>
    );
  }

  // ----------------------------------------
  // 4. Team view
  // ----------------------------------------

  if (phase === "team-view" && team) {
    const isEligible = team.members.length >= 2;

    return (
      <PageShell
        eyebrow="You're all set"
        title="Your Team"
        subtitle={
          isEligible
            ? "Your team is ready. You can now submit your project."
            : "Share your code below — you need at least 2 members to submit."
        }
        wide
        onSignOut={signOut}
      >
        <ErrorBanner message={error} />

        {/* Code + count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
              Team Code
            </p>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold tracking-widest text-[#E38DA3]">
                {team.code}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg border border-white/10 hover:border-[#E38DA3] hover:text-[#E38DA3] transition-colors"
                aria-label="Copy team code"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-4 py-2 rounded-lg">
            <Users size={18} className="text-[#E38DA3]" />
            <span className="font-semibold">
              {team.members.length}/4 members
            </span>
          </div>
        </div>

        {!isEligible && (
          <div className="rounded-lg border border-[#CF547A]/30 bg-[#CF547A]/10 px-4 py-3 mb-6">
            <p className="text-[#F4C4C9] text-sm text-center">
              Waiting for teammates — share code{" "}
              <span className="font-semibold">{team.code}</span> to reach the
              minimum of 2.
            </p>
          </div>
        )}

        {/* Members */}
        <div className="space-y-3 mb-8">
          {team.members.map((m) => (
            <div
              key={m.userId}
              className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3"
            >
              <div>
                <p className="font-medium">
                  {m.name || "Unnamed participant"}
                </p>
                <p className="text-xs text-gray-400">
                  {m.github}
                  {m.college ? ` · ${m.college}` : ""}
                </p>
              </div>
              {m.role === "leader" && (
                <span className="flex items-center gap-1 text-xs font-semibold text-[#E38DA3] bg-[#CF547A]/15 border border-[#CF547A]/30 px-2 py-1 rounded-full">
                  <Crown size={12} /> Leader
                </span>
              )}
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON & TWIST ANNOUNCEMENT */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pt-2">
            {/* Box 1: Disabled Continue to Submission Button */}
            <div className="flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm space-y-4">
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold block">
                  Submission Status
                </span>
                <button
                  type="button"
                  disabled={true}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-base text-gray-300 bg-gray-600/60 border border-gray-500/40 cursor-not-allowed shadow-inner transition-all flex items-center justify-center gap-2 pointer-events-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  Continue to Submission (Paused)
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-medium">
                ⚠️ Submissions are disabled until the twist is revealed.
              </p>
            </div>

            {/* Box 2: Crisp Twist Announcement Box */}
            <div className="bg-gradient-to-br from-amber-500/15 via-pink-500/10 to-purple-500/15 border border-amber-500/30 rounded-2xl p-5 text-left backdrop-blur-md shadow-xl flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm tracking-wide">
                  <span>🧠⚡</span> Big Twist Dropping Soon!
                </div>
                <p className="text-xs text-gray-200 leading-relaxed font-normal">
                  A big twist is dropping in the next 1–2 days. Till then, keep brainstorming, experimenting & building!
                </p>
                <div className="text-xs text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 rounded-xl p-2.5">
                  ⚠️ <strong>DON’T SUBMIT YET.</strong> Start submitting only after the twist is revealed.
                </div>
                <p className="text-[11px] text-gray-300 leading-normal">
                  📁 <strong>For submissions:</strong> PPT + coded prototype + demo video + anything else that strengthens your idea. We'll consider everything!
                </p>
              </div>

              <div className="text-xs font-extrabold text-pink-400 pt-2 border-t border-white/10 flex items-center justify-between">
                <span>Think unique. Build crazy. 🔥</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
            <span>
              Signed in as <strong className="text-white">{user?.email}</strong>
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLeaveTeam}
                disabled={busy}
                className="text-xs text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
              >
                Leave team
              </button>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} /> Log Out
              </button>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return null;
};

export default Registration;