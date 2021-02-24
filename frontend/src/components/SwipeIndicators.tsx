import { useEffect, useRef } from 'react';

interface Props {
  currentSwipeIndex: number;
  prevSwipeIndex: number;
  maxSwipeIndexes: number;
}

const SwipeIndicators: React.FC<Props> = ({
  currentSwipeIndex,
  prevSwipeIndex,
  maxSwipeIndexes,
}) => {
  const isInitialMount = useRef(true);
  const swipeIndicatorLeft = useRef<HTMLDivElement>(null);
  const swipeIndicatorRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent bounce animation on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;

      // Hide indicator if mounting on first or last list
      if (currentSwipeIndex === 0) {
        swipeIndicatorLeft.current?.classList.add('fade-out');
      } else if (currentSwipeIndex === maxSwipeIndexes - 1) {
        swipeIndicatorRight.current?.classList.add('fade-out');
      }
    } else {
      if (currentSwipeIndex < prevSwipeIndex) {
        swipeIndicatorLeft.current?.classList.add('bounce-left');
      } else if (currentSwipeIndex > prevSwipeIndex) {
        swipeIndicatorRight.current?.classList.add('bounce-right');
      }

      if (currentSwipeIndex === 0) {
        swipeIndicatorLeft.current?.classList.add('fade-out');
      } else if (currentSwipeIndex === maxSwipeIndexes - 1) {
        swipeIndicatorRight.current?.classList.add('fade-out');
      } else {
        document.querySelectorAll('.fade-out').forEach((thing) => {
          thing.classList.add('fade-in');
          thing.classList.remove('fade-out');
        });
      }
    }
  }, [currentSwipeIndex, prevSwipeIndex, maxSwipeIndexes]);

  const handleTransitionEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === 'bounceLeft') {
      swipeIndicatorLeft.current?.classList.remove('bounce-left');
    }
    if (event.animationName === 'bounceRight') {
      swipeIndicatorRight.current?.classList.remove('bounce-right');
    }

    if (event.animationName === 'fadeIn') {
      swipeIndicatorLeft.current?.classList.remove('fade-in');
      swipeIndicatorRight.current?.classList.remove('fade-in');
    }
  };

  return (
    <>
      <div
        className={`swipe-indicator swipe-indicator--left`}
        onAnimationEnd={(event) => handleTransitionEnd(event)}
        ref={swipeIndicatorLeft}
      >
        &laquo;
      </div>

      <div
        className={`swipe-indicator swipe-indicator--right`}
        onAnimationEnd={(e) => handleTransitionEnd(e)}
        ref={swipeIndicatorRight}
      >
        &raquo;
      </div>
    </>
  );
};

export default SwipeIndicators;
