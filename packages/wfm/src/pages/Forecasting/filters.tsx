import * as React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/core/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { DateTime } from 'luxon';
import { DateRange } from '@cx/components/DateRange';
import { forecasting } from '../../redux/reducers/forecasting';
import { main } from '../../redux/reducers/main';

const BoxDiv = styled.div`
  border: 1px solid #80808096;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: white;
`;

const FilterSections = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
  margin-bottom: 25px;
  display: inline-block;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function Filters() {

  const channelColors: any = {
    voice: '#0d84a5',
    messaging: '#ca472f',
    sms: '#9dd766',
    email: '#f6c85f',
    'work-item': '#6f4e7c',
  };
  const channeLabels: any = {
    voice: 'Voice',
    messaging: 'Messaging',
    sms: 'SMS',
    email: 'Email',
    'work-item': 'Work Item',
  };

  const channelOptions = [
    {label: 'Voice', value: 'voice', color: '#0d84a5'},
    {label: 'Messaging', value: 'messaging', color: '#ca472f'},
    {label: 'SMS', value: 'sms', color: '#9dd766'},
    {label: 'Email', value: 'email', color: '#f6c85f'},
    {label: 'Work Item', value: 'work-item', color: '#6f4e7c'},
  ];

  const forecastingStartDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.startDateTime);
  const forecastingEndDate = useSelector((state: RootState) => state.forecasting.historicalQueryParams.endDateTime);

  const selectedCompetence = useSelector((state: RootState) => state.forecasting.competence);
  const channels = useSelector((state: RootState) => state.main.channels).map((option) => ({
    value: option,
    label: channeLabels[option],
    color: channelColors[option],
  }));

  const competenceOptions = useSelector((state: RootState) =>
    state.main.competencies.map(({ id, name, type }) => ({ label: name, id }))
  );

  const dispatch = useDispatch();
  const {
    setCompetence,
    setStartDate,
    setEndDate
  } = forecasting.actions;
  const { setChannels } = main.actions;

  const handleDatesChanged = (dates: [Date, Date]) => {
    const formatDate = (date: any) => DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
    if (dates[0]) {
      dispatch(setStartDate(formatDate(dates[0])));
    }
    if (dates[1]) {
      dispatch(setEndDate(formatDate(dates[1])));
    }
  };

  const handleCompetenceChanged = (competenceId: any) => { dispatch(setCompetence(competenceId)) };

  const handleChannelsChanged = (channelsList: any) => { dispatch(setChannels(channelsList.map(({value}: any) => value))) };

  return (
    <BoxDiv>
      <Header>
        <Title> Forecasting filters </Title>
        <TextField
            id="select-competence"
            select
            label="Competency"
            value={selectedCompetence}
            onChange={({target: { value }}: any) => handleCompetenceChanged(value)}
            variant="outlined"
            style={{ width: '200px', margin: '10px 5px 5px 5px'}}
            size="small"
          >
            {competenceOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
      </Header>
      <FilterSections>

        <DateRange
          startDateTime={forecastingStartDate}
          endDateTime={forecastingEndDate}
          combinedOnchanges={(data: any) => handleDatesChanged(data)}
        />

        <span>

        <Autocomplete
          multiple
          id="select-channels"
          value={channels}
          onChange={(event, newValue) => {
            handleChannelsChanged(newValue);
          }}
          limitTags={3}
          options={channelOptions}
          getOptionLabel={(option: any) => option.label}
          isOptionEqualToValue={(a, b) => a.value === b.value }
          renderTags={(tagValue: any, getTagProps: any) =>
            tagValue.map((option: any, index: any) => (
              <Chip
                label={option.label}
                style={{ backgroundColor: option.color, color: 'white' }}
                {...getTagProps({ index })}
              />
            ))
          }
          style={{ minWidth: 200 }}
          renderInput={(params: any) => (
            <TextField size="small" {...params} label="Channels"/>
          )}
        />
        </span>

      </FilterSections>
    </BoxDiv>
  );
}
