'use client';

export default function ScrollToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="mt-6 inline-flex items-center gap-2 text-xs text-[#555] hover:text-[#D4F542]
                 transition-colors duration-200 group"
    >
      <svg
        width="14" height="14" viewBox="0 0 14 14" fill="none"
        className="group-hover:-translate-y-0.5 transition-transform duration-200"
      >
        <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      回到顶部
    </button>
  );
}
