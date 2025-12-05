import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Trang chủ",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        {
          name: "interiorTitle",
          type: "string",
          title: "Tiêu đề mảng Nội thất",
          initialValue: "Thiết Kế & Thi Công Nội Thất",
        },
        {
          name: "interiorSubtitle",
          type: "string",
          title: "Tiêu đề phụ mảng Nội thất",
          initialValue: "Showroom, Nhà hàng, Văn phòng, Cửa hàng",
        },
        {
          name: "interiorImage",
          type: "image",
          title: "Ảnh hero mảng Nội thất",
          options: { hotspot: true },
        },
        {
          name: "interiorCtaText",
          type: "string",
          title: "Text CTA mảng Nội thất",
          initialValue: "Xem dự án",
        },
        {
          name: "interiorCtaLink",
          type: "string",
          title: "Link CTA mảng Nội thất",
          initialValue: "/noi-that",
        },
        {
          name: "staffingTitle",
          type: "string",
          title: "Tiêu đề mảng Nhân sự",
          initialValue: "Cung Ứng Nhân Sự Chuyên Nghiệp",
        },
        {
          name: "staffingSubtitle",
          type: "string",
          title: "Tiêu đề phụ mảng Nhân sự",
          initialValue: "Kho vận, Sản xuất, Lao động phổ thông",
        },
        {
          name: "staffingImage",
          type: "image",
          title: "Ảnh hero mảng Nhân sự",
          options: { hotspot: true },
        },
        {
          name: "staffingCtaText",
          type: "string",
          title: "Text CTA mảng Nhân sự",
          initialValue: "Tìm việc làm",
        },
        {
          name: "staffingCtaLink",
          type: "string",
          title: "Link CTA mảng Nhân sự",
          initialValue: "viec-lam",
        },
      ],
    }),

    // About Section
    defineField({
      name: "about",
      title: "Giới thiệu công ty",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Tiêu đề",
          initialValue: "Về VIETBUILD GROUP",
        },
        {
          name: "description",
          type: "text",
          title: "Mô tả ngắn",
          rows: 3,
        },
        {
          name: "content",
          type: "array",
          title: "Nội dung chi tiết",
          of: [{ type: "block" }],
        },
        {
          name: "image",
          type: "image",
          title: "Ảnh giới thiệu",
          options: { hotspot: true },
        },
        {
          name: "stats",
          type: "array",
          title: "Thống kê nổi bật",
          of: [
            {
              type: "object",
              fields: [
                { name: "number", type: "string", title: "Số liệu" },
                { name: "label", type: "string", title: "Nhãn" },
              ],
            },
          ],
        },
      ],
    }),

    // Reasons Section
    defineField({
      name: "reasons",
      title: "6 Lý do chọn chúng tôi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Tiêu đề" },
            { name: "description", type: "text", title: "Mô tả", rows: 2 },
            { name: "icon", type: "string", title: "Icon name" },
            { name: "image", type: "image", title: "Ảnh", options: { hotspot: true } },
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(6),
    }),

    // Services Preview
    defineField({
      name: "servicesPreview",
      title: "Dịch vụ nổi bật",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Tiêu đề",
          initialValue: "Dịch vụ của chúng tôi",
        },
        {
          name: "interiorServices",
          type: "array",
          title: "Dịch vụ Nội thất",
          of: [
            {
              type: "reference",
              to: [{ type: "service" }],
            },
          ],
        },
        {
          name: "staffingServices",
          type: "array",
          title: "Dịch vụ Nhân sự",
          of: [
            {
              type: "reference",
              to: [{ type: "service" }],
            },
          ],
        },
      ],
    }),

    // Combined Section
    defineField({
      name: "combinedSection",
      title: "Dự án - Việc làm - Đối tác",
      type: "object",
      fields: [
        {
          name: "projectsTitle",
          type: "string",
          title: "Tiêu đề dự án",
          initialValue: "Dự án tiêu biểu",
        },
        {
          name: "projects",
          type: "array",
          title: "Dự án nổi bật",
          of: [
            {
              type: "reference",
              to: [{ type: "project" }],
            },
          ],
        },
        {
          name: "jobsTitle",
          type: "string",
          title: "Tiêu đề việc làm",
          initialValue: "Việc làm mới nhất",
        },
        {
          name: "jobs",
          type: "array",
          title: "Việc làm nổi bật",
          of: [
            {
              type: "reference",
              to: [{ type: "job" }],
            },
          ],
        },
        {
          name: "partnersTitle",
          type: "string",
          title: "Tiêu đề đối tác",
          initialValue: "Đối tác tin cậy",
        },
        {
          name: "partners",
          type: "array",
          title: "Đối tác nổi bật",
          of: [
            {
              type: "reference",
              to: [{ type: "client" }],
            },
          ],
        },
      ],
    }),

    // Testimonials
    defineField({
      name: "testimonials",
      title: "Đánh giá khách hàng",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Tiêu đề",
          initialValue: "Khách hàng nói về chúng tôi",
        },
        {
          name: "testimonials",
          type: "array",
          title: "Đánh giá nổi bật",
          of: [
            {
              type: "reference",
              to: [{ type: "testimonial" }],
            },
          ],
        },
      ],
    }),

    // Contact CTA
    defineField({
      name: "contactCta",
      title: "Kêu gọi liên hệ",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Tiêu đề",
          initialValue: "Bắt đầu dự án của bạn",
        },
        {
          name: "description",
          type: "string",
          title: "Mô tả",
          initialValue: "Liên hệ ngay để được tư vấn miễn phí",
        },
        {
          name: "buttonText",
          type: "string",
          title: "Text button",
          initialValue: "Liên hệ tư vấn",
        },
        {
          name: "backgroundImage",
          type: "image",
          title: "Ảnh nền",
          options: { hotspot: true },
        },
      ],
    }),

    // SEO
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
        },
        {
          name: "metaDescription",
          type: "text",
          title: "Meta Description",
          rows: 3,
        },
        {
          name: "metaKeywords",
          type: "array",
          title: "Meta Keywords",
          of: [{ type: "string" }],
        },
        {
          name: "ogImage",
          type: "image",
          title: "OG Image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.interiorTitle",
    },
    prepare({ title }) {
      return {
        title: "Trang chủ",
      };
    },
  },
});