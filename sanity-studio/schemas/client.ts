import { defineType, defineField } from "sanity";

export default defineType({
  name: "client",
  title: "Khách hàng / Đối tác",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên công ty",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "industry",
      title: "Ngành nghề",
      type: "string",
      options: {
        list: [
          { title: "Nhà hàng & F&B", value: "restaurant" },
          { title: "Bán lẻ", value: "retail" },
          { title: "Văn phòng", value: "office" },
          { title: "Sản xuất", value: "manufacturing" },
          { title: "Logistics", value: "logistics" },
          { title: "Giáo dục", value: "education" },
          { title: "Y tế", value: "healthcare" },
          { title: "Khác", value: "other" },
        ],
      },
    }),
    defineField({
      name: "type",
      title: "Loại hình",
      type: "string",
      options: {
        list: [
          { title: "Khách hàng", value: "client" },
          { title: "Đối tác", value: "partner" },
          { title: "Cả hai", value: "both" },
        ],
      },
      initialValue: "client",
    }),
    defineField({
      name: "testimonials",
      title: "Đánh giá từ khách hàng",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "testimonial" }],
        },
      ],
    }),
    defineField({
      name: "projects",
      title: "Dự án đã thực hiện",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Nổi bật",
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
      title: "name",
      industry: "industry",
      type: "type",
      media: "logo",
    },
    prepare({ title, industry, type, media }) {
      const typeLabels: Record<string, string> = {
        client: "Khách hàng",
        partner: "Đối tác",
        both: "Khách hàng & Đối tác",
      };
      return {
        title,
        subtitle: `${industry || ""} - ${typeLabels[type] || type}`,
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
      title: "Tên công ty",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
});