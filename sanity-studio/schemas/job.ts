import { defineType, defineField } from "sanity";

export default defineType({
  name: "job",
  title: "Việc làm",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tiêu đề việc làm",
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
      name: "company",
      title: "Công ty",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Logo công ty",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "location",
      title: "Địa điểm làm việc",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "salary",
      title: "Mức lương",
      type: "object",
      fields: [
        {
          name: "min",
          title: "Lương tối thiểu",
          type: "number",
        },
        {
          name: "max",
          title: "Lương tối đa",
          type: "number",
        },
        {
          name: "currency",
          title: "Đơn vị tiền tệ",
          type: "string",
          initialValue: "VND",
        },
        {
          name: "period",
          title: "Kỳ trả lương",
          type: "string",
          options: {
            list: [
              { title: "Giờ", value: "hour" },
              { title: "Ngày", value: "day" },
              { title: "Tháng", value: "month" },
              { title: "Năm", value: "year" },
            ],
          },
          initialValue: "month",
        },
        {
          name: "negotiable",
          title: "Lương thỏa thuận",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: "employmentType",
      title: "Loại hình công việc",
      type: "string",
      options: {
        list: [
          { title: "Toàn thời gian", value: "full-time" },
          { title: "Bán thời gian", value: "part-time" },
          { title: "Hợp đồng", value: "contract" },
          { title: "Thời vụ", value: "temporary" },
          { title: "Thực tập", value: "intern" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Ngành nghề",
      type: "string",
      options: {
        list: [
          { title: "Kho vận & Logistics", value: "logistics" },
          { title: "Sản xuất", value: "san-xuat" },
          { title: "Lao động phổ thông", value: "lao-dong-pho-thong" },
          { title: "Bán hàng & Marketing", value: "ban-hang" },
          { title: "Văn phòng", value: "van-phong" },
          { title: "Kỹ thuật", value: "ky-thuat" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả công việc",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "requirements",
      title: "Yêu cầu",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "benefits",
      title: "Quyền lợi",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Ngày đăng",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "deadline",
      title: "Hạn nộp hồ sơ",
      type: "date",
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Đang tuyển", value: "active" },
          { title: "Đã đóng", value: "closed" },
          { title: "Nháp", value: "draft" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isHot",
      title: "Việc làm HOT",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isUrgent",
      title: "Tuyển gấp",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "contactInfo",
      title: "Thông tin liên hệ",
      type: "object",
      fields: [
        { name: "name", type: "string", title: "Tên người liên hệ" },
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Số điện thoại" },
      ],
    }),
    defineField({
      name: "vacancies",
      title: "Số lượng tuyển",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      company: "company",
      status: "status",
      media: "companyLogo",
    },
    prepare({ title, company, status, media }) {
      const statusLabels: Record<string, string> = {
        active: "🟢 Đang tuyển",
        closed: "🔴 Đã đóng",
        draft: "⚪ Nháp",
      };
      return {
        title,
        subtitle: `${company} - ${statusLabels[status] || status}`,
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

