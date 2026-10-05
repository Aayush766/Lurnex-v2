# Backend and admin implementation prompt

Implement learner accounts for the Lurnex website frontend. Backend base URL is `https://lurnex-me-server.onrender.com/api`. Keep the existing `/auth/register-student` route compatible with lead captures, which may submit a registration without a password; learner account signup submits a `password` and guardian fields. The frontend calls the routes below and sends `Authorization: Bearer <token>` on authenticated requests.

## Registration and authentication

- `POST /auth/register-student`: accept `accountRegistration`, `name`, `email`, `password`, `mobile` (E.164), `course`/`curriculum`, `grade`, `school`, `country`, `parentName`, `parentEmail`, `parentMobile`, lead attribution fields. When `accountRegistration: true`, validate input, normalize email, hash the password with Argon2id or bcrypt, create a pending account, send a short-lived single-use email verification code, and return `{ requiresEmailVerification: true }` without a token. When the flag is absent/false (existing lead capture), preserve the current lead-only behavior and do not create a login account.
- `POST /auth/verify-email`: accept `{ email, code }`, enforce expiry and attempt limits, mark the matching account verified, then return `{ token, user }`.
- `POST /auth/login`: accept `{ email, password }`; reject unverified or invalid accounts with safe messages; return `{ token, user }`.
- Add resend-code and password-reset routes with rate limits, single-use expiring codes, and generic responses that do not reveal whether an email exists.
- `user` should include `id`, `name`, `email`, `emailVerified`, `avatarUrl`, `curriculum`, `course`, `grade`, `school`, `country`, `mobile`, `parentName`, `parentEmail`, and `parentMobile`. Never return password hashes or verification secrets.

## Learner profile and dashboard

- `GET /students/me`: return the authenticated learner profile.
- `PATCH /students/me`: validate and update editable profile fields. Email changes require re-verification; prevent changing role, verification status, or account ownership via this endpoint.
- `POST /students/me/avatar`: accept authenticated multipart form data under field `avatar`, validate actual file content as JPEG, PNG, or WebP with a 5 MB maximum, store via the project's approved object storage, and return `{ avatarUrl }`. Never trust the client MIME type alone and never accept an arbitrary URL as an upload.
- `GET /students/me/dashboard`: return `{ profile, stats, activity, downloads, forumQuestions }`. Activity records have `{ id, type, title, createdAt, href? }`; downloads and forum questions have `{ id, title, createdAt, href? }`. Scope every result to the authenticated learner.
- Record learning activity, successful resource downloads, and forum questions against the learner ID. Update existing assessment and forum endpoints to attach the authenticated user where available. Do not trust client-supplied user IDs.
- Add profile picture upload using the project's approved storage provider, enforce image MIME/size limits, and return a public `avatarUrl`; do not accept arbitrary unsafe URLs as uploaded files.
- The frontend accepts JPEG, PNG, or WebP up to 5 MB and calls `POST /students/me/avatar` with multipart field name `avatar`; enforce the same limits on the server and verify file signatures.

## Admin panel

- Add an Admin > Learners table with search by name/email, filters for verification status, curriculum, grade and registration date, sortable columns, pagination, and a learner detail view.
- Detail view shows student contact/profile fields, guardian name/email/phone, verification and account status, registration/attribution source, recent learning activity, downloads and forum questions.
- Add safe admin actions to suspend/reactivate an account and resend verification. Require server-side admin authorization and audit-log all changes.
- Keep lead records and registered learner accounts distinguishable; lead captures must not silently create credentials. Link a lead to an account only through a deliberate deduplication/conversion action.
- Protect student and guardian data with role-based access, input validation, rate limits and audit logging. Never expose one learner's records to another learner.

## Acceptance criteria

- A learner registers, receives an email code, verifies it, logs in, and receives a valid token.
- Profile reads/updates persist, and the frontend can load dashboard activity, downloads and forum questions.
- Admin can find and inspect the registered learner and guardian information without exposing secrets.
- Existing lead capture and admin lead workflows continue to work.
- Document the API responses and required environment variables for local development.
