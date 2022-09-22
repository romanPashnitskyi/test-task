import * as React from 'react';

export type RefCallback<T> = (newValue: T | null) => void;
export type RefObject<T> = React.MutableRefObject<T | null>;

export type ReactRef<T> = RefCallback<T> | RefObject<T> | null;

export const assignRef = <T>(ref: ReactRef<T>, value: T | null): ReactRef<T> => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
  return ref;
};
