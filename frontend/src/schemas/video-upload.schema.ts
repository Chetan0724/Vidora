import * as z from "zod";

const MAX_VIDEO_BYTES = 1024 * 1024 * 500;
const MAX_THUMBNAIL_BYTES = 1024 * 1024 * 5;

export const videoUploadSchema = z.object({
  videoFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Video file is required")
    .refine(
      (file) => file.size <= MAX_VIDEO_BYTES,
      `Video file must be less than ${MAX_VIDEO_BYTES / 1024 / 1024} MB`
    )
    .refine(
      (file) =>
        ["video/mp4", "video/x-matroska", "video/webm"].includes(file.type),
      "Only MP4, MKV, and WEBM formats are allowed"
    ),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title cannot exceed 50 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description cannot exceed 1000 characters"),

  tags: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    )
    .refine((arr) => arr.length > 0, "At least one tag is required"),

  category: z.enum(
    [
      "technology",
      "education",
      "entertainment",
      "music",
      "gaming",
      "sports",
      "news",
    ],
    {
      message: "Please select a valid category",
    }
  ),

  visibility: z.enum(["public", "unlisted", "private"], {
    message: "Please select a visibility option",
  }),

  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Thumbnail is required")
    .refine(
      (file) => file.size <= MAX_THUMBNAIL_BYTES,
      `Thumbnail must be less than ${MAX_THUMBNAIL_BYTES / 1024 / 1024} MB`
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Thumbnail must be JPG, PNG, or WEBP"
    )
    .optional(),
});

export type TvideoUploadSchema = z.infer<typeof videoUploadSchema>;
