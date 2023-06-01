import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Chart from './Chart';
import Legend from './Legend';
import defaultFormatter from './defaultFormatter';
import selectFieldValue from '../../qlik/functions/selectFieldValue';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StackedBarChart = ({
  app,
  data,
  fieldNames,
  groupIndex,
  subgroupIndex,
  valueIndex,
  tableHeaders,
  colorOrder,
}) => {
  const [active, setActive] = useState({
    group: null,
    value: null,
  });

  const { barData, legendData, groupNames, subgroupNames } = useMemo(
    () => defaultFormatter(data, groupIndex, subgroupIndex, valueIndex, active.group),
    [data, active.group],
  );

  const chartMouseHoverHandler = useCallback((group, subgroup) => {
    setActive({
      group,
      subgroup,
    });
  }, []);

  const chartMouseLeaveHandler = useCallback(() => {
    setActive({
      group: null,
      subgroup: null,
    });
  }, []);

  const selectionHandler = async (dimension, value) => {
    if (dimension === 'group') {
      await selectFieldValue(app, fieldNames.group, value);
    } else if (dimension === 'subgroup') {
      await selectFieldValue(app, fieldNames.subgroup, value);
    }
  };

  return (
    <StyledContainer>
      <Chart
        data={barData}
        groupNames={groupNames}
        subgroupNames={subgroupNames}
        colorOrder={colorOrder}
        chartMouseHoverHandler={chartMouseHoverHandler}
        chartMouseLeaveHandler={chartMouseLeaveHandler}
        selectionHandler={selectionHandler}
      />
      <Legend
        data={legendData}
        colorOrder={colorOrder}
        activeSubgroup={active.subgroup}
        tableHeaders={tableHeaders}
        selectionHandler={selectionHandler}
      />
    </StyledContainer>
  );
};

StackedBarChart.propTypes = {
  /**
   * A valid qlik app/doc
   */
  app: PropTypes.array,

  /**
   * Array of data to use (default is raw qlik data)
   */
  data: PropTypes.array,

  /**
   * The associated field names for the group and subgroup
   */
  fieldNames: PropTypes.object,

  /**
   * The column index in the qlik table for the group dimension
   */
  groupIndex: PropTypes.number,

  /**
   * The column index in the qlik table for the subgroup dimension
   */
  subgroupIndex: PropTypes.number,

  /**
   * The column index in the qlik table for the value/measure
   */
  valueIndex: PropTypes.number,

  /**
   * An array of 3 strings to specify the headers in the legend
   */
  tableHeaders: PropTypes.array,

  /**
   * An array of colours (must be of same length as number of subgroups)
   */
  colorOrder: PropTypes.array,
};

// StackedBarChart.defaultProps = {
//   app: null,
//   data: [],
//   fieldNames: { group: '', subgroup: '' },
//   groupIndex: null,
//   subgroupIndex: null,
//   valueIndex: null,
//   tableHeaders: [],
//   colorOrder: [PropTypes.array],
// };

export default StackedBarChart;
