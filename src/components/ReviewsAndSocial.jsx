import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Share2, Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ReviewsAndSocial() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', city: '', rating: 0, text: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitState, setSubmitState] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch approved reviews
  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setReviews(data);
      })
      .catch(() => setReviews([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      setErrorMsg('Kripya star rating zaroor select karein!');
      return;
    }
    setSubmitState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitState('success');
        setFormData({ name: '', city: '', rating: 0, text: '' });
      } else {
        setErrorMsg(data.error || 'Kuch masla hua, dobara try karein.');
        setSubmitState('idle');
      }
    } catch {
      setErrorMsg('Server se connection nahi ho raha. Dobara try karein.');
      setSubmitState('idle');
    }
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Real reviews from real people. Order karo, setup share karo, yahan featured ho jao!
          </p>
        </div>

        {/* Approved Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {reviews.map((rev, i) => (
              <div
                key={rev._id || i}
                className="p-6 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#d4af37] mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < rev.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-neutral-600'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#222] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <span className="text-[10px] text-neutral-500">{rev.city}</span>
                  </div>
                  <span className="text-[10px] bg-[#1f1a0e] text-[#d4af37] px-2 py-0.5 rounded border border-[#d4af37]/30">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-16 grid md:grid-cols-3 gap-6">
            {['Art Lover 🎨', 'Car Enthusiast 🚗', 'Gamer 🎮'].map((label, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#141414] border border-dashed border-[#333] flex flex-col items-center justify-center text-center gap-3 min-h-[160px]">
                <p className="text-xs text-neutral-500">Pehle review ka intezaar hai!</p>
                <span className="text-[10px] bg-[#1f1a0e] text-[#d4af37] px-3 py-1 rounded-full border border-[#d4af37]/30 font-bold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Rate Us Form */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-20">

          {/* Left: Invitation Text */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c180e] border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Your Experience</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Apni Deewar Ki <br />
              <span className="text-[#d4af37]">Kahani Batao!</span>
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Kya aapne MultiCraft se wall art order ki hai? Apna honest experience share karein — aapki review approve hone ke baad is page par featured ho jayegi!
            </p>
            <ul className="space-y-2 text-xs text-neutral-400">
              {[
                "Apna sach likhein — hum appreciate karte hain!",
                "Review approve hone mein 24 ghante lag sakte hain.",
                "Behtar photo + review = website par featured post!"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#d4af37] mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626]">
            {submitState === 'success' ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-900/40 border-2 border-green-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-green-400" />
                </div>
                <h4 className="text-lg font-black text-white">Shukriya! 🎉</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Aapki review hamein mil gayi! Approval ke baad yeh is page par live ho jayegi.
                </p>
                <button
                  onClick={() => setSubmitState('idle')}
                  className="text-xs text-[#d4af37] hover:underline cursor-pointer"
                >
                  Aur ek review likhein →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h4 className="text-sm font-bold text-white mb-1">Rate Your Experience</h4>

                {/* Star Rating Selector */}
                <div>
                  <label className="block text-neutral-400 font-bold mb-2 uppercase tracking-wide">
                    Star Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-all ${
                            star <= (hoverRating || formData.rating)
                              ? 'fill-[#d4af37] text-[#d4af37] scale-110'
                              : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                    {formData.rating > 0 && (
                      <span className="text-[#d4af37] font-bold ml-1">
                        {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][formData.rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 font-bold mb-1 uppercase">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Aapka naam"
                      className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-bold mb-1 uppercase">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Karachi, Lahore..."
                      className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 uppercase">Your Review *</label>
                  <textarea
                    required
                    rows="3"
                    value={formData.text}
                    onChange={e => setFormData({ ...formData, text: e.target.value })}
                    placeholder="Apna honest experience share karein... quality kaisi thi, delivery kitni fast thi, frames ka look kaisa tha?"
                    className="w-full p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333] text-white focus:outline-none focus:border-[#d4af37] resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-[11px] bg-red-950/50 border border-red-800/50 px-3 py-2 rounded-lg">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b38f24] hover:from-[#e5c148] hover:to-[#c69f2e] text-black font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitState === 'loading' ? 'Submitting...' : 'Submit Review'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Instagram / Social Gallery Section */}
        <div className="rounded-3xl bg-[#111] border border-[#222] p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>@multicraft</span>
                  <span className="text-[10px] bg-[#222] text-[#d4af37] px-2 py-0.5 rounded font-mono">
                    Community
                  </span>
                </h3>
                <p className="text-xs text-neutral-400">Tag us in your setup to be featured</p>
              </div>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#d4af37] hover:underline"
            >
              Follow MultiCraft on Instagram →
            </a>
          </div>

          {/* 4 Social Art Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['art_1.jpg', 'art_2.jpg', 'art_3.jpg', 'art_4.jpg'].map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden group bg-black border border-[#262626]"
              >
                <img
                  src={`/products/${img}`}
                  alt="Social showcase"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>MultiCraft Setup</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
