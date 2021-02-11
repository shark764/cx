import { matchSorter } from 'match-sorter';

function fuzzyText(rows: any, id: any, filterValue: any) {
  // @ts-ignore
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyText.autoRemove = (val: any) => !val;

function startsWithText(rows: any, id: any, filterValue: any) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id];
    return rowValue !== undefined
      ? String(rowValue)
        .toLowerCase()
        .startsWith(String(filterValue).toLowerCase())
      : true;
  });
}

export { fuzzyText, startsWithText };
