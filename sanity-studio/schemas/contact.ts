import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Yêu cầu liên hệ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Họ và tên",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Số điện thoại",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Công ty",
      type: "string",
    }),
    defineField({
      name: "subject",
      title: "Chủ đề",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Nội dung",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "source",
      title: "Nguồn",
      type: "string",
      options: {
        list: [
          { title: "Form liên hệ", value: "contact-form" },
          { title: "Yêu cầu báo giá", value: "quote-request" },
          { title: "Hỏi về việc làm", value: "job-inquiry" },
          { title: "Doanh nghiệp", value: "business-inquiry" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Mới", value: "new" },
          { title: "Đang xử lý", value: "in-progress" },
          { title: "Đã hoàn thành", value: "completed" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Ngày gửi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "notes",
      title: "Ghi chú nội bộ",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "assignedTo",
      title: "Người phụ trách",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subject: "subject",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, subject, status, date }) {
      const statusLabels: Record<string, string> = {
        new: "🔴 Mới",
        "in-progress": "🟡 Đang xử lý",
        completed: "🟢 Đã xong",
      };
      return {
        title,
        subtitle: `${subject} - ${statusLabels[status] || status} - ${
          date ? new Date(date).toLocaleDateString("vi-VN") : ""
        }`,
      };
    },
  },
  orderings: [
    {
      title: "Mới nhất",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});

