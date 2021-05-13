import * as React from 'react';
// import { useState, useMemo, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../../redux/store';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

export const AdjustmentPanel = (props: any) => {
  return (<Container>
    <div>{ props.original.nco }</div>
    <div>{ props.original.aht }</div>
    <div> * { props.original.adjustedNco }</div>
    <div> * { props.original.adjustedAht }</div>

    {/* Should be a lsit of applied adjustments? */}
    {/* get the main list of adjustments and match the ones applicable here? */}
    {/* fetch and store all query adjustments in state...  or at least just pull them into this component */}
  </Container>)
};