// Schema exports for Sanity Studio
import project from "./project";
import job from "./job";
import candidate from "./candidate";
import post from "./post";
import service from "./service";
import contactSubmission from "./contact";
import quoteRequest from "./quoteRequest";
import author from "./author";
import partner from "./partner";
import teamMember from "./teamMember";
import companyDocument from "./companyDocument";
import siteSettings from "./siteSettings";

export const schemaTypes = [
  // Content Types
  project,
  job,
  candidate,
  post,
  service,

  // Form Submissions
  contactSubmission,
  quoteRequest,

  // Supporting Types
  author,
  partner,
  teamMember,
  companyDocument,

  // Settings
  siteSettings,
];

