import { DateTime } from 'luxon';
import styled from 'styled-components';
import { BulkAdjustment } from './bulkAdjustment';

const Cell = styled.div`
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 60%;
  margin-bottom: 20px;
  border-bottom: 1px solid #d3d3d382;
`;

export const BulkAdjustmentPanel = ({ adjustments, crud, intervalLength, refetchTimeline, timelineIsFetching, localBulkAdjustments, selectedChannels }: any) => {

  const selectedChannel = selectedChannels?.[0] || '';

  const deleteSavedAdjustment = (details: any) => {
    return crud.delete({...details});
  };
  const saveNewAdjustment = (details: any) => {
    return crud.create({
      ...details
    });
  };
  const updateSavedAdjustment = (details: any) => {
    return crud.update({
      ...details
    });
  };
  const adjustmentCrud = {create: saveNewAdjustment, update: updateSavedAdjustment, delete: deleteSavedAdjustment, refresh: crud.refresh };

  const multiIntervalAdjustments =  adjustments
    .filter(({numberOfIntervals}: any) => numberOfIntervals > 1)
    .filter(({channel}: any) => channel === selectedChannel);

  if (!localBulkAdjustments) {
    return null;
  };
  const [ [
    // eslint-disable-next-line
    _,
    firstItem] ]: any = Object.entries( localBulkAdjustments );
    const start = DateTime.fromISO(firstItem?.start?.timestamp);
    const end = DateTime.fromISO(firstItem?.end?.timestamp);
  return <div>
          <BulkAdjustment
            adjustmentKey="nco"
            starting={start|| null}
            ending={end || null}
            refetchTimeline={refetchTimeline}
            timelineIsFetching={timelineIsFetching}
            intervalLength={intervalLength}
            initValue={0}
            crud={adjustmentCrud}
          />

    { multiIntervalAdjustments.length > 0 ? <Divider /> : null }

    { multiIntervalAdjustments.map(({id, startDateTime, endDateTime, metric, value}: any) => {
      const starting = DateTime.fromISO(startDateTime);
      const ending = DateTime.fromISO(endDateTime);
      return AdjustmentCell({crud: adjustmentCrud, adjustmentKey: metric, id, refetchTimeline, timelineIsFetching, intervalLength , starting, ending, initValue: value})
    }
    )}
  </div>
};


export const AdjustmentCell = ( { id, ...rest }: any ) => {
  return <Cell key={id} >
    <BulkAdjustment
      {...rest}
      id={id}
    />
  </Cell>
};