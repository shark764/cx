export const reactSelectStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: 'black',
    background: 'white',
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};
