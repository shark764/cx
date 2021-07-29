import * as React from 'react';
import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { randomUniform } from 'd3';
import { useQuery } from 'react-query';
import { wfm } from '../../api';
import { RootState } from '../../redux/store';
import { DateTime } from 'luxon';
import TextField from '@material-ui/core/TextField';

import MenuItem from '@material-ui/core/MenuItem';

import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

const rand = (a:number,b:number) => Math.trunc(randomUniform(a, b)());
const valArray = [
  {value: 0, label: '0'},
  {value: 10, label: '10'},
  {value: 20, label: '20'},
  {value: 30, label: '30'},
  {value: 40, label: '40'},
  {value: 50, label: '50'},
  {value: 60, label: '60'},
  {value: 70, label: '70'},
  {value: 80, label: '80'},
  {value: 90, label: '90'},
  {value: 100, label: '100'},
]

export const Dev = () => {
  const competencies = useSelector((state: RootState) => state.main.competencies);

  //const channels = useSelector((state: RootState) => state.main.channels);

  const tenant_id = useSelector((state: RootState) => state.main.session.tenant_id);
  // Add historical data for last years may 1st plus 31 days   2020-05-20T00:00:00Z'
  // 1140 min in a day, 96 15 min intervals in a day
  // 900 seconds is 15 min
  /**
   * Starting with a day in the past, fill in some historical data for 31 days
   * Then go create a forecast for that data
   */
  const [startDate, setStartDate] = useState(DateTime.now().startOf('day').minus({years: 2}));
  const [totalDays, setTotalDays] = useState(355);
  const [competency_id, set_competency_id] = useState(null);
  const [channel, set_channel] = useState(null);
  const [aht, setAht] = useState([15, 20]);

  const [nco1, setNco1] = useState([1, 5]);
  const [nco2, setNco2] = useState([5, 15]);
  const [nco3, setNco3] = useState([15, 25]);
  const [nco4, setNco4] = useState([25, 30]);
  const [nco5, setNco5] = useState([15, 25]);
  const [nco6, setNco6] = useState([5, 15]);


  const bump = () => {
    setNco1([ nco1[0] + 5, nco1[1] + 5 ]);
    setNco2([ nco2[0] + 5, nco2[1] + 5 ]);
    setNco3([ nco3[0] + 5, nco3[1] + 5 ]);
    setNco4([ nco4[0] + 5, nco4[1] + 5 ]);
    setNco5([ nco5[0] + 5, nco5[1] + 5 ]);
    setNco6([ nco6[0] + 5, nco6[1] + 5 ]);

    setAht([ aht[0] + 5, aht[1] + 5 ]);
  };
  const bumpYear = () => {
    setStartDate(startDate.plus({years: 1}));
  };



  const seriesDataToAdd = useMemo(() => {

    const randomNco = (day: DateTime, index: any) => {
      const { hour } = day;
      if (hour >= 7 && hour <= 9 ) {
        return rand(nco2[0], nco2[1]);
      } else if (hour > 9 && hour <= 11 ) {
        return rand(nco3[0], nco3[1]);
      } else if (hour > 11 && hour <= 13 ) {
        return rand(nco4[0], nco4[1]);
      } else if (hour > 13 && hour <= 15 ) {
        return rand(nco5[0], nco5[1]);
      } else if (hour > 15 && hour <= 16 ) {
        return rand(nco6[0], nco6[1]);
      } else {
        return rand(nco1[0], nco1[1]);
      }
    };

    const typicalDay = (day: any) => new Array(96).fill(day).map((day, index) => {
      const interval = day.plus({minutes: 15 * index});
      if (!interval.isValid) { return {} }
      return {
        timestamp: interval.toUTC().toISO(),
        nco: randomNco(interval, index),
        aht: rand(aht[0], aht[1]), // between 15 and 20 min
        abandons: rand(0, 1),
      }
    } );

    const start = startDate;
    const dailyInteractions =  new Array(totalDays).fill(start).flatMap((start, index) => typicalDay(start.plus({days: index}) ));
    return dailyInteractions;
  }
  , [startDate, totalDays, nco1,nco2,nco3,nco4,nco5,nco6,aht]);

  const {
    data,
    isLoading,
    // error,
    refetch: generateData
  } = useQuery<any, any>(
    ['historicalData'],
    () => wfm.forecasting.api.post_tenants_tenant_id_wfm_competencies_competency_id_historical({
      pathParams: { tenant_id, competency_id },
      body: {
        channel: channel,
        direction: "inbound",
        series: seriesDataToAdd
      }
    }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
    }
  );



  return (
    <>
      <h3>🎉 You've reached the secret bonus menu of WFM 🎉</h3>

      <div>Add some randomized historical data for a specified amount of days</div>
      <br /><br />

      <DesktopDatePicker
        mask="____ / __ / __"
        inputFormat="yyyy / MM / dd"
        value={startDate}
        onChange={({target: { value }}: any) => setStartDate(value)}
        renderInput={(props) =>
          <TextField
            {...props}
            size="small"
            helperText="Start Date"
          />
        }
      />

      <br /><br />

      <TextField
            placeholder="Total Days"
            value={totalDays}
            onChange={({target: { value }}) => setTotalDays(parseInt(value))}
            size="small"
            helperText="Total Days"
          />

      <br /><br />


      <TextField
        id="select-competence"
        select
        label="Competency"
        value={competency_id}
        onChange={({target: { value }}: any) => set_competency_id(value)}
        variant="outlined"
        style={{ width: '200px'}}
        size="small"
      >
        {competencies.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <br /><br />
      <TextField
        id="select-channel"
        select
        label="Channel"
        value={channel}
        onChange={({target: { value }}: any) => set_channel(value)}
        variant="outlined"
        style={{ width: '200px'}}
        size="small"
      >
        {['voice','sms','email','messaging','work-item',].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <br /><br />

      <Button
          onClick={() => bump()}
          variant="contained"
          disableElevation
          color="primary"
          startIcon={<AddIcon />}
        >
          Bump values by 5
        </Button>
        <Button
          onClick={() => bumpYear()}
          variant="contained"
          disableElevation
          color="primary"
          startIcon={<AddIcon />}
          sx={{marginLeft: '20px'}}
        >
          Bump to next year
        </Button>
        <br />
        <br />
      <Box sx={{ width: 600 }}>
        Aht Range in minutes
        <Slider
          marks={valArray}
          value={aht}
          onChange={(e,v:any) => setAht(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br /><br /><br />


      <Box sx={{ width: 600 }}>
        Nco 00:00 - 07:00 and 16:00 - 24:00
        <Slider
          marks={valArray}
          value={nco1}
          onChange={(e,v:any) => setNco1(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br />
      <Box sx={{ width: 600 }}>
        Nco 07:00 - 09:00
        <Slider
          marks={valArray}
          value={nco2}
          onChange={(e,v:any) => setNco2(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br />
      <Box sx={{ width: 600 }}>
        Nco 09:00 - 13:00
        <Slider
          marks={valArray}
          value={nco3}
          onChange={(e,v:any) => setNco3(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br />
      <Box sx={{ width: 600 }}>
        Nco 13:00 - 15:00
        <Slider
          marks={valArray}
          value={nco4}
          onChange={(e,v:any) => setNco4(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br />
      <Box sx={{ width: 600 }}>
        Nco 15:00 - 16:00
        <Slider
          marks={valArray}
          value={nco5}
          onChange={(e,v:any) => setNco5(v)}
          valueLabelDisplay="auto"

        />
      </Box>
      <br />
      <Box sx={{ width: 600 }}>
        Nco 15:00 - 16:00
        <Slider
          marks={valArray}
          value={nco6}
          onChange={(e,v:any) => setNco6(v)}
          valueLabelDisplay="auto"
        />
      </Box>

      <br /><br />
      <Button
          className="createForecast"
          onClick={() => generateData()}
          variant="contained"
          disableElevation
          color="primary"
          startIcon={<AddIcon />}
        >
          Submit
        </Button>


      {isLoading && <span>Loading...</span> }
      {(data === null) && <span>Done</span> }
    </>
  )
};
