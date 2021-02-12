import * as React from 'react';
import styled from 'styled-components';

const TimeBarScheduleBox = styled.div`

`;
const Bar = styled.div`
height: 20px;
background: #07497a9c;
border-radius: 5px;
`;

export const TimeBarSchedule: React.FC<any> = () => {
    return <TimeBarScheduleBox>
        <Bar />
    </TimeBarScheduleBox>;
}