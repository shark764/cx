import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Controller, Control } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import { Plus } from '@cx/components/Icons/Plus';


interface Props {
  control: Control;
  isFormSubmitting: boolean;
  defaultValue: unknown;
  name: string;
};

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0,0%,80%);
  padding: 10px 15px;
  outline: none;
`;

const MiniDate = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: 5px 0;
`;
const Trashcan = styled(DeleteIcon)`
  color: #808080a6;
  visibility: hidden;
  cursor: pointer;
`;
const PositionedPlus = styled(Plus)`
  visibility: hidden;
  margin-top: 70px;
`;
const RangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 50px;
  justify-items: center;
  &:hover ${Trashcan} {
    visibility: visible;
  }
  &:hover ${PositionedPlus} {
    visibility: visible;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;


export const SeriesInput: React.VFC<Props> = ({control, name, isFormSubmitting, defaultValue}) =>
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ onChange }) => (
      <Series onChange={onChange} name={name} />
    )}
  />;

const Series = ({onChange, name}: any) => {


  const [series, setseries] = useState<any>([{competency: null, channel: null, direction: null}]);

  const add = (index: number) => {
    const newSeries = [...series];
    newSeries.splice(index + 1, 0, {competency: 'null', channel: 'null', direction: 'null'});
    setseries(newSeries);
  };
  const remove = (index: number) => {
    const newSeries = [...series];
    newSeries.splice(index, 1);
    setseries(newSeries);
  };

  const update = (type: string, val: string, index: number) => {
    const seriesToUpdate = series[index];
    const newSeries = {...seriesToUpdate, [type]: val}
    const tempArray = [...series];
    tempArray.splice(index, 1, newSeries);
    setseries(tempArray);
  };

  useEffect(() => {
    onChange(series)
  }, [series]);

  return (
    <span>

      {series.map(({competency, channel, direction}: any, index: number) => {
        return <RangeContainer key={index} >
          <div style={{margin: '20px 0', width: '100%'}}>
            <MiniDate>
              <span>Competence</span>
              <Input
                className={name + '_competency'}
                onChange={({target}: any) => { update('competency', target.value, index) }}
              />
            </MiniDate>
            <MiniDate>
              <span>Channel</span>
              <Input
                className={name + '_channel'}
                onChange={({target}: any) => { update('channel', target.value, index) }}
              />
            </MiniDate>
            <MiniDate>
              <span>Direction</span>
              <Input
                className={name + '_direction'}
                onChange={({target}: any) => { update('direction', target.value, index) }}
              />
            </MiniDate>
        </div>
            <Controls >
              <Trashcan onClick={() => remove(index)}  fontSize="small" />
              <PositionedPlus onClick={() => add(index)} size={15} />
            </Controls>
          </RangeContainer>
      })}
    </span>
  );
};