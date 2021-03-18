import * as React from 'react';
import styled from 'styled-components';
import { HeaderGroup } from '@cx/components/Form/HeaderGroup';

const ExpandedRowContainer = styled.div`
  margin: 5px 3px 40px 3px;
  border: 1px solid lightgrey;
  border-radius: 5px;
`;

const SubComponentHeaders = styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 1fr;
`;
const SubComponent = styled.div`
  display: grid;
  padding: 10px 20px;
  grid-template-columns: 1fr 1fr;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const CenteredInfo = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const DetailsSpacing = styled.div`
  height: 20px;
`;


export const ExpandedRow: React.FC<any> = ({rowDetails}) => {
  return <ExpandedRowContainer>
  <SubComponentHeaders>
    <div>
      <b>{ rowDetails.original.col1 }</b>
    </div>
    <div>
      <b>Edit Shift</b>
    </div>
  </SubComponentHeaders>
  <SubComponent>
    <CenteredInfo>
      <HeaderGroup title="Details" >
        <Details>
          <div>Email: usersemail@company.com</div>
          <div>Team: Blue345</div>
          <div>Agreed hours per week: 40hr</div>
          <div>Date of employment: 01 Jan 2018</div>
          <div>End of employment: n/a</div>
          <div>TimeZone: America/NewYork</div>
        </Details>
      </HeaderGroup>
      <DetailsSpacing />

      <HeaderGroup title="Competencies" >
        <div>Competencies go here</div>
      </HeaderGroup>
      <DetailsSpacing />

      <HeaderGroup title="Restrictions" >
        <div>Restrictions go here</div>
      </HeaderGroup>
      <DetailsSpacing />

      <HeaderGroup title="Availability" >
        <div>Agent availability goes here</div>
      </HeaderGroup>
      <DetailsSpacing />

    </CenteredInfo>
    <CenteredInfo>
      <HeaderGroup title="Summary" >
        <div>Shift Length: 8 hours</div>
        <div>Paid hours: 8 hours</div>
        <div>Agent Availability: 07:00 AM - 09:00 PM</div>
      </HeaderGroup>
      <DetailsSpacing />

      <HeaderGroup title="Edit" >
        <div>Restrictions go here</div>
      </HeaderGroup>
      <DetailsSpacing />

      <HeaderGroup title="Actions" >
        <div>Agent availability goes here</div>
      </HeaderGroup>
      <DetailsSpacing />

    </CenteredInfo>
  </SubComponent>
  </ExpandedRowContainer>;
}