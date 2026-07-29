import React, { useState } from 'react';
import { store } from '../../services/store';
import { BlogPost } from '../../types';
import { Clock, User, Tag, ArrowRight } from 'lucide-react';

export const BlogView: React.FC = () => {
  const blogs = store.getBlogs();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {!selectedPost ? (
        <>
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Industry Research & Farm News
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Poultry Market Updates & Operational Insights
            </h1>
            <p className="text-slate-600 text-sm">
              In-depth articles written by our avian scientists, financial analysts, and farm managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-700 transition">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {post.author.split(',')[0]}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            ← Back to all posts
          </button>

          <span className="text-xs font-bold uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {selectedPost.category}
          </span>

          <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-200 pb-4">
            <span>By {selectedPost.author}</span>
            <span>•</span>
            <span>{selectedPost.publishedAt}</span>
            <span>•</span>
            <span>{selectedPost.readTime}</span>
          </div>

          <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-80 object-cover rounded-2xl shadow-md" />

          <div className="text-slate-700 text-sm leading-relaxed space-y-4 pt-4">
            <p className="font-semibold text-slate-900 text-base">{selectedPost.summary}</p>
            <p>{selectedPost.content}</p>
            <p>
              By combining sensor-driven microclimate monitoring with rigorous nutritional formulation (18% crude protein mash), OvumYield layer farms continuously achieve maximum Grade-A egg yields while reducing feed waste by up to 14%.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
