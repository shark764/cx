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

export const BulkAdjustmentPanel = ({ adjustments, crud, intervalLength, refetchTimeline, timelineIsFetching, localBulkAdjustments }: any) => {

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

  const multiIntervalAdjustments =  adjustments.filter(({numberOfIntervals}: any) => numberOfIntervals > 1);

  return <div>
          <BulkAdjustment
            adjustmentKey="nco"
            starting={localBulkAdjustments?.adjustedNco?.start?.timestamp || null}
            ending={localBulkAdjustments?.adjustedNco?.end?.timestamp || null}
            refetchTimeline={refetchTimeline}
            timelineIsFetching={timelineIsFetching}
            intervalLength={intervalLength}
            initValue={0}
            crud={adjustmentCrud}
          />
        {localBulkAdjustments?.adjustedAht?.start?.timestamp &&
          <BulkAdjustment
            adjustmentKey="aht"
            starting={localBulkAdjustments?.adjustedNco?.start?.timestamp}
            ending={localBulkAdjustments?.adjustedNco?.end?.timestamp}
            refetchTimeline={refetchTimeline}
            timelineIsFetching={timelineIsFetching}
            intervalLength={intervalLength}
            initValue={0}
            crud={adjustmentCrud}
          />
        }

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