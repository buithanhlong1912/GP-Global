import { defineType, defineField } from "sanity";

export default defineType({
  name: "companyDocument",
  title: "Tài liệu công ty",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "file",
      title: "File tài liệu",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Loại tài liệu",
      type: "string",
      options: {
        list: [
          { title: "Hồ sơ năng lực", value: "profile" },
          { title: "Giấy phép", value: "license" },
          { title: "Chứng nhận", value: "certificate" },
          { title: "Brochure", value: "brochure" },
          { title: "Khác", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Ảnh thumbnail",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isPublic",
      title: "Cho phép tải xuống công khai",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
    },
    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        profile: "📄 Hồ sơ năng lực",
        license: "📜 Giấy phép",
        certificate: "🏆 Chứng nhận",
        brochure: "📑 Brochure",
        other: "📁 Khác",
      };
      return {
        title,
        subtitle: categoryLabels[category] || category,
      };
    },
  },
});

