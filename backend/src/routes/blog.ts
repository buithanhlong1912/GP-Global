import { Router, Request, Response } from "express";
import { fetchDocuments, fetchDocument } from "../services/sanity";

const router = Router();

// Get all blog posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      author,
      search,
      featured,
      page = 1,
      limit = 10,
      sort = "publishedAt",
    } = req.query;

    // Build GROQ query
    let filter = '_type == "post" && status == "published"';

    if (category) {
      filter += ` && category == "${category}"`;
    }
    if (author) {
      filter += ` && author._ref == "${author}"`;
    }
    if (featured === "true") {
      filter += ` && isFeatured == true`;
    }
    if (search) {
      filter += ` && (title match "*${search}*" || description match "*${search}*")`;
    }

    const offset = (Number(page) - 1) * Number(limit);

    // Count total
    const countQuery = `count(*[${filter}])`;
    const total = await fetchDocument<number>(countQuery);

    // Fetch posts
    const query = `*[${filter}] | order(${sort} desc) [${offset}...${offset + Number(limit)}] {
      _id,
      title,
      slug,
      description,
      mainImage,
      category,
      author->{
        _id,
        name,
        slug,
        image
      },
      publishedAt,
      readingTime,
      isFeatured,
      tags,
      metaTitle,
      metaDescription
    }`;

    const posts = await fetchDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: total || 0,
        totalPages: Math.ceil((total || 0) / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải danh sách bài viết",
    });
  }
});

// Get post by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const query = `*[_type == "post" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      slug,
      description,
      content,
      mainImage,
      category,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      publishedAt,
      readingTime,
      isFeatured,
      tags,
      tableOfContents,
      relatedPosts[]->{
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      },
      metaTitle,
      metaDescription,
      openGraph
    }`;

    const post = await fetchDocument(query, { slug });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tải thông tin bài viết",
    });
  }
});

// Get featured posts
router.get("/featured/list", async (req: Request, res: Response) => {
  try {
    const { limit = 3 } = req.query;

    const query = `*[_type == "post" && status == "published" && isFeatured == true] | order(publishedAt desc) [0...${Number(
      limit
    )}] {
      _id,
      title,
      slug,
      description,
      mainImage,
      category,
      author->{
        _id,
        name,
        slug,
        image
      },
      publishedAt,
      readingTime,
      tags
    }`;

    const posts = await fetchDocuments(query);

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get featured posts error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

// Get recent posts
router.get("/recent/list", async (req: Request, res: Response) => {
  try {
    const { limit = 5, exclude } = req.query;

    let filter = '_type == "post" && status == "published"';
    if (exclude) {
      filter += ` && _id != "${exclude}"`;
    }

    const query = `*[${filter}] | order(publishedAt desc) [0...${Number(
      limit
    )}] {
      _id,
      title,
      slug,
      description,
      mainImage,
      category,
      publishedAt,
      readingTime
    }`;

    const posts = await fetchDocuments(query);

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get recent posts error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

// Get post categories
router.get("/meta/categories", async (req: Request, res: Response) => {
  try {
    const query = `*[_type == "post" && status == "published"] {
      category
    } | category {
      category,
      "count": count(*)
    }`;

    const categories = await fetchDocuments(query);

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi",
    });
  }
});

export default router;