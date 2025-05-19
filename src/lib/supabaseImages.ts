import { supabase } from "./supabaseClient";

// Delete hero image from storage and table
export async function deleteHeroImage(imageUrl: string) {
  // Extract the path from the public URL
  const url = new URL(imageUrl);
  const pathParts = url.pathname.split("/");
  // Find the bucket name and file path
  // Example: /storage/v1/object/public/hero-images/filename.jpg
  const bucketIndex = pathParts.indexOf("public") + 1;
  const bucket = pathParts[bucketIndex - 1]; // should be 'hero-images'
  const filePath = pathParts.slice(bucketIndex).join("/");

  // Remove from storage
  const { error: storageError } = await supabase.storage.from(bucket).remove([filePath]);
  if (storageError) return { error: storageError };

  // Remove from table
  const { error: tableError } = await supabase.from("hero_images").delete().eq("url", imageUrl);
  if (tableError) return { error: tableError };

  return { error: null };
} 