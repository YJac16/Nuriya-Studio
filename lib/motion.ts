export const MOTION = {
  nav: {
    duration: 200,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  dropdown: {
    duration: 180,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    translateY: 4,
  },
  reveal: {
    text: { translateY: 12, duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    card: { translateY: 16, duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    image: { translateY: 20, duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    portfolio: { translateY: 16, duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
  },
  stagger: 50,
  maxStagger: 200,
} as const;

export type RevealVariant = keyof typeof MOTION.reveal;

export function getStaggerDelay(index: number, step = MOTION.stagger): number {
  return Math.min(index * step, MOTION.maxStagger);
}
