import * as React from 'react';
import { IconContainer } from './IconContainer';
interface Props {
  className: string;
  dur?: number;
  width?: number;
  alternateFill?: string;
  animated?: boolean;
  onClick?: () => unknown;
  disabled?: boolean;
  fill?: string;
  status?: string;
}

const insightStatus = (status: string) => {
  if (status === 'success') {
    return '#008000'; // green
  } else if (status === 'error') {
    return '#ff0000'; // red;
  } else if (status === 'pending' || status === 'running') {
    return '#ff6600'; // orange
  } else {
    return '#808080'; // gray
  }
}

export const Insights: React.FC<Props> = ({
  dur = 2.0,
  width = 25,
  animated = false,
  className,
  onClick,
  disabled = false,
  status = ''
}) => {
  return (
    <IconContainer className={className} onClick={onClick} disabled={disabled} >
      <svg
        viewBox="0 0 24 24"
        width={width}
        fill={insightStatus(status)}
      >
        <path
          d="M21,8c-1.45,0-2.26,1.44-1.93,2.51l-3.55,3.56c-0.3-0.09-0.74-0.09-1.04,0l-2.55-2.55C12.27,10.45,11.46,9,10,9 c-1.45,0-2.27,1.44-1.93,2.52l-4.56,4.55C2.44,15.74,1,16.55,1,18c0,1.1,0.9,2,2,2c1.45,0,2.26-1.44,1.93-2.51l4.55-4.56 c0.3,0.09,0.74,0.09,1.04,0l2.55,2.55C12.73,16.55,13.54,18,15,18c1.45,0,2.27-1.44,1.93-2.52l3.56-3.55 C21.56,12.26,23,11.45,23,10C23,8.9,22.1,8,21,8z"
        >
        </path>

        {animated && <>
          <polygon
            points="15,9 15.94,6.93 18,6 15.94,5.07 15,3 14.08,5.07 12,6 14.08,6.93"
          >
            <animate
              repeatCount="indefinite"
              attributeName="opacity"
              type="scale"
              begin="-0.5s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur={`${dur}s`}
            />
          </polygon>
          <polygon
            points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"
          >
            <animate
              repeatCount="indefinite"
              attributeName="opacity"
              type="scale"
              begin="-0.75s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur={`${dur}s`}
            />
          </polygon>

          <polygon
            points="3.5,11 4,9 6,8.5 4,8 3.5,6 3,8 1,8.5 3,9"
            transform="scale(.70), translate(11,18)"
          >
            <animate
              repeatCount="indefinite"
              attributeName="opacity"
              type="scale"
              begin="-0.5s"
              calcMode="spline"
              keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
              values="0;1;0"
              keyTimes="0;0.5;1"
              dur={`${dur}s`}
            />
          </polygon>
        </>}
      </svg>
    </IconContainer>
  );
}