/**
 * Cloudinary configuration helpers.
 *
 * Image rendering is handled by `next-cloudinary`'s <CldImage /> component,
 * which reads `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` automatically. This module
 * centralises the cloud name and a URL builder for non-component usage.
 */
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "",
} as const;

/**
 * Build a delivery URL for a Cloudinary public ID.
 * Prefer <CldImage /> in components; use this for metadata/OG images, etc.
 */
export function cloudinaryUrl(publicId: string, transform = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transform}/${publicId}`;
}
