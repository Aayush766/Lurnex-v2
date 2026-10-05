type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown };

const apiBase = (process.env.NEXT_PUBLIC_API_URL || "https://lurnex-me-server.onrender.com/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, readonly status: number, readonly retryAfter: string | null = null) {
    super(message);
    this.name = "ApiError";
  }
}

function sessionToken() { return typeof window === "undefined" ? null : localStorage.getItem("lumex_token"); }
function handleUnauthorized(response: Response, token: string | null) {
  if (response.status !== 401 || !token || typeof window === "undefined") return;
  localStorage.removeItem("lumex_token");
  localStorage.removeItem("lumex_user");
  window.dispatchEvent(new Event("lumex-auth-changed"));
  window.dispatchEvent(new Event("lumex-session-expired"));
}

/** Calls the configured Lurnex backend. Set NEXT_PUBLIC_API_URL in production. */
export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = sessionToken();
  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  handleUnauthorized(response, token);
  if (!response.ok) throw new ApiError((await response.json().catch(() => null))?.message || "Unable to complete your request.", response.status, response.headers.get("Retry-After"));
  return response.json() as Promise<T>;
}

export const learningApi = {
  registerStudent: (body: unknown) => api<{ token?: string; user?: StudentProfile }>("/auth/register-student", { method: "POST", body }),
  login: (body: { email: string; password: string }) => api<{ token: string; user: StudentProfile }>("/auth/login", { method: "POST", body }),
  requestPasswordReset: (body: { email: string }) => api<{ message?: string }>("/auth/forgot-password", { method: "POST", body }),
  resetPassword: (body: { email: string; code: string; password: string }) => api<{ message?: string }>("/auth/reset-password", { method: "POST", body }),
  getProfile: () => api<StudentProfile>("/students/me"),
  updateProfile: (body: Partial<StudentProfile>) => api<StudentProfile>("/students/me", { method: "PATCH", body }),
  uploadAvatar: async (file: File) => {
    const token = sessionToken();
    const body = new FormData();
    body.set("avatar", file);
    const response = await fetch(`${apiBase}/students/me/avatar`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {}, body });
    handleUnauthorized(response, token);
    if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Unable to upload profile picture.");
    return response.json() as Promise<{ avatarUrl: string }>;
  },
  getDashboard: () => api<StudentDashboard>("/students/me/dashboard"),
  getBlogs: () => api<unknown>("/blogs"),
  getBlog: (slug: string) => api(`/blogs/${slug}`),
  createBlog: (body: unknown) => api("/blogs", { method: "POST", body }),
  startAssessment: (body: unknown) => api<{ attemptId: string; token?: string; questions?: unknown[] }>("/assessments/public/start", { method: "POST", body }),
  submitAssessment: (attemptId: string, body: unknown) => api(`/assessments/public/${attemptId}/submit`, { method: "POST", body }),
  bookAssessmentSlot: (attemptId: string, body: { preferredSlot: string }) => api(`/assessments/public/${attemptId}/book-slot`, { method: "POST", body }),
};

export type StudentProfile = { id?: string; name: string; email: string; avatarUrl?: string; curriculum?: string; course?: string; grade?: string; school?: string; country?: string; mobile?: string; parentName?: string; parentEmail?: string; parentMobile?: string; emailVerified?: boolean };
export type StudentDashboard = { profile: StudentProfile; activity?: Array<{ id: string; type: string; title: string; createdAt: string; href?: string }>; downloads?: Array<{ id: string; title: string; createdAt: string; href?: string }>; forumQuestions?: Array<{ id: string; title: string; createdAt: string; href?: string }>; stats?: { learningActivities?: number; downloads?: number; forumQuestions?: number } };
