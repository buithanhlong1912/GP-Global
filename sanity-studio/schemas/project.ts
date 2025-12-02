import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Dự án Nội thất",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tên dự án",
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
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Nội dung chi tiết",
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
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          { title: "Showroom", value: "showroom" },
          { title: "Nhà hàng", value: "restaurant" },
          { title: "Cafe", value: "cafe" },
          { title: "Văn phòng", value: "office" },
          { title: "Cửa hàng", value: "retail" },
          { title: "Nhà ở", value: "residential" },
          { title: "Bảng hiệu", value: "signage" },
          { title: "Khác", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Hình ảnh",
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "completedDate",
      title: "Ngày hoàn thành",
      type: "date",
    }),
    defineField({
      name: "client",
      title: "Khách hàng",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Địa điểm",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "area",
      title: "Diện tích",
      type: "string",
    }),
    defineField({
      name: "duration",
      title: "Thời gian thi công",
      type: "string",
    }),
    defineField({
      name: "testimonial",
      title: "Đánh giá khách hàng",
      type: "object",
      fields: [
        { name: "content", type: "text", title: "Nội dung" },
        { name: "author", type: "string", title: "Người đánh giá" },
        { name: "position", type: "string", title: "Chức vụ" },
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Dự án nổi bật",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "images.0",
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Ngày hoàn thành mới nhất",
      name: "completedDateDesc",
      by: [{ field: "completedDate", direction: "desc" }],
    },
  ],
});

