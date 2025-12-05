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
import testimonial from "./testimonial";
import faq from "./faq";
import client from "./client";
import homePage from "./homePage";

export const schemaTypes = [
  // Page Types
  homePage,

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
  testimonial,
  faq,
  client,

  // Settings
  siteSettings,
];

