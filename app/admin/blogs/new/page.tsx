import PostForm from "@/components/admin/PostForm";
import { isSupabaseConfigured } from "@/lib/packagesStore";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <p className="eyebrow">Blogs</p>
      <h1 className="mt-2 text-3xl">Write a post</h1>
      <div className="gold-rule mt-5" />
      <div className="mt-8">
        <PostForm mode="create" configured={isSupabaseConfigured} />
      </div>
    </div>
  );
}
