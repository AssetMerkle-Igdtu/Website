import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// ============================================================
// FIELD DEFINITIONS
// ============================================================

const sections = [
  {
    id: "project",
    title: "Project",
    fields: [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        placeholder: "Enter your project name",
        span: "full",
        maxLength: 100,
      },
      {
        id: "theme",
        label: "Project Theme",
        type: "select",
        placeholder: "Select your chosen theme",
        options: [
          "Web3 for Transparent and Accountable Cities",
          "AI/ML for Context-Aware Women's Travel Recommendations",
          "AI for Smarter Campus Information",
        ],
        span: "full",
      },
      {
        id: "problemStatement",
        label: "Problem Statement",
        type: "textarea",
        placeholder: "What problem does your project solve?",
        rows: 5,
        span: "full",
        maxLength: 2000,
      },
      {
        id: "projectDescription",
        label: "Project Description",
        type: "textarea",
        placeholder: "Describe your project in detail",
        rows: 7,
        span: "full",
        maxLength: 5000,
      },
    ],
  },
  {
    id: "links",
    title: "Links",
    description: "Make sure each link is publicly accessible.",
    fields: [
      {
        id: "githubRepo",
        label: "GitHub Repository",
        type: "url",
        placeholder: "https://github.com/your-team/repository",
        span: "half",
        maxLength: 500,
      },
      {
        id: "figmaLink",
        label: "Figma",
        type: "url",
        placeholder: "https://figma.com/...",
        span: "half",
        maxLength: 500,
      },
      {
        id: "liveDemoLink",
        label: "Prototype Link",
        type: "url",
        placeholder: "https://your-demo.vercel.app",
        span: "half",
        maxLength: 500,
      },
      {
        id: "demoVideoLink",
        label: "Demo Video",
        type: "url",
        placeholder: "https://youtube.com/watch?v=...",
        span: "half",
        maxLength: 500,
      },
      {
        id: "pptLink",
        label: "PPT",
        type: "url",
        placeholder: "https://drive.google.com/...",
        span: "half",
        maxLength: 500,
      },
    ],
  },
];

const allFields = sections.flatMap((section) => section.fields);

// ============================================================
// EMPTY FORM
// ============================================================

const EMPTY_FORM = {
  projectName: "",
  theme: "",
  problemStatement: "",
  projectDescription: "",
  githubRepo: "",
  figmaLink: "",
  liveDemoLink: "",
  demoVideoLink: "",
  pptLink: "",
};

// ============================================================
// SUBMISSION DEADLINE
// 16 September 2026, 10:00 AM IST
// ============================================================

const SUBMISSION_DEADLINE = new Date(
  "2026-09-16T10:00:00+05:30"
);

// ============================================================
// COMPONENT
// ============================================================

