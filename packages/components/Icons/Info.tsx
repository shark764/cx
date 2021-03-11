import * as React from 'react';
import { IIcon } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export function Info({
  onClick, size = 25, fill = 'grey', className, disabled = false,
}: IIcon): React.ReactElement {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled}>
      <svg viewBox="0 0 202.978 202.978" width={size} fill={fill}>
        <path d="M100.942.001C44.9.304-.297 45.98.006 102.031c.293 56.051 45.998 101.238 102.02 100.945 56.081-.303 101.248-45.978 100.945-102.02C202.659 44.886 157.013-.292 100.942.001zm1.006 186.435c-46.916.234-85.108-37.576-85.372-84.492-.244-46.907 37.537-85.157 84.453-85.411 46.926-.254 85.167 37.596 85.421 84.483.245 46.935-37.595 85.166-84.502 85.42zm15.036-40.537l-.42-75.865-39.149.254.078 16.6 10.63-.059.313 59.237-11.275.039.088 15.857 49.134-.264-.098-15.847-9.301.048zm-14.919-87.062c9.575-.039 15.349-6.448 15.3-14.323-.254-8.07-5.882-14.225-15.095-14.186-9.184.059-15.173 6.292-15.134 14.362.049 7.865 5.892 14.216 14.929 14.147z" />
      </svg>
    </IconContainer>
  );
}
