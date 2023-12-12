import type { MotionProps } from 'framer-motion';

export const InOut: MotionProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
  transition: {
    duration: 0.4,
    ease: 'easeInOut'
  }
};

export const InOutSlow: MotionProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  },
  transition: {
    duration: 0.6,
    ease: 'easeInOut'
  }
};

export const InOutToast: MotionProps = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: 20
  },
  transition: {
    duration: 0.18,
    ease: 'easeInOut'
  }
};

export const InOutZoom: MotionProps = {
  initial: {
    opacity: 0,
    z: -20
  },
  animate: {
    opacity: 1,
    z: 0
  },
  exit: {
    opacity: 0,
    z: -20
  },
  transition: {
    duration: 0.18,
    ease: 'easeInOut'
  }
};
