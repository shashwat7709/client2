import { supabase } from './supabaseClient';

const BUCKET = 'hero-images';
const TABLE = 'hero_images';

// Upload image to Supabase Storage and insert metadata into the table
export async function uploadHeroImage(file: File, alt: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
  // Upload to storage
  const { data: storageData, error: storageError } = await supabase.storage.from(BUCKET).upload(fileName, file);
  if (storageError || !storageData) {
    throw new Error('Failed to upload image to storage.');
  }
  // Get public URL
  let publicUrl = supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
  // Ensure '/public/' is present in the URL after '/object/'
  if (publicUrl && !publicUrl.includes('/object/public/')) {
    publicUrl = publicUrl.replace('/object/', '/object/public/');
  }
  if (!publicUrl) {
    // Clean up: remove file if URL generation fails
    await supabase.storage.from(BUCKET).remove([fileName]);
    throw new Error('Failed to generate public URL for image.');
  }
  // Insert metadata into DB
  const { data: dbData, error: dbError } = await supabase.from(TABLE).insert([{ url: publicUrl, alt }]).select().single();
  if (dbError) {
    // Clean up: remove file if DB insert fails
    await supabase.storage.from(BUCKET).remove([fileName]);
    throw dbError;
  }
  return dbData;
}

// Fetch all hero images
export async function fetchHeroImages() {
  const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

// Delete image from storage and table
export async function deleteHeroImage(id: number, url: string) {
  // Extract file name from URL
  const fileName = url.split('/').pop();
  await supabase.storage.from(BUCKET).remove([fileName]);
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

// Update image metadata (e.g., alt text)
export async function updateHeroImage(id: number, updates: { alt?: string }) {
  const { data, error } = await supabase.from(TABLE).update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
} 