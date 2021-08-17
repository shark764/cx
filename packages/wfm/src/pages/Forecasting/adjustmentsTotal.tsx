interface Props {
  adjustments: unknown[];
};

export const AdjustmentsTotal: React.FC<Props> = ({ adjustments }) =>
  adjustments.length > 0 ? <span>( {adjustments.length} )</span> : null;
