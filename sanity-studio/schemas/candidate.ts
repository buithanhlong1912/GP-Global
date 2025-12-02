import { defineType, defineField } from "sanity";

export default defineType({
  name: "candidate",
  title: "Ứng viên",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
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
      name: "dateOfBirth",
      title: "Ngày sinh",
      type: "date",
    }),
    defineField({
      name: "gender",
      title: "Giới tính",
      type: "string",
      options: {
        list: [
          { title: "Nam", value: "male" },
          { title: "Nữ", value: "female" },
          { title: "Khác", value: "other" },
        ],
      },
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Ảnh đại diện",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "resume",
      title: "CV/Hồ sơ",
      type: "file",
      options: {
        accept: ".pdf,.doc,.docx",
      },
    }),
    defineField({
      name: "experience",
      title: "Kinh nghiệm",
      type: "string",
      options: {
        list: [
          { title: "Chưa có kinh nghiệm", value: "none" },
          { title: "Dưới 1 năm", value: "under1" },
          { title: "1 - 2 năm", value: "1-2" },
          { title: "2 - 5 năm", value: "2-5" },
          { title: "Trên 5 năm", value: "over5" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "education",
      title: "Trình độ học vấn",
      type: "string",
      options: {
        list: [
          { title: "Chưa tốt nghiệp THPT", value: "below-highschool" },
          { title: "Tốt nghiệp THPT", value: "highschool" },
          { title: "Trung cấp / Cao đẳng", value: "college" },
          { title: "Đại học", value: "university" },
          { title: "Sau đại học", value: "postgraduate" },
        ],
      },
    }),
    defineField({
      name: "skills",
      title: "Kỹ năng / Chứng chỉ",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "desiredPosition",
      title: "Vị trí mong muốn",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desiredSalary",
      title: "Mức lương mong muốn",
      type: "number",
    }),
    defineField({
      name: "desiredLocation",
      title: "Địa điểm mong muốn",
      type: "string",
    }),
    defineField({
      name: "availability",
      title: "Khả năng đi làm",
      type: "string",
      options: {
        list: [
          { title: "Có thể đi làm ngay", value: "immediate" },
          { title: "Trong vòng 2 tuần", value: "2weeks" },
          { title: "Trong vòng 1 tháng", value: "1month" },
          { title: "Thỏa thuận", value: "negotiable" },
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
          { title: "Đang tìm việc", value: "active" },
          { title: "Đã có việc", value: "placed" },
          { title: "Không hoạt động", value: "inactive" },
        ],
      },
      initialValue: "active",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Ghi chú nội bộ",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "registeredAt",
      title: "Ngày đăng ký",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      position: "desiredPosition",
      status: "status",
      media: "avatar",
    },
    prepare({ title, position, status, media }) {
      const statusLabels: Record<string, string> = {
        active: "🟢 Đang tìm việc",
        placed: "🔵 Đã có việc",
        inactive: "⚪ Không hoạt động",
      };
      return {
        title,
        subtitle: `${position} - ${statusLabels[status] || status}`,
        media,
      };
    },
  },
});

