// 'use client';

// import React, { useState } from 'react';
// import { FiHeart, FiSend, FiChevronDown, FiChevronRight } from 'react-icons/fi';
// import Input from './ui/Input';

// interface Comment {
//   id: string;
//   username: string;
//   userAvatar?: string;
//   text: string;
//   likes: number;
//   timestamp: string;
//   isLiked?: boolean;
// }

// const placeholderComments: Comment[] = [
//   {
//     id: '1',
//     username: 'user123',
//     text: 'This is so cool! 🔥',
//     likes: 1234,
//     timestamp: '2h ago',
//     isLiked: false,
//   },
//   {
//     id: '2',
//     username: 'coolguy',
//     text: 'Amazing content! Keep it up!',
//     likes: 567,
//     timestamp: '5h ago',
//     isLiked: true,
//   },
//   {
//     id: '3',
//     username: 'tiktoker',
//     text: 'I can watch this all day 😍',
//     likes: 890,
//     timestamp: '1d ago',
//     isLiked: false,
//   },
//   {
//     id: '4',
//     username: 'fan_account',
//     text: 'Best video ever!',
//     likes: 234,
//     timestamp: '2d ago',
//     isLiked: false,
//   },
// ];

// export default function CommentSection() {
//   const [comments] = useState<Comment[]>(placeholderComments);
//   const [commentText, setCommentText] = useState('');
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section className="w-full max-w-7xl mx-auto bg-dark-light/60 rounded-2xl border border-neon-purple/25 backdrop-blur-sm">
//       <button
//         type="button"
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="w-full flex items-center gap-3 py-4 px-4 text-left border-b border-neon-purple/25 hover:bg-neon-purple/5 transition-all duration-300 rounded-t-xl hover:shadow-glow-purple"
//       >
//         {isOpen ? (
//           <FiChevronDown className="w-6 h-6 text-neon-cyan shrink-0" />
//         ) : (
//           <FiChevronRight className="w-6 h-6 text-neon-cyan shrink-0" />
//         )}
//         <span className="text-foreground font-semibold text-lg">Comments</span>
//         <span className="text-neon-purple text-base tabular-nums ml-1 font-medium">
//           {comments.length}
//         </span>
//       </button>

//       {isOpen && (
//         <>
//           <div className="flex gap-3 pt-6 pb-5 px-4">
//             <div className="flex-1 min-w-0">
//               <Input
//                 placeholder="Add a comment..."
//                 value={commentText}
//                 onChange={(e) => setCommentText(e.target.value)}
//                 className="bg-surface border-neon-purple/25 rounded-full py-3.5 text-base placeholder:text-gray-500 focus:ring-neon-purple focus:shadow-glow-purple"
//               />
//             </div>
//             <button
//               type="button"
//               disabled={!commentText.trim()}
//               className="shrink-0 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none hover:bg-white/90 hover:scale-110 transition-all duration-300 active:scale-95 font-bold"
//             >
//               <FiSend className="w-5 h-5" />
//             </button>
//           </div>

//           <ul className="space-y-0 max-h-[28rem] overflow-y-auto">
//             {comments.map((comment) => (
//               <li
//                 key={comment.id}
//                 className="flex gap-4 py-5 px-4 border-b border-neon-purple/15 last:border-0 hover:bg-neon-purple/5 transition-colors duration-200"
//               >
//                 <div className="shrink-0">
//                   {comment.userAvatar ? (
//                     <img
//                       src={comment.userAvatar}
//                       alt=""
//                       className="w-12 h-12 rounded-full object-cover bg-surface-muted border border-neon-cyan/25"
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-neon-cyan text-base font-medium border border-neon-cyan/25">
//                       {comment.username.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-baseline gap-2 flex-wrap">
//                     <span className="text-foreground font-semibold text-base">
//                       {comment.username}
//                     </span>
//                     <span className="text-gray-400 text-sm">
//                       {comment.timestamp}
//                     </span>
//                   </div>
//                   <p className="text-gray-300 text-base mt-1 leading-relaxed">
//                     {comment.text}
//                   </p>
//                   <button
//                     type="button"
//                     className="mt-2 flex items-center gap-1.5 text-gray-400 hover:text-neon-pink hover:shadow-glow-pink transition-all duration-300 text-sm hover:scale-105 font-semibold"
//                   >
//                     <FiHeart
//                       className={`w-4 h-4 transition-all ${
//                         comment.isLiked ? 'text-neon-pink fill-neon-pink' : ''
//                       }`}
//                     />
//                     <span>{comment.likes > 0 ? comment.likes.toLocaleString() : 'Like'}</span>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </section>
//   );
// }
