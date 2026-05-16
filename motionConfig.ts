export const fadeIn = {
  opacity: [0, 1],
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export const slideUp = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const stagger = {
  animate: {
    transition: { staggerChildren: 0.15 },
  },
};
