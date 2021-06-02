import {
  FormControl,
  MenuItem,
  TextField,
  Theme,
  useTheme,
} from '@material-ui/core';
import { FilterTypes } from 'redux/reducers/main';

const useStyles = (theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

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
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleChange = (event: any) => {
    handleSelectOption(menu, event.target.value);
  };

  return (
    <FormControl style={classes.formControl}>
      <TextField
        select
        label={title}
        value={selected}
        onChange={handleChange}
        variant="outlined"
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
