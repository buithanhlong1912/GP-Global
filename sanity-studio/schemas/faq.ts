import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ - Câu hỏi thường gặp",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Câu hỏi",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Câu trả lời",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          { title: "Dịch vụ Nội thất", value: "interior" },
          { title: "Dịch vụ Nhân sự", value: "staffing" },
          { title: "Báo giá & Thi công", value: "pricing" },
          { title: "Chính sách & Bảo hành", value: "policy" },
          { title: "Tuyển dụng", value: "jobs" },
          { title: "Chung", value: "general" },
        ],
      },
    }),
    defineField({
      name: "service",
      title: "Dịch vụ liên quan",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "isPopular",
      title: "Phổ biến",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "question",
      category: "category",
      isPopular: "isPopular",
    },
    prepare({ title, category, isPopular }) {
      return {
        title,
        subtitle: `${category || ""} ${isPopular ? "🔥" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Thứ tự",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Phổ biến",
      name: "isPopularDesc",
      by: [{ field: "isPopular", direction: "desc" }],
    },
  ],
});