import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Observable, merge } from 'rxjs';
import { debounceTime, filter, pluck, skip, first } from 'rxjs/operators';

type ElementRefrence = React.RefObject<HTMLDivElement> | null;

export const resizeObservable$ = (elem: HTMLDivElement): Observable<ResizeObserverEntry> => {
  return new Observable(subscriber => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;
      const firstElement = entries[0];
      subscriber.next(firstElement);
    });
    resizeObserver.observe(elem);
    return function unsubscribe() {
      resizeObserver.unobserve(elem);
    }
  });
}

export const initialResize$ = (elem: HTMLDivElement): Observable<ResizeObserverEntry> => resizeObservable$(elem).pipe(
  first(),
);
export const debouncedResizes$ = (elem: HTMLDivElement): Observable<ResizeObserverEntry> => resizeObservable$(elem).pipe(
  skip(1),
  debounceTime(500)
);
export const resizeObserverDebounced$ = (elem: HTMLDivElement): Observable<ResizeObserverEntry> => merge(
  initialResize$(elem),
  debouncedResizes$(elem),
);

export const useDivWidth = (): [ElementRefrence, number] => {
  const ref: ElementRefrence = useRef(null);
  const [width, changeWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserverSubscription = resizeObserverDebounced$(element)
    .pipe(
      filter((elem: ResizeObserverEntry) => width !== elem.contentRect.width),
      pluck('contentRect', 'width')
    )
    .subscribe((width: number) => {
      changeWidth(width);
    });
    return () => resizeObserverSubscription.unsubscribe();

  }, [width]);

  return [ref, width];
};