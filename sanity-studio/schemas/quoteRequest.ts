import { defineType, defineField } from "sanity";

export default defineType({
  name: "quoteRequest",
  title: "Yêu cầu báo giá",
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
      name: "projectType",
      title: "Loại dự án",
      type: "string",
      options: {
        list: [
          { title: "Showroom / Cửa hàng", value: "showroom" },
          { title: "Nhà hàng / Quán ăn", value: "restaurant" },
          { title: "Cafe / Bar", value: "cafe" },
          { title: "Văn phòng", value: "office" },
          { title: "Khách sạn", value: "hotel" },
          { title: "Bảng hiệu / Signage", value: "signage" },
          { title: "ALU / CNC", value: "alu-cnc" },
          { title: "Khác", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "budget",
      title: "Ngân sách",
      type: "string",
      options: {
        list: [
          { title: "Dưới 100 triệu", value: "under-100m" },
          { title: "100 - 300 triệu", value: "100m-300m" },
          { title: "300 - 500 triệu", value: "300m-500m" },
          { title: "500 triệu - 1 tỷ", value: "500m-1b" },
          { title: "1 - 3 tỷ", value: "1b-3b" },
          { title: "Trên 3 tỷ", value: "over-3b" },
          { title: "Chưa xác định", value: "unknown" },
        ],
      },
    }),
    defineField({
      name: "area",
      title: "Diện tích (m²)",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Địa điểm thi công",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "timeline",
      title: "Thời gian dự kiến",
      type: "string",
      options: {
        list: [
          { title: "Gấp (dưới 1 tháng)", value: "urgent" },
          { title: "1 - 2 tháng", value: "1-2months" },
          { title: "2 - 3 tháng", value: "2-3months" },
          { title: "3 - 6 tháng", value: "3-6months" },
          { title: "Chưa xác định", value: "unknown" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Mô tả yêu cầu",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "attachments",
      title: "Tài liệu đính kèm",
      type: "array",
      of: [
        {
          type: "file",
          options: {
            accept: ".pdf,.doc,.docx,.jpg,.jpeg,.png",
          },
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Trạng thái",
      type: "string",
      options: {
        list: [
          { title: "Mới", value: "new" },
          { title: "Đã báo giá", value: "quoted" },
          { title: "Đang thương lượng", value: "negotiating" },
          { title: "Đã xác nhận", value: "confirmed" },
          { title: "Đã hủy", value: "cancelled" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "quotedAmount",
      title: "Số tiền báo giá",
      type: "number",
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
      projectType: "projectType",
      status: "status",
      date: "submittedAt",
    },
    prepare({ title, projectType, status, date }) {
      const statusLabels: Record<string, string> = {
        new: "🔴 Mới",
        quoted: "🟡 Đã báo giá",
        negotiating: "🟠 Đang thương lượng",
        confirmed: "🟢 Đã xác nhận",
        cancelled: "⚪ Đã hủy",
      };
      return {
        title,
        subtitle: `${projectType} - ${statusLabels[status] || status} - ${
          date ? new Date(date).toLocaleDateString("vi-VN") : ""
        }`,
      };
    },
  },
});

