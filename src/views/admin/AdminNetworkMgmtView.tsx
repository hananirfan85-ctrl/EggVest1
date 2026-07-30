import React, { useState, useEffect } from 'react';
import { store } from '../../services/store';
import { NetworkBanner } from '../../types';
import { Image, Plus, Trash2, Edit3, CheckCircle2, Sparkles, Layout, Globe, ArrowLeft } from 'lucide-react';

interface AdminNetworkMgmtViewProps {
  onBack?: () => void;
}

export const AdminNetworkMgmtView: React.FC<AdminNetworkMgmtViewProps> = ({ onBack }) => {
  const [banners, setBanners] = useState<NetworkBanner[]>(store.getNetworkBanners());
  const [showAddModal, setShowAddModal] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badge, setBadge] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [bg, setBg] = useState('from-[#B71C1C] via-[#C62828] to-[#D32F2F]');

  useEffect(() => {
    const update = () => {
      setBanners(store.getNetworkBanners());
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) {
      alert('Please fill in Title and Image URL');
      return;
    }

    store.addNetworkBanner({
      title,
      subtitle: subtitle || 'Smart Poultry Network',
      badge: badge || 'Verified Unit',
      desc: desc || 'Continuous 24/7 automated layer flock monitoring.',
      bg: bg || 'from-[#B71C1C] via-[#C62828] to-[#D32F2F]',
      image
    });

    setMsg('New Network Image / Banner added successfully!');
    setTimeout(() => setMsg(null), 3000);
    setShowAddModal(false);

    // Reset
    setTitle('');
    setSubtitle('');
    setBadge('');
    setDesc('');
    setImage('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this network banner image?')) {
      store.deleteNetworkBanner(id);
      setMsg('Network banner removed');
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const presetImages = [
    {
      title: 'Bio-Secure Shed 4',
      badge: '3,000 Lohman Hens',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      desc: 'Smart climate controlled automated layer housing producing Grade-A eggs.',
      bg: 'from-[#1B5E20] via-[#2E7D32] to-[#43A047]'
    },
    {
      title: 'Automated Egg Grader',
      badge: '12,000 Eggs/Hour',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      desc: 'Optical egg sorting and weight grading machine for supermarket distribution.',
      bg: 'from-[#B71C1C] via-[#C62828] to-[#D32F2F]'
    },
    {
      title: 'Veterinary Feed Mill',
      badge: 'Organic Feed Formula',
      image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&w=800&q=80',
      desc: 'Precision nutrition feed blending unit ensuring maximum hen laying efficiency.',
      bg: 'from-[#880E4F] via-[#C62828] to-[#E53935]'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 font-['Poppins',sans-serif]">
      {/* HEADER */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#FFB300]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFB300]">Admin Network Gallery</span>
          </div>
          <h1 className="text-2xl font-black">Our Network Image Banners</h1>
          <p className="text-xs text-slate-400">
            Add, update, or remove images and banners shown in the "Our Network" carousel on the Home screen.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-lg transition cursor-pointer flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Network Image</span>
        </button>
      </div>

      {msg && (
        <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      {/* QUICK PRESET SAMPLE ADDERS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>1-Click Add Network Presets</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presetImages.map((preset, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2 min-w-0">
                <img src={preset.image} alt={preset.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 text-xs">
                  <h4 className="font-extrabold text-slate-900 truncate">{preset.title}</h4>
                  <span className="text-[10px] text-slate-500 block truncate">{preset.badge}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  store.addNetworkBanner({
                    title: preset.title,
                    subtitle: 'Verified Network Facility',
                    badge: preset.badge,
                    desc: preset.desc,
                    bg: preset.bg,
                    image: preset.image
                  });
                  setMsg(`Added preset: ${preset.title}`);
                  setTimeout(() => setMsg(null), 3000);
                }}
                className="px-3 py-1.5 bg-[#C62828] text-white text-[11px] font-bold rounded-xl hover:bg-[#A71C1C] transition cursor-pointer shrink-0"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BANNERS LIST & PREVIEWS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Banner Preview Card */}
            <div className={`p-5 text-white bg-gradient-to-r ${banner.bg} relative`}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 max-w-[70%]">
                  <span className="bg-white/20 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs border border-white/30">
                    {banner.badge}
                  </span>
                  <h3 className="text-base font-extrabold leading-tight">{banner.title}</h3>
                  <p className="text-xs font-bold text-amber-200">{banner.subtitle}</p>
                  <p className="text-[11px] text-red-100 leading-relaxed line-clamp-2 mt-1">{banner.desc}</p>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-white/10 p-1 border border-white/20 shrink-0 overflow-hidden shadow-inner">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="p-4 bg-slate-50 flex items-center justify-between border-t border-slate-200 text-xs">
              <span className="font-mono text-slate-500 font-bold">ID: {banner.id}</span>
              <button
                onClick={() => handleDelete(banner.id)}
                className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded-xl transition cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD BANNER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Image className="w-5 h-5 text-[#C62828]" />
                <span>Add Network Banner Image</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Climate Coop #5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Subtitle</label>
                <input
                  type="text"
                  placeholder="e.g. Automated Feed & Temperature Modulation"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Badge Tag</label>
                <input
                  type="text"
                  placeholder="e.g. 5,000 Layer Hens"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe this poultry facility or network highlight..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#C62828] text-slate-900 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-extrabold text-xs rounded-2xl shadow-md transition cursor-pointer"
              >
                Publish Network Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
