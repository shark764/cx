import {
  FormControl,
  MenuItem,
  Theme
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { FilterTypes } from 'redux/reducers/main';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export function FilterMenu({
  menu,
  title,
  options = [],
  selected,
  handleSelectOption,
}: {
  menu: FilterTypes;
  title: string;
  options: any[];
  selected: string;
  handleSelectOption(filter: FilterTypes, id: string): void;
}) {
  const classes = useStyles();

  const handleChange = (event: any) => {
    handleSelectOption(menu, event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <TextField
        select
        label={title}
        value={selected}
        onChange={({target: { value }}: any) => handleChange(value)}
        variant="outlined"
        style={{ width: '200px' }}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
}
