import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Thành viên đội ngũ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Họ và tên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "position",
      title: "Chức vụ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Ảnh",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Giới thiệu",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "skills",
      title: "Kỹ năng",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "experience",
      title: "Kinh nghiệm",
      type: "string",
    }),
    defineField({
      name: "division",
      title: "Phân khúc",
      type: "string",
      options: {
        list: [
          { title: "Nội thất", value: "interior" },
          { title: "Nhân sự", value: "staffing" },
          { title: "Cả hai", value: "both" },
        ],
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Mạng xã hội",
      type: "object",
      fields: [
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "email", type: "string", title: "Email" },
      ],
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
      position: "position",
      media: "image",
    },
    prepare({ title, position, media }) {
      return {
        title,
        subtitle: position,
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
  ],
});

