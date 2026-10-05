export enum LeadSource {
  COURSE_ENROLLMENT = "course_enrollment",
  ASSESSMENT_ENROLLMENT = "assessment_enrollment",
  SYLLABUS_ENROLLMENT = "syllabus_enrollment",
  INTERNAL_ASSESSMENT_ENROLLMENT = "internal_assessment_enrollment",
  RESOURCE_DOWNLOAD = "resource_download",
  RESOURCE_REQUEST = "resource_request",
  BROCHURE_REQUEST = "brochure_request",
  EXPERT_CALLBACK = "expert_callback",
  COUNSELLING_REQUEST = "counselling_request",
}

export function leadSourceFor(title: string): LeadSource {
  const value = title.toLowerCase();
  if (value.includes("internal assessment")) return LeadSource.INTERNAL_ASSESSMENT_ENROLLMENT;
  if (value.includes("syllabus") || value.includes("enroll for ib courses")) return LeadSource.SYLLABUS_ENROLLMENT;
  if (value.includes("assessment")) return LeadSource.ASSESSMENT_ENROLLMENT;
  if (value.includes("download") || value.includes("resource pack") || value.includes("prep material")) return LeadSource.RESOURCE_DOWNLOAD;
  if (value.includes("brochure")) return LeadSource.BROCHURE_REQUEST;
  if (value.includes("expert")) return LeadSource.EXPERT_CALLBACK;
  if (value.includes("counselling") || value.includes("counseling") || value.includes("counsellor") || value.includes("counselor") || value.includes("call") || value.includes("callback")) return LeadSource.COUNSELLING_REQUEST;
  if (value.includes("resource")) return LeadSource.RESOURCE_REQUEST;
  return LeadSource.COURSE_ENROLLMENT;
}
