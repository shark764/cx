import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { FilterTypes } from 'redux/reducers/main';

const useStyles = makeStyles((theme) => ({
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
      <InputLabel>{title}</InputLabel>
      <Select value={selected} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
