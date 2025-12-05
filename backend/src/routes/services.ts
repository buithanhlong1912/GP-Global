import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument } from "../services/sanity";

const router = Router();

// Get all services (both interior and staffing)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category, division, featured } = req.query;

    // Build GROQ query
    let filter = '_type == "service" && status == "active"';

    if (category) {
      filter += ` && category == "${category}"`;
    }
    if (division) {
      filter += ` && division == "${division}"`;
    }
    if (featured === "true") {
      filter += ` && isFeatured == true`;
    }

    const query = `*[${filter}] | order(order asc, title asc) {
      _id,
      title,
      slug,
      description,
      icon,
      image,
      category,
      division,
      features,
      process,
      pricing,
      isFeatured,
      order,
      ctaText,
      ctaLink
    }`;

    const services = await fetchDocuments(query);

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách dịch vụ",
    });
  }
});

// Get service by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `*[_type == "service" && slug.current == $slug && status == "active"][0] {
      _id,
      title,
      slug,
      description,
      content,
      icon,
      image,
      gallery,
      category,
      division,
      features,
      process,
      pricing,
      faq,
      portfolio,
      isFeatured,
      order,
      ctaText,
      ctaLink,
      metaTitle,
      metaDescription
    }`;

    const service = await fetchDocument(query, { slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy dịch vụ",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thông tin dịch vụ",
    });
  }
});

// Get services by division
router.get("/division/:division", async (req: Request, res: Response) => {
  try {
    const { division } = req.params;

    const query = `*[_type == "service" && division == $division && status == "active"] | order(order asc, title asc) {
      _id,
      title,
      slug,
      description,
      icon,
      image,
      category,
      features,
      isFeatured,
      order,
      ctaText,
      ctaLink
    }`;

    const services = await fetchDocuments(query, { division });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services by division error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách dịch vụ",
    });
  }
});

// Get service categories
router.get("/meta/categories", async (req: Request, res: Response) => {
  try {
    const query = `*[_type == "service" && status == "active"] {
      category,
      division
    } | category {
      category,
      "count": count(*),
      "division": select(
        category in ["thi-cong-tron-goi", "aluminum", "cnc", "signage"] => "interior",
        category in ["temp-staffing", "warehouse", "logistics", "labor-outsource"] => "staffing",
        "general"
      )
    }`;

    const categories = await fetchDocuments(query);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get service categories error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

export default router;