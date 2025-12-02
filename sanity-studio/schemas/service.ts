import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Dịch vụ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên dịch vụ",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "description",
      title: "Mô tả chi tiết",
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
    }),
    defineField({
      name: "features",
      title: "Tính năng / Ưu điểm",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Tên icon từ Lucide React (VD: Palette, Layers, Settings)",
    }),
    defineField({
      name: "image",
      title: "Hình ảnh đại diện",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Thư viện ảnh",
      type: "array",
      of: [
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
    }),
    defineField({
      name: "division",
      title: "Phân khúc",
      type: "string",
      options: {
        list: [
          { title: "Nội thất", value: "interior" },
          { title: "Nhân sự", value: "staffing" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricing",
      title: "Bảng giá",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Tên gói" },
            { name: "price", type: "string", title: "Giá" },
            { name: "description", type: "text", title: "Mô tả" },
            {
              name: "features",
              type: "array",
              title: "Tính năng",
              of: [{ type: "string" }],
            },
            { name: "isPopular", type: "boolean", title: "Phổ biến nhất" },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Đang hoạt động",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      division: "division",
      media: "image",
    },
    prepare({ title, division, media }) {
      return {
        title,
        subtitle: division === "interior" ? "Nội thất" : "Nhân sự",
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

