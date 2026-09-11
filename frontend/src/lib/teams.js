import { supabase } from "./supabaseClient";

/**
 * ============================================================
 * TEAM / REGISTRATION SERVICE
 * ============================================================
 *
 * Workflow:
 *
 * 1. User signs in
 * 2. fetchMyProfile()
 * 3. completeRegistration()
 * 4. fetchMyTeam()
 *
 * If the user has no team:
 *    createTeam()
 *    OR
 *    joinTeam(code)
 *
 * After creating/joining:
 *    fetchMyTeam()
 *
 * If the user wants to leave:
 *    leaveTeam()
 *    fetchMyTeam()
 *
 * Database assumptions:
 *
 * profiles
 *   - id
 *   - full_name
 *   - github
 *   - college
 *   - phone
 *
 * teams
 *   - id
 *   - code
 *   - created_by
 *   - created_at
 *   - max_members
 *
 * team_members
 *   - team_id
 *   - user_id
 *   - role
 *   - joined_at
 *
 * IMPORTANT:
 * - teams uses `created_by`, NOT `leader_id`.
 * - We do NOT use profiles(...) inside the team_members query.
 *   Profiles are fetched separately to avoid requiring a
 *   team_members -> profiles relationship in Supabase.
 */

// ============================================================
// ERROR MESSAGES
// ============================================================

const ERROR_MESSAGES = {
  NOT_AUTHENTICATED: "Your session expired. Please sign in again.",

  REGISTRATION_INCOMPLETE:
    "Please complete your registration details first.",

  ALREADY_IN_TEAM:
    "You're already part of a team.",

  TEAM_NOT_FOUND:
    "No team found with that code. Double-check and try again.",

  TEAM_FULL:
    "That team already has 4 members.",

  CODE_GENERATION_FAILED:
    "Couldn't generate a unique team code. Please try again.",

  NOT_IN_TEAM:
    "You're not part of a team.",

  LEADER_CANNOT_LEAVE:
    "As team leader, you can't leave while teammates are still on the team.",

  FULL_NAME_REQUIRED:
    "Please enter your full name.",

  GITHUB_REQUIRED:
    "Please enter your GitHub username or profile link.",

  PROFILE_NOT_FOUND:
    "We couldn't find your profile. Try signing in again.",
};

// ============================================================
// ERROR HANDLING
// ============================================================

export function friendlyError(error) {
  const rawMessage =
    error?.message ||
    error?.details ||
    error?.hint ||
    "";

  const code = Object.keys(ERROR_MESSAGES).find((key) =>
    rawMessage.includes(key)
  );

  if (code) {
    return ERROR_MESSAGES[code];
  }

  return rawMessage || "Something went wrong. Please try again.";
}

// ============================================================
// PROFILE
// ============================================================

/**
 * Fetch the current user's profile.
 *
 * Returns:
 *   profile object
 *   null if no profile exists
 */
