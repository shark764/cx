import * as React from 'react';
import { BasicIconProps } from '@cx/types/icon';
import { IconContainer } from './IconContainer';

export const Calendar: React.FC<BasicIconProps> = ({
  onClick,
  size = 25,
  fill = 'grey',
  className,
  disabled = false,
}) => (
    <IconContainer size={size} className={className} onClick={onClick} disabled={disabled} fill={fill} >
      <svg
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
      >
        <g>
          <path
            d="M933.4,66.7H828.9c-13.5-33.3-46.3-56.9-84.4-56.9c-38.1,0-70.8,23.5-84.4,56.9H341.5C328,33.4,295.3,9.9,257.1,9.9s-70.8,23.5-84.4,56.9H66.6H10v56.6v810.2v56.6h56.6h866.8H990v-56.6V123.3V66.7H933.4z M710.1,123.3v-13.4c0-22.4,15.4-40.5,34.4-40.5c19,0,34.4,18.1,34.4,40.5v13.4v58.8c0,22.4-15.4,40.5-34.4,40.5s-34.4-18.1-34.4-40.5V123.3z M222.7,123.3L222.7,123.3l0-13.5c0-22.3,15.4-40.4,34.4-40.4c19,0,34.4,18.1,34.4,40.5v72.2c0,22.4-15.4,40.5-34.4,40.5c-19,0-34.4-18.1-34.4-40.5V123.3z M205.7,123.3v58.8c0,14.8,5,28.9,14.1,39.6c9.6,11.3,23.2,17.8,37.3,17.8c14.1,0,27.6-6.5,37.3-17.8c9.1-10.7,14.1-24.8,14.1-39.6v-58.8h384.6v58.8c0,14.8,5,28.9,14.1,39.6c9.6,11.3,23.2,17.8,37.3,17.8c14,0,27.6-6.5,37.3-17.8C790.9,211,796,197,796,182.1v-58.8h137.4v155.4H66.6V123.3H205.7z M66.6,933.5V295.8h866.8v637.8H66.6z"
            fill={fill}
          />
          <path
            d="M168.3,400.1v452.3H833V391.6H168.3V400.1z M600.2,687.5h-199V556.6h199V687.5L600.2,687.5z M617.1,556.6H816v130.8H617.1V556.6z M600.2,704.4v131h-199v-131H600.2z M185.3,556.6h198.9v130.8H185.3V556.6z M401.1,539.6v-131h199v131H401.1z M384.2,539.6H185.3v-131h198.9V539.6z M185.3,704.4h198.9v131H185.3V704.4z M617.1,835.5v-131H816v131H617.1z M816,539.6H617.1v-131H816V539.6z"
            fill={fill}
          />
        </g>
      </svg>
    </IconContainer>
  );
