import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument } from "../services/sanity";

const router = Router();

// Get all active jobs
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      location,
      type,
      search,
      page = 1,
      limit = 10,
      sort = "publishedAt",
    } = req.query;

    // Build GROQ query
    let filter = '_type == "job" && status == "active"';

    if (category) {
      filter += ` && category == "${category}"`;
    }
    if (location) {
      filter += ` && location match "${location}*"`;
    }
    if (type) {
      filter += ` && employmentType == "${type}"`;
    }
    if (search) {
      filter += ` && (title match "*${search}*" || company match "*${search}*")`;
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Count total
    const countQuery = `count(*[${filter}])`;
    const total = await fetchDocument<number>(countQuery);

    // Fetch jobs
    const query = `*[${filter}] | order(${sort} desc) [${offset}...${offset + Number(limit)}] {
      _id,
      title,
      slug,
      company,
      companyLogo,
      location,
      salary,
      employmentType,
      category,
      description,
      requirements,
      publishedAt,
      deadline,
      isHot,
      isUrgent
    }`;

    const jobs = await fetchDocuments(query);

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: total || 0,
        totalPages: Math.ceil((total || 0) / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách việc làm",
    });
  }
});

// Get job by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `*[_type == "job" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      company,
      companyLogo,
      location,
      salary,
      employmentType,
      category,
      description,
      requirements,
      benefits,
      publishedAt,
      deadline,
      status,
      isHot,
      isUrgent,
      contactInfo,
      vacancies
    }`;

    const job = await fetchDocument(query, { slug });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy việc làm",
      });
    }

    res.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thông tin việc làm",
    });
  }
});

// Get job categories with count
router.get("/meta/categories", async (req: Request, res: Response) => {
  try {
    const query = `{
      "categories": *[_type == "job" && status == "active"] {
        category
      } | {
        "logistics": count(*[category == "logistics"]),
        "san-xuat": count(*[category == "san-xuat"]),
        "lao-dong-pho-thong": count(*[category == "lao-dong-pho-thong"]),
        "ban-hang": count(*[category == "ban-hang"]),
        "van-phong": count(*[category == "van-phong"]),
        "ky-thuat": count(*[category == "ky-thuat"])
      }
    }`;

    const result = await fetchDocument(query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

// Get hot/urgent jobs
router.get("/featured/list", async (req: Request, res: Response) => {
  try {
    const query = `{
      "hot": *[_type == "job" && status == "active" && isHot == true] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        company,
        location,
        salary,
        publishedAt
      },
      "urgent": *[_type == "job" && status == "active" && isUrgent == true] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        company,
        location,
        salary,
        publishedAt
      }
    }`;

    const result = await fetchDocument(query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Get featured jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

export default router;

