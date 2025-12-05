import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument } from "../services/sanity";

const router = Router();

// Get all team members
router.get("/", async (req: Request, res: Response) => {
  try {
    const { department, featured } = req.query;

    // Build GROQ query
    let filter = '_type == "teamMember" && status == "active"';

    if (department) {
      filter += ` && department == "${department}"`;
    }
    if (featured === "true") {
      filter += ` && isFeatured == true`;
    }

    const query = `*[${filter}] | order(order asc, name asc) {
      _id,
      name,
      slug,
      position,
      department,
      bio,
      image,
      email,
      phone,
      linkedin,
      experience,
      education,
      certifications,
      skills,
      achievements,
      isFeatured,
      order,
      languages
    }`;

    const teamMembers = await fetchDocuments(query);

    res.json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error("Get team members error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách thành viên",
    });
  }
});

// Get team member by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `*[_type == "teamMember" && slug.current == $slug && status == "active"][0] {
      _id,
      name,
      slug,
      position,
      department,
      bio,
      image,
      gallery,
      email,
      phone,
      linkedin,
      experience,
      education,
      certifications,
      skills,
      achievements,
      isFeatured,
      order,
      languages,
      metaTitle,
      metaDescription
    }`;

    const teamMember = await fetchDocument(query, { slug });

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thành viên",
      });
    }

    res.json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    console.error("Get team member error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thông tin thành viên",
    });
  }
});

// Get team members by department
router.get("/department/:department", async (req: Request, res: Response) => {
  try {
    const { department } = req.params;

    const query = `*[_type == "teamMember" && department == $department && status == "active"] | order(order asc, name asc) {
      _id,
      name,
      slug,
      position,
      bio,
      image,
      email,
      linkedin,
      isFeatured,
      order
    }`;

    const teamMembers = await fetchDocuments(query, { department });

    res.json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error("Get team members by department error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách thành viên",
    });
  }
});

// Get featured team members
router.get("/featured/list", async (req: Request, res: Response) => {
  try {
    const { limit = 4 } = req.query;

    const query = `*[_type == "teamMember" && status == "active" && isFeatured == true] | order(order asc) [0...${Number(
      limit
    )}] {
      _id,
      name,
      slug,
      position,
      department,
      bio,
      image,
      email,
      linkedin,
      order
    }`;

    const teamMembers = await fetchDocuments(query);

    res.json({
      success: true,
      data: teamMembers,
    });
  } catch (error) {
    console.error("Get featured team members error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

// Get team departments
router.get("/meta/departments", async (req: Request, res: Response) => {
  try {
    const query = `*[_type == "teamMember" && status == "active"] {
      department
    } | department {
      department,
      "count": count(*)
    }`;

    const departments = await fetchDocuments(query);

    res.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Get departments error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

export default router;