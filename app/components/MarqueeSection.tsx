const ITEMS = [
  'UI 组件库', 'Figma 模板', '设计系统', '插画素材',
  '字体资源', 'Motion 动效', '交互原型', '品牌规范',
  '配色方案', 'Icon 图标集', '落地页模板', '数据可视化',
];

export default function MarqueeSection() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-outer border-y border-[#1A1A1A] bg-[#0D0D0D] py-4 select-none">
      <div className="flex">
        {/* Two tracks give seamless loop */}
        {[0, 1].map((trackIdx) => (
          <div key={trackIdx} className="marquee-track" aria-hidden={trackIdx === 1}>
            {doubled.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 px-7 text-[13px] font-semibold text-[#555] whitespace-nowrap
                           hover:text-[#D4F542] transition-colors duration-200 cursor-default"
              >
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                  <circle cx="3" cy="3" r="3" fill="#D4F542" opacity="0.7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
