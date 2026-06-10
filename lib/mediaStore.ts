import "server-only";
import { getAdminClient, getReadClient } from "@/lib/supabase";

export const MEDIA_BUCKET = "media";

export type MediaItem = {
  name: string;
  path: string;
  url: string;
  size: number | null;
  updatedAt: string | null;
};

/** List all uploaded images (newest first). Returns [] if not configured. */
export async function listMedia(): Promise<MediaItem[]> {
  const supabase = getReadClient();
  if (!supabase) return [];

  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error || !data) return [];

  return data
    .filter((o) => o.name && o.id) // skip folder placeholders
    .map((o) => {
      const { data: pub } = supabase.storage
        .from(MEDIA_BUCKET)
        .getPublicUrl(o.name);
      return {
        name: o.name,
        path: o.name,
        url: pub.publicUrl,
        size: (o.metadata?.size as number) ?? null,
        updatedAt: (o.updated_at as string) ?? null,
      };
    });
}

/** Upload a file buffer. Requires the service-role client. */
export async function uploadMedia(
  fileName: string,
  bytes: ArrayBuffer,
  contentType: string
): Promise<MediaItem> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase storage is not configured.");

  const safe = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${Date.now()}-${safe}`;

  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, bytes, { contentType, upsert: false });
  if (error) throw new Error(error.message);

  const { data: pub } = supabase.storage
    .from(MEDIA_BUCKET)
    .getPublicUrl(path);
  return {
    name: safe,
    path,
    url: pub.publicUrl,
    size: bytes.byteLength,
    updatedAt: null,
  };
}

/** Delete a file by storage path. Requires the service-role client. */
export async function deleteMedia(path: string): Promise<void> {
  const supabase = getAdminClient();
  if (!supabase) throw new Error("Supabase storage is not configured.");
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}
