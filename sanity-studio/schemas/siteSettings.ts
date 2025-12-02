import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Cài đặt Website",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên website",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả website",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
    }),
    defineField({
      name: "contactInfo",
      title: "Thông tin liên hệ",
      type: "object",
      fields: [
        { name: "companyName", type: "string", title: "Tên công ty" },
        { name: "address", type: "text", title: "Địa chỉ" },
        { name: "phone", type: "string", title: "Số điện thoại" },
        { name: "hotline", type: "string", title: "Hotline" },
        { name: "email", type: "string", title: "Email" },
        { name: "taxId", type: "string", title: "Mã số thuế" },
        { name: "workingHours", type: "string", title: "Giờ làm việc" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Mạng xã hội",
      type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "zalo", type: "url", title: "Zalo" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "youtube", type: "url", title: "YouTube" },
        { name: "tiktok", type: "url", title: "TikTok" },
        { name: "messenger", type: "url", title: "Messenger" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO mặc định",
      type: "object",
      fields: [
        { name: "defaultTitle", type: "string", title: "Tiêu đề mặc định" },
        {
          name: "defaultDescription",
          type: "text",
          title: "Mô tả mặc định",
          rows: 3,
        },
        {
          name: "defaultKeywords",
          type: "array",
          title: "Keywords mặc định",
          of: [{ type: "string" }],
        },
        { name: "ogImage", type: "image", title: "Ảnh OG mặc định" },
        { name: "googleVerification", type: "string", title: "Google Verification" },
      ],
    }),
    defineField({
      name: "scripts",
      title: "Scripts",
      type: "object",
      fields: [
        { name: "googleAnalytics", type: "string", title: "Google Analytics ID" },
        { name: "facebookPixel", type: "string", title: "Facebook Pixel ID" },
        { name: "zaloOA", type: "string", title: "Zalo OA ID" },
        { name: "customHeadScript", type: "text", title: "Custom Head Script" },
        { name: "customBodyScript", type: "text", title: "Custom Body Script" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
  },
});

