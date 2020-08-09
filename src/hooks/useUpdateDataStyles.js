import { useEffect } from 'react';
export const useUpdateDataStyles = (
  refs,
  activeKeys,
  currKey,
  visibleClass,
  animateClass
) => {
  useEffect(() => {
    if (refs.current) {
      const els = refs.current;
      els.map((item, i) => {
        return [
          activeKeys.includes(i)
            ? item.classList.add(visibleClass)
            : item.classList.remove(visibleClass),
          item.classList.remove(animateClass),

          currKey === i
            ? item.classList.add(animateClass)
            : item.classList.remove(animateClass)
        ];
      });
    }
  });
};
