import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "vietbuild-studio",
  title: "VIETBUILD GROUP CMS",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Quản lý nội dung")
          .items([
            // Interior Division
            S.listItem()
              .title("Nội thất")
              .child(
                S.list()
                  .title("Nội thất")
                  .items([
                    S.documentTypeListItem("project").title("Dự án"),
                    S.documentTypeListItem("service")
                      .title("Dịch vụ")
                      .child(
                        S.documentList()
                          .title("Dịch vụ Nội thất")
                          .filter('_type == "service" && division == "interior"')
                      ),
                    S.documentTypeListItem("quoteRequest").title("Yêu cầu báo giá"),
                  ])
              ),

            // Staffing Division
            S.listItem()
              .title("Nhân sự")
              .child(
                S.list()
                  .title("Nhân sự")
                  .items([
                    S.documentTypeListItem("job").title("Việc làm"),
                    S.documentTypeListItem("candidate").title("Ứng viên"),
                    S.documentTypeListItem("service")
                      .title("Dịch vụ")
                      .child(
                        S.documentList()
                          .title("Dịch vụ Nhân sự")
                          .filter('_type == "service" && division == "staffing"')
                      ),
                  ])
              ),

            S.divider(),

            // Content
            S.documentTypeListItem("post").title("Bài viết"),
            S.documentTypeListItem("author").title("Tác giả"),

            S.divider(),

            // Contacts
            S.listItem()
              .title("Liên hệ & Form")
              .child(
                S.list()
                  .title("Liên hệ & Form")
                  .items([
                    S.documentTypeListItem("contactSubmission").title("Yêu cầu liên hệ"),
                    S.documentTypeListItem("quoteRequest").title("Yêu cầu báo giá"),
                  ])
              ),

            S.divider(),

            // Settings
            S.listItem()
              .title("Cấu hình")
              .child(
                S.list()
                  .title("Cấu hình")
                  .items([
                    S.documentTypeListItem("siteSettings").title("Cài đặt website"),
                    S.documentTypeListItem("partner").title("Đối tác"),
                    S.documentTypeListItem("teamMember").title("Đội ngũ"),
                    S.documentTypeListItem("companyDocument").title("Tài liệu công ty"),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});