const Submission = () => {
  const navigate = useNavigate();

  // ==========================================================
  // USER / TEAM / SUBMISSION
  // ==========================================================

  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [submission, setSubmission] = useState(null);

  // ==========================================================
  // UI STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);

  // ==========================================================
  // DEADLINE STATE
  // ==========================================================

  const [submissionClosed, setSubmissionClosed] = useState(
    new Date() >= SUBMISSION_DEADLINE
  );

  // Keep the deadline state updated automatically.
  useEffect(() => {
    const checkDeadline = () => {
      setSubmissionClosed(
        new Date() >= SUBMISSION_DEADLINE
      );
    };

    checkDeadline();

    const interval = setInterval(checkDeadline, 1000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================================
  // FORM
  // ==========================================================

  const [formData, setFormData] = useState({
    ...EMPTY_FORM,
  });

  // ==========================================================
  // LOAD USER + TEAM + EXISTING SUBMISSION
  // ==========================================================

  useEffect(() => {
    loadSubmission();
  }, []);

  const loadSubmission = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // ------------------------------------------------------
      // STEP 1 — GET AUTHENTICATED USER
      // ------------------------------------------------------

      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!currentUser) {
        navigate("/register");
        return;
      }

      setUser(currentUser);

      // ------------------------------------------------------
      // STEP 2 — FIND THE USER'S TEAM
      // ------------------------------------------------------

      const {
        data: membership,
        error: membershipError,
      } = await supabase
        .from("team_members")
        .select(
          `
            team_id,
            role,
            teams (
              id,
              code,
              max_members,
              created_by,
              created_at
            )
          `
        )
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (membershipError) {
        throw membershipError;
      }

      if (!membership) {
        setTeam(null);
        setError(
          "You are not part of a team yet. Please create or join a team first."
        );
        return;
      }

      if (!membership.teams) {
        setTeam(null);
        setError(
          "Your team could not be found. Please contact the organizers."
        );
        return;
      }

      const currentTeam = membership.teams;

      const { count: memberCount } = await supabase
        .from("team_members")
        .select("user_id", { count: "exact", head: true })
        .eq("team_id", currentTeam.id);

      setTeam({
        id: currentTeam.id,
        code: currentTeam.code,
        role: membership.role,
        memberCount: memberCount ?? 1,
      });

      if (memberCount !== null && memberCount < 2) {
        setError(
          "Your team currently has fewer than 2 members. At least 2 members are required to submit."
        );
      }

      // ------------------------------------------------------
      // STEP 3 — FIND EXISTING SUBMISSION
      // ------------------------------------------------------

      const {
        data: existingSubmission,
        error: submissionError,
      } = await supabase
        .from("submissions")
        .select(
          `
            id,
            team_id,
            submitted_by,
            problem_statement,
            theme,
            project_name,
            project_description,
            github_repo,
            figma_link,
            live_demo_link,
            demo_video_link,
            ppt_link,
            status,
            created_at
          `
        )
        .eq("team_id", currentTeam.code)
        .maybeSingle();

      if (submissionError) {
        throw submissionError;
      }

      // ------------------------------------------------------
      // STEP 4 — EXISTING SUBMISSION FOUND
      // ------------------------------------------------------

      if (existingSubmission) {
        setSubmission(existingSubmission);

        setFormData({
          projectName:
            existingSubmission.project_name || "",
          theme:
            existingSubmission.theme || "",
          problemStatement:
            existingSubmission.problem_statement || "",
          projectDescription:
            existingSubmission.project_description || "",
          githubRepo:
            existingSubmission.github_repo || "",
          figmaLink:
            existingSubmission.figma_link || "",
          liveDemoLink:
            existingSubmission.live_demo_link || "",
          demoVideoLink:
            existingSubmission.demo_video_link || "",
          pptLink:
            existingSubmission.ppt_link || "",
        });

        return;
      }

      // ------------------------------------------------------
      // STEP 5 — NO EXISTING SUBMISSION
      // ------------------------------------------------------

      setSubmission(null);

      setFormData({
        ...EMPTY_FORM,
      });
    } catch (err) {
      console.error(
        "LOAD SUBMISSION ERROR:",
        err
      );

      setError(
        err?.message ||
          "Unable to load your submission. Please refresh and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INPUT CHANGE
  // ==========================================================

  const handleChange = (id, value) => {
    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  // ==========================================================
  // URL VALIDATION
  // ==========================================================

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  // ==========================================================
  // FORM VALIDATION
  // ==========================================================

  const validateForm = () => {
    const emptyField = allFields.find(
      (field) =>
        !formData[field.id].trim()
    );

    if (emptyField) {
      return `Please fill in: ${emptyField.label}`;
    }

    const urlFields = allFields.filter(
      (field) => field.type === "url"
    );

    for (const field of urlFields) {
      if (
        !isValidUrl(
          formData[field.id].trim()
        )
      ) {
        return `Please enter a valid ${field.label}.`;
      }
    }

    return null;
  };

  // ==========================================================
  // SUBMIT / UPDATE
  // ==========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // --------------------------------------------------------
    // DEADLINE CHECK
    // --------------------------------------------------------

    if (new Date() >= SUBMISSION_DEADLINE) {
      setSubmissionClosed(true);
      setError("Submissions are now closed.");
      return;
    }

    setError("");
    setSuccess("");

    // --------------------------------------------------------
    // STEP 1 — VALIDATE
    // --------------------------------------------------------

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    // --------------------------------------------------------
    // STEP 2 — USER CHECK
    // --------------------------------------------------------

    if (!user) {
      setError(
        "Your session has expired. Please sign in again."
      );
      return;
    }

    // --------------------------------------------------------
    // STEP 3 — TEAM CHECK
    // --------------------------------------------------------

    if (!team || !team.code) {
      setError(
        "Your team could not be determined. Please refresh the page."
      );
      return;
    }

    if (team?.memberCount && team.memberCount < 2) {
      setError(
        "Your team needs at least 2 members before you can submit a project."
      );
      return;
    }

    setSubmitting(true);

    try {
      // ------------------------------------------------------
      // STEP 4 — PREPARE DATA
      // ------------------------------------------------------

      const sharedFields = {
        project_name:
          formData.projectName.trim(),

        theme:
          formData.theme.trim(),

        problem_statement:
          formData.problemStatement.trim(),

        project_description:
          formData.projectDescription.trim(),

        github_repo:
          formData.githubRepo.trim(),

        figma_link:
          formData.figmaLink.trim(),

        live_demo_link:
          formData.liveDemoLink.trim(),

        demo_video_link:
          formData.demoVideoLink.trim(),

        ppt_link:
          formData.pptLink.trim(),

        status: "submitted",
      };

      // ======================================================
      // EXISTING SUBMISSION → UPDATE
      // ======================================================

      if (submission?.id) {
        const {
          error: updateError,
        } = await supabase
          .from("submissions")
          .update(sharedFields)
          .eq("id", submission.id)
          .eq("team_id", team.code);

        if (updateError) {
          console.error(
            "UPDATE SUBMISSION ERROR:",
            updateError
          );

          throw updateError;
        }

        setSubmission((previous) => ({
          ...previous,
          ...sharedFields,
        }));

        setSuccess(
          "Your submission has been updated successfully."
        );

        navigate("/register");

        return;
      }

      // ======================================================
      // NO EXISTING SUBMISSION → INSERT
      // ======================================================

      const insertPayload = {
        team_id: team.code,
        submitted_by: user.id,
        ...sharedFields,
      };

      const {
        error: insertError,
      } = await supabase
        .from("submissions")
        .insert([insertPayload]);

      // ------------------------------------------------------
      // INSERT FAILED
      // ------------------------------------------------------

      if (insertError) {
        console.error(
          "INSERT SUBMISSION ERROR:",
          insertError
        );

        if (insertError.code === "23505") {
          setError(
            "A submission already exists for your team. Loading it now..."
          );

          await loadSubmission();

          return;
        }

        throw insertError;
      }

      // ======================================================
      // INSERT SUCCEEDED
      // ======================================================

      setSubmission({
        id: null,
        ...insertPayload,
        created_at:
          new Date().toISOString(),
      });

      setError("");
      setSuccess("");

      setShowConfirmation(true);
    } catch (err) {
      console.error(
        "SUBMISSION ERROR:",
        err
      );

      if (err?.code === "42501") {
        setError(
          "You are not authorized to submit for this team."
        );
      } else if (
        err?.code === "23503"
      ) {
        setError(
          "Your team or user information is invalid."
        );
      } else if (
        err?.code === "23505"
      ) {
        setError(
          "A submission already exists for this team."
        );
      } else {
        setError(
          err?.message ||
            "Something went wrong while saving your submission. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-10 h-10 mx-auto mb-5 border-2 border-yellow-500/30 border-t-yellow-400 rounded-full animate-spin" />

          <p className="text-gray-400">
            Loading your submission...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================================
  // SUCCESS CONFIRMATION
  // ==========================================================

  if (
    showConfirmation &&
    submission
  ) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-xl"
        >

          <div className="rounded-2xl border border-yellow-500/20 bg-white/5 p-8 md:p-10 text-center backdrop-blur-md">

            {/* SUCCESS ICON */}

            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 200,
              }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center"
            >

              <span className="text-4xl text-green-400">
                ✓
              </span>

            </motion.div>

            {/* TITLE */}

            <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-semibold mb-3">
              SheVibes
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Project Submitted Successfully!
            </h1>

            <p className="text-gray-400 leading-relaxed mb-6">
              Your project has been successfully submitted
              and saved.
            </p>

            {/* TEAM */}

            {team && (
              <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/10 px-5 py-4 mb-6">

                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Team
                </p>

                <p className="text-xl font-semibold text-yellow-400">
                  {team.code}
                </p>

              </div>
            )}

            <p className="text-sm text-gray-500 mb-8">
              You can review or edit your response from this
              page.
            </p>

            {/* VIEW / EDIT */}

            <button
              type="button"
              onClick={async () => {
                setShowConfirmation(false);

                await loadSubmission();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold hover:from-yellow-400 hover:to-amber-500 transition-all"
            >
              View / Edit My Submission
            </button>

          </div>

        </motion.div>

      </div>
    );
  }

  // ==========================================================
  // FIELD RENDERER
  // ==========================================================

  const renderField = (field) => {
    const value =
      formData[field.id];

    return (
      <div
        key={field.id}
        className={
          field.span === "half"
            ? "md:col-span-1"
            : "md:col-span-2"
        }
      >

        <label
          htmlFor={field.id}
          className="flex items-baseline justify-between mb-2"
        >

          <span className="text-sm font-medium text-gray-300">
            {field.label}
          </span>

          {field.hint && (
            <span className="text-xs text-gray-500">
              {field.hint}
            </span>
          )}

          {field.maxLength && (
            <span className="text-xs text-gray-500">
              {value.length}/{field.maxLength}
            </span>
          )}

        </label>

        {field.type === "textarea" ? (

          <textarea
            id={field.id}
            rows={field.rows || 4}
            placeholder={field.placeholder}
            value={value}
            maxLength={field.maxLength}
            onChange={(event) =>
              handleChange(
                field.id,
                event.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all resize-none"
          />

        ) : field.type === "select" ? (

          <select
            id={field.id}
            value={value}
            onChange={(event) =>
              handleChange(
                field.id,
                event.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
          >

            <option
              value=""
              disabled
            >
              {field.placeholder}
            </option>

            {field.options.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-black"
                >
                  {option}
                </option>
              )
            )}

          </select>

        ) : (

          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            maxLength={field.maxLength}
            onChange={(event) =>
              handleChange(
                field.id,
                event.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all"
          />

        )}

      </div>
    );
  };

  // ==========================================================
  // MAIN FORM
  // ==========================================================

  return (
    <div className="min-h-screen text-white bg-black px-4 py-16 md:py-20">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-12"
        >

          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm font-semibold mb-3">
            SheVibes
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">

            {submission
              ? "Edit Your "
              : "Submit Your "}

            <span className="bg-gradient-to-r from-[#F6B433] to-white bg-clip-text text-transparent">
              Project
            </span>

          </h1>

          <p className="text-gray-400 max-w-xl mx-auto">

            {submission
              ? "Your team's saved response is loaded below. Make changes and update the submission."
              : "Complete your project submission using your team's information."}

          </p>

        </motion.div>

        {/* TEAM CARD */}

        {team && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mb-10 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5"
          >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Your Team
                </p>

                <p className="text-2xl font-bold text-yellow-400">
                  {team.code}
                </p>

              </div>

              <div className="text-sm text-gray-400">

                Role:{" "}

                <span className="text-white capitalize">
                  {team.role}
                </span>

              </div>

            </div>

          </motion.div>
        )}

        {/* EXISTING SUBMISSION NOTICE */}

        {submission && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-8 rounded-xl border border-green-500/20 bg-green-500/10 px-5 py-4"
          >

            <div className="flex items-center gap-3">

              <span className="text-green-400 text-xl">
                ✓
              </span>

              <div>

                <p className="text-green-400 font-medium">
                  Submission saved
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Your team's response has been loaded.
                  You can edit it and update the submission.
                </p>

              </div>

            </div>

          </motion.div>
        )}

        {/* FORM */}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-10"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >

          {sections.map(
            (section, sectionIndex) => (
              <motion.section
                key={section.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay:
                    0.1 +
                    sectionIndex * 0.08,
                }}
                className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
              >

                <div className="flex items-baseline justify-between mb-5">

                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F6B433]">
                    {section.title}
                  </h2>

                  {section.description && (
                    <p className="text-xs text-gray-500">
                      {section.description}
                    </p>
                  )}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

                  {section.fields.map(
                    renderField
                  )}

                </div>

              </motion.section>
            )
          )}

          {/* ERROR */}

          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
            >

              <p className="text-red-400 text-sm text-center">
                {error}
              </p>

            </motion.div>
          )}

          {/* SUCCESS */}

          {success && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3"
            >

              <p className="text-green-400 text-sm text-center">
                {success}
              </p>

            </motion.div>
          )}

          {/* ==================================================
              SUBMISSION BUTTON + ROUND 2 ANNOUNCEMENT
          ================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch pt-2">

            {/* ==================================================
                BOX 1 — SUBMISSION STATUS
            ================================================== */}

            <div className="flex flex-col justify-between bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm space-y-4">

              <div className="space-y-2">

                <span className="text-xs uppercase font-mono tracking-widest text-gray-400 font-bold block">
                  Submission Status
                </span>

                {submissionClosed ? (

                  <button
                    type="button"
                    disabled
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-gray-400 bg-gray-600/60 border border-gray-500/40 cursor-not-allowed shadow-inner transition-all flex items-center justify-center gap-2"
                  >

                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />

                    Submissions Closed

                  </button>

                ) : team?.memberCount && team.memberCount < 2 ? (

                  <button
                    type="button"
                    disabled
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-gray-400 bg-gray-600/60 border border-gray-500/40 cursor-not-allowed shadow-inner transition-all flex items-center justify-center gap-2"
                  >

                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />

                    Need at least 2 members to submit

                  </button>

                ) : (

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base text-black bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
                  >

                    {submitting ? (

                      <>

                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />

                        {submission
                          ? "Updating..."
                          : "Submitting..."}

                      </>

                    ) : (

                      <>

                        <span className="text-lg">
                          🚀
                        </span>

                        {submission
                          ? "Update Submission"
                          : "Submit Project"}

                      </>

                    )}

                  </button>

                )}

              </div>

              <p className="text-center text-xs text-gray-400 font-medium">

                {submissionClosed
                  ? "The submission window has ended."
                  : "Deadline: 16 September, 10:00 AM"}

              </p>

            </div>

            {/* ==================================================
                BOX 2 — ROUND 2 ANNOUNCEMENT
            ================================================== */}

            <div className="bg-gradient-to-br from-amber-500/15 via-pink-500/10 to-purple-500/15 border border-amber-500/30 rounded-2xl p-5 text-left backdrop-blur-md shadow-xl flex flex-col justify-between space-y-3">

              <div className="space-y-2">

                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm tracking-wide">
                  🔥 Round 2 Is Live!
                </div>

                <p className="text-xs text-gray-200 leading-relaxed font-normal">
                  The twist is officially here! Read the
                  challenge carefully, build your solution,
                  and submit your project before the deadline.
                </p>

                <div className="text-xs text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 rounded-xl p-2.5">
                  ⏰{" "}
                  <strong>
                    DEADLINE: 16 SEPTEMBER, 10:00 AM
                  </strong>
                </div>

                <p className="text-[11px] text-gray-300 leading-normal">
                  📁{" "}
                  <strong>
                    For submissions:
                  </strong>{" "}
                  PPT + coded prototype + demo video +
                  anything else that strengthens your idea.
                  We'll consider everything!
                </p>

              </div>

              <div className="text-xs font-extrabold text-pink-400 pt-2 border-t border-white/10 flex items-center justify-between">

                <span>
                  Think unique. Build crazy. 🔥
                </span>

              </div>

            </div>

          </div>

        </motion.form>

      </div>

    </div>
  );
};

export default Submission;