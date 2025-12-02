import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument } from "../services/sanity";

const router = Router();

// Get all projects
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      featured,
      page = 1,
      limit = 12,
    } = req.query;

    let filter = '_type == "project"';

    if (category && category !== "all") {
      filter += ` && category == "${category}"`;
    }
    if (featured === "true") {
      filter += " && isFeatured == true";
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Count
    const total = await fetchDocument<number>(`count(*[${filter}])`);

    // Fetch
    const query = `*[${filter}] | order(completedDate desc) [${offset}...${offset + Number(limit)}] {
      _id,
      title,
      slug,
      description,
      category,
      "image": images[0],
      completedDate,
      client,
      location,
      area
    }`;

    const projects = await fetchDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: total || 0,
        totalPages: Math.ceil((total || 0) / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách dự án",
    });
  }
});

// Get project by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
      category,
      images,
      completedDate,
      client,
      location,
      area,
      duration,
      testimonial,
      "relatedProjects": *[_type == "project" && category == ^.category && slug.current != $slug][0...4] {
        _id,
        title,
        slug,
        "image": images[0],
        category,
        location
      }
    }`;

    const project = await fetchDocument(query, { slug });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dự án",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thông tin dự án",
    });
  }
});

// Get project categories
router.get("/meta/categories", async (req: Request, res: Response) => {
  try {
    const query = `*[_type == "project"] {
      category
    } | unique(category)`;

    const categories = await fetchDocuments(query);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get project categories error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

// Get featured projects
router.get("/featured/list", async (req: Request, res: Response) => {
  try {
    const query = `*[_type == "project" && isFeatured == true] | order(completedDate desc) [0...6] {
      _id,
      title,
      slug,
      "image": images[0],
      category,
      location,
      area
    }`;

    const projects = await fetchDocuments(query);

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get featured projects error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

export default router;