export async function fetchMyProfile(userId) {
  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// ============================================================
// REGISTRATION
// ============================================================

/**
 * Complete or update participant registration.
 */
export async function completeRegistration({
  fullName,
  github,
  college,
  phone,
}) {
  const { data, error } = await supabase.rpc(
    "upsert_registration",
    {
      p_full_name: fullName,
      p_github: github,
      p_college: college || null,
      p_phone: phone || null,
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

// ============================================================
// CREATE TEAM
// ============================================================

/**
 * Create a new team.
 *
 * The database function is responsible for:
 * - authentication check
 * - registration check
 * - checking whether user is already in a team
 * - generating a unique team code
 * - creating the team
 * - adding the creator as leader
 *
 * Expected successful result:
 * {
 *   id,
 *   code,
 *   ...
 * }
 */
export async function createTeam() {
  const { data, error } = await supabase.rpc("create_team");

  if (error) {
    throw error;
  }

  return data;
}

// ============================================================
// JOIN TEAM
// ============================================================

/**
 * Join an existing team using its team code.
 *
 * The database function is responsible for:
 * - authentication check
 * - registration check
 * - checking whether user is already in a team
 * - checking whether the team exists
 * - checking team capacity
 * - adding the user to the team
 */
export async function joinTeam(code) {
  const cleanCode = code?.trim().toUpperCase();

  if (!cleanCode) {
    throw new Error("TEAM_NOT_FOUND");
  }

  const { data, error } = await supabase.rpc(
    "join_team_by_code",
    {
      p_code: cleanCode,
    }
  );

  if (error) {
    throw error;
  }

  return data;
}

// ============================================================
// LEAVE TEAM
// ============================================================

/**
 * Leave the current team.
 *
 * The database function handles the business rules,
 * including preventing a leader from leaving while
 * teammates are still present.
 */
export async function leaveTeam() {
  const { error } = await supabase.rpc("leave_team");

  if (error) {
    throw error;
  }

  return true;
}

// ============================================================
// FETCH MY TEAM
// ============================================================

/**
 * Fetch the team that the current user belongs to.
 *
 * Returns null when the user is not in a team.
 *
 * Otherwise:
 *
 * {
 *   id,
 *   code,
 *   createdAt,
 *   leaderId,
 *   myRole,
 *   members: [
 *     {
 *       userId,
 *       role,
 *       joinedAt,
 *       name,
 *       github,
 *       college
 *     }
 *   ]
 * }
 */
export async function fetchMyTeam(userId) {
  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  // ----------------------------------------------------------
  // STEP 1
  // Find the team membership of the current user.
  // ----------------------------------------------------------

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
          created_at,
          created_by,
          max_members
        )
      `
    )
    .eq("user_id", userId)
    .maybeSingle();

  if (membershipError) {
    throw membershipError;
  }

  // User has no team.
  if (!membership) {
    return null;
  }

  // The membership exists but the related team is missing.
  if (!membership.teams) {
    throw new Error("TEAM_NOT_FOUND");
  }

  const team = membership.teams;

  // ----------------------------------------------------------
  // STEP 2
  // Fetch all members of this team.
  //
  // IMPORTANT:
  // We intentionally don't use:
  //
  // profiles(full_name, github, college)
  //
  // inside this query.
  //
  // This avoids depending on a team_members -> profiles
  // foreign-key relationship in Supabase.
  // ----------------------------------------------------------

  const {
    data: teamMembers,
    error: teamMembersError,
  } = await supabase
    .from("team_members")
    .select(
      `
        user_id,
        role,
        joined_at
      `
    )
    .eq("team_id", team.id)
    .order("joined_at", {
      ascending: true,
    });

  if (teamMembersError) {
    throw teamMembersError;
  }

  const members = teamMembers || [];

  // ----------------------------------------------------------
  // STEP 3
  // Collect member user IDs.
  // ----------------------------------------------------------

  const memberUserIds = members
    .map((member) => member.user_id)
    .filter(Boolean);

  // ----------------------------------------------------------
  // STEP 4
  // Fetch profiles separately.
  // ----------------------------------------------------------

  let profiles = [];

  if (memberUserIds.length > 0) {
    const {
      data: profileData,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select(
        `
          id,
          full_name,
          github,
          college
        `
      )
      .in("id", memberUserIds);

    if (profileError) {
      throw profileError;
    }

    profiles = profileData || [];
  }

  // ----------------------------------------------------------
  // STEP 5
  // Create a profile lookup map.
  //
  // Example:
  //
  // profileMap.get(userId)
  // ----------------------------------------------------------

  const profileMap = new Map(
    profiles.map((profile) => [
      profile.id,
      profile,
    ])
  );

  // ----------------------------------------------------------
  // STEP 6
  // Combine membership + profile information.
  // ----------------------------------------------------------

  const formattedMembers = members.map((member) => {
    const profile = profileMap.get(member.user_id);

    return {
      userId: member.user_id,

      role: member.role,

      joinedAt: member.joined_at,

      name: profile?.full_name || "",

      github: profile?.github || "",

      college: profile?.college || "",
    };
  });

  // ----------------------------------------------------------
  // STEP 7
  // Return a clean frontend-friendly team object.
  // ----------------------------------------------------------

  return {
    id: team.id,

    code: team.code,

    createdAt: team.created_at,

    // Database column:
    //     teams.created_by
    //
    // Frontend property:
    //     leaderId
    leaderId: team.created_by,

    maxMembers: team.max_members,

    myRole: membership.role,

    members: formattedMembers,
  };
}

// ============================================================
// REGISTRATION COUNT
// ============================================================

export async function fetchRegistrationCount() {
  // 1. Try RPC functions first (SECURITY DEFINER RPCs bypass RLS for anonymous website visitors)
  const rpcNames = [
    "get_registration_count",
    "get_total_registrations",
    "get_profiles_count",
    "get_user_count",
  ];

  for (const rpcName of rpcNames) {
    try {
      const { data, error } = await supabase.rpc(rpcName);
      if (!error && data !== null && data !== undefined) {
        const num = Number(data);
        if (!isNaN(num) && num > 0) {
          return num;
        }
      }
    } catch {
      // Continue to next RPC candidate
    }
  }

  // 2. Direct query on 'profiles' table (only used if count > 0, as RLS returns 0 for anon users)
  try {
    const { count, error } = await supabase
      .from("profiles")
      .select("id", { count: "exact", head: true });

    if (!error && typeof count === "number" && count > 0) {
      return count;
    }
  } catch (err) {
    console.warn("Error fetching profiles count directly:", err);
  }

  // 3. Fallback to get_registration_count RPC output even if 0
  try {
    const { data, error } = await supabase.rpc("get_registration_count");
    if (!error && data !== null && data !== undefined) {
      return Number(data) || 0;
    }
  } catch (err) {
    console.warn("Error fetching fallback RPC registration count:", err);
  }

  return 0;
}