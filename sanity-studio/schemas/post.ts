import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Bài viết",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề",
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
      name: "excerpt",
      title: "Tóm tắt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Nội dung",
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
        {
          type: "code",
          options: {
            language: "javascript",
            languageAlternatives: [
              { title: "JavaScript", value: "javascript" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
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
          { title: "Mẹo nội thất", value: "interior-tips" },
          { title: "Tư vấn nghề nghiệp", value: "career-advice" },
          { title: "Tin công ty", value: "company-news" },
          { title: "Insights ngành", value: "industry-insights" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Tác giả",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày xuất bản",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Bài viết nổi bật",
      type: "boolean",
      initialValue: false,
    }),
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
          name: "keywords",
          type: "array",
          title: "Keywords",
          of: [{ type: "string" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, category, date, media }) {
      const categoryLabels: Record<string, string> = {
        "interior-tips": "Mẹo nội thất",
        "career-advice": "Tư vấn nghề nghiệp",
        "company-news": "Tin công ty",
        "industry-insights": "Insights ngành",
      };
      return {
        title,
        subtitle: `${categoryLabels[category] || category} - ${
          date ? new Date(date).toLocaleDateString("vi-VN") : "Chưa xuất bản"
        }`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Mới nhất",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

