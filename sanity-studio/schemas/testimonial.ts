import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Đánh giá khách hàng",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên khách hàng",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Chức vụ",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Công ty",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Nội dung đánh giá",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Đánh giá (sao)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "project",
      title: "Dự án liên quan",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "service",
      title: "Dịch vụ liên quan",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({
      name: "isFeatured",
      title: "Nổi bật",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Đã duyệt", value: "approved" },
          { title: "Chờ duyệt", value: "pending" },
          { title: "Từ chối", value: "rejected" },
        ],
      },
      initialValue: "pending",
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
      title: "name",
      company: "company",
      content: "content",
      rating: "rating",
      media: "avatar",
    },
    prepare({ title, company, content, rating, media }) {
      return {
        title,
        subtitle: `${company || ""} - ${"⭐".repeat(rating || 5)}`,
        description: content?.substring(0, 100) + "...",
        media,
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
      title: "Mới nhất",
      name: "_createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
});