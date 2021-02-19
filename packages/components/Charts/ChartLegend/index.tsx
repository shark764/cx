/*
 * Copyright © 2015-2021 Serenova, LLC. All rights reserved.
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Legend } from 'recharts';

// export interface LegendProps {
//     height?: number;
//     horizontalAlign?: "'left' | 'center' | 'right'";
//     verticalAlign?: string;
// };

export function ChartLegend() {
    return (
        <>
            <Legend
                height={36}
                align="center"
                verticalAlign="top"
                payload={[{ value: 'one', type: 'line', id: 'ID01' }]}
            />
        </>
    );
}

ChartLegend.propTypes = {
    align: PropTypes.string,
    height: PropTypes.number,
    verticalAlign: PropTypes.string,
};

export default ChartLegend;
