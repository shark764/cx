import * as React from 'react';
import { useEffect } from 'react'
import styled from 'styled-components';
import { fromEvent, merge } from 'rxjs';
import { pluck, bufferCount, map, filter } from 'rxjs/operators';

const Spa = styled.span`
  position: relative;
`;
const Label = styled.span`
  font-style: italic;
  color:grey;
  margin-right: 10px;
`;
const Checkbox = styled.input`

`;

const keys$ = (domElement: any) => fromEvent(domElement, 'keydown').pipe(pluck('keyCode'));

const shortcutListener = (domElement: any, shortcuts: any) =>
  merge(...Array.from(shortcuts.keys())
    .map((k: any) => keys$(domElement).pipe(bufferCount(k.split(',').length, 1))))
    .pipe(
      map(s => s.toString()),
      filter(shortcut => Boolean(shortcuts.get(shortcut))),
      map(shortcut => shortcuts.get(shortcut))
);
export const SinglePointAdjustment = ({singlePointAdjustment, setSinglePointAdjustment}: any): any => {

  useEffect(() => {

    const shortcutDefinitions = new Map([
      ['38,38,40,40,37,39,37,39,66,65', () => window.open('http://localhost:3006/#/qwertyqwerty','_blank')], // konamiCodeFired
      ['16,84', () => setSinglePointAdjustment(!singlePointAdjustment)], // shift t
    ] as any);

    const s = shortcutListener(document.body, shortcutDefinitions)
      .subscribe((s) => s());
      return () => s.unsubscribe();
  }, [singlePointAdjustment, setSinglePointAdjustment]);

  return (
    <Spa>
      <Label>Time Span Selection</Label>
      <Checkbox checked={!singlePointAdjustment} title=" " placeholder=" " type="checkbox" onChange={({target: { checked }}) => setSinglePointAdjustment(!checked)} />
    </Spa>
  )
};
