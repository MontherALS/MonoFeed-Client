"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiUser, FiMaximize2 } from "react-icons/fi";
import Image from "next/image";
import { VideoCardPropsType } from "@/Types/PropType";

export default function VideoCard({ id, username, title, post_url, authorId, avatar }: VideoCardPropsType) {
  const videoRef = useRef<HTMLVideoElement>(null); //
  const cardRef = useRef<HTMLDivElement>(null); //
  const [count, setCount] = useState<number>(1);

  const isVideo =
    post_url.includes(".mp4") || post_url.includes(".webm") || post_url.includes(".mov") || post_url.includes("video");

  useEffect(() => {
    if (!isVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setCount((prev) => prev++);

          if (!videoRef.current) return;

          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (cardRef.current) {
      console.log(count);
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVideo]);

  return (
    <div ref={cardRef} className="w-full h-[90vh] p-2 flex justify-center bg-background snap-start">
      <div className="relative w-[55vh] max-w-3xl h-full p-0">
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
          <Link
            href={`/profile/${authorId}`}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-full bg-dark-light/90 backdrop-blur-xl border border-border hover:bg-dark-card hover:scale-105 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center overflow-hidden ring ring-neon-purple/25 group-hover:ring-neon-purple/50 transition-all">
              {avatar ? (
                <Image
                  src={avatar as string}
                  width={128}
                  height={128}
                  alt="avatar"
                  className="w-full h-full rounded-full hover:scale-105 duration-200 object-cover"
                />
              ) : (
                <FiUser
                  href="https://imgur.com/gallery/angel-devil-D5tjwNc#/t/pfp"
                  className="w-16 h-16 text-neon-purple"
                />
              )}
            </div>
            <span className="text-white font-medium text-sm pr-1 group-hover:text-neon-cyan transition-colors">
              {username}
            </span>
          </Link>

          <Link
            href={`/post/${id}`}
            className="w-12 h-12 rounded-full bg-dark-light/90 backdrop-blur-xl border border-border hover:bg-dark-card hover:rotate-180 transition-all duration-300 flex items-center justify-center group"
          >
            <FiMaximize2 className="w-5 h-5 text-white group-hover:text-neon-cyan transition-colors" />
          </Link>
        </div>

        <div className="relative w-full h-full rounded-xl overflow-hidden bg-dark-card">
          {isVideo ? (
            <video ref={videoRef} src={post_url} className="w-full h-full object-contain" loop playsInline controls />
          ) : (
            <img src={post_url} alt={title} className="w-full h-full object-contain" />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-5 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-bold text-lg leading-snug line-clamp-2">{title}</h3>
        </div>
      </div>
    </div>
  );
}
