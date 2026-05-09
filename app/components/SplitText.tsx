'use client';
import { useRef, useEffect, ElementType, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay before the first character starts (ms) */
  delay?: number;
  /** Time between each successive character (ms) */
  stagger?: number;
  /** Split mode: 'char' for Chinese / short strings, 'word' for spaced text */
  split?: 'char' | 'word';
}

/** Flatten React children into a plain string, then tokenise */
function tokenise(node: ReactNode, split: 'char' | 'word'): string[] {
  const flat = (n: ReactNode): string => {
    if (typeof n === 'string' || typeof n === 'number') return String(n);
    if (Array.isArray(n)) return n.map(flat).join('');
    return '';
  };
  const text = flat(node);
  return split === 'word' ? text.split(/(\s+)/) : Array.from(text);
}

export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 40,
  split = 'char',
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const tokens = tokenise(children, split);

  useEffect(() => {
    const wrapper = wrapRef.current;
    if (!wrapper) return;

    const chars = Array.from(
      wrapper.querySelectorAll<HTMLSpanElement>('.st-char')
    );

    const reveal = () => {
      chars.forEach((el, i) => {
        setTimeout(() => el.classList.add('st-visible'), delay + i * stagger);
      });
    };

    // threshold:0 fires as soon as even 1px enters the viewport
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          obs.disconnect();
        }
      },
      { threshold: 0 }
    );

    obs.observe(wrapper);
    return () => obs.disconnect();
  }, [delay, stagger]);

  return (
    <Tag ref={wrapRef} className={className} style={{ outline: 'none' }}>
      {tokens.map((token, i) => {
        // Preserve whitespace tokens as-is
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
        return (
          <span key={i} className="st-char">
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
