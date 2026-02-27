import { PostPlayerPropType } from "@/Types/PropType";

export default function PostPlayer({ post_url }: PostPlayerPropType) {
  const isVideo =
    post_url?.includes(".mp4") ||
    post_url?.includes(".webm") ||
    post_url?.includes(".mov") ||
    post_url?.includes("video");

  return (
    <div className="lg:col-span-9">
      <div className="relative bg-dark-card rounded-[2.5rem] overflow-hidden border border-border aspect-video  flex items-center justify-center group transition-all duration-300">
        {!post_url ? (
          <div className="animate-spin w-8 h-8 border-2 border-neon-purple/30 border-t-neon-purple rounded-full" />
        ) : isVideo ? (
          <video src={post_url} className="w-full h-full object-contain relative z-10" controls loop playsInline />
        ) : (
          <img src={post_url} alt="" className="w-full h-full object-contain relative z-10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
