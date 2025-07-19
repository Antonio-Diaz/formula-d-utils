import { forwardRef } from 'react';

function withAnimation<T extends HTMLElement>(Tag: React.ElementType) {
  return forwardRef<T, React.HTMLAttributes<T>>(({ className = '', ...rest }, ref) => (
    <Tag ref={ref} className={`${className} animate-bounce-in`} {...rest} />
  ));
}

export const motion = {
  div: withAnimation<HTMLDivElement>('div'),
  tr: withAnimation<HTMLTableRowElement>('tr'),
};
