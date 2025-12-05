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
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
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
      name: "category",
      title: "Danh mục",
      type: "string",
      options: {
        list: [
          // Interior categories
          { title: "Thi công trọn gói", value: "thi-cong-tron-goi" },
          { title: "Aluminum & ALU", value: "aluminum" },
          { title: "CNC", value: "cnc" },
          { title: "Bảng hiệu & Signage", value: "signage" },
          { title: "Quầy bar", value: "bar-counter" },
          { title: "Showroom", value: "showroom" },
          // Staffing categories
          { title: "Cung ứng nhân sự thời vụ", value: "temp-staffing" },
          { title: "Nhân viên kho", value: "warehouse" },
          { title: "Logistics", value: "logistics" },
          { title: "Lao động phổ thông", value: "labor-outsource" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
      name: "process",
      title: "Quy trình thực hiện",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "step", type: "string", title: "Tên bước" },
            { name: "description", type: "text", title: "Mô tả" },
            { name: "duration", type: "string", title: "Thời gian" },
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      title: "Câu hỏi thường gặp",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Câu hỏi" },
            { name: "answer", type: "text", title: "Câu trả lời" },
          ],
        },
      ],
    }),
    defineField({
      name: "portfolio",
      title: "Dự án liên quan",
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
      name: "ctaText",
      title: "Text button kêu gọi hành động",
      type: "string",
      initialValue: "Tư vấn ngay",
    }),
    defineField({
      name: "ctaLink",
      title: "Link kêu gọi hành động",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Hoạt động", value: "active" },
          { title: "Tạm ẩn", value: "inactive" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
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

