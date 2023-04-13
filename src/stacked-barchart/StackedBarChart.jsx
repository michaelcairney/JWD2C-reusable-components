import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import Legend from './Legend';
import defaultFormatter from './defaultFormatter';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StackedBarChart = ({
  data,
  groupDimIndex,
  subgroupDimIndex,
  valueDimIndex,
  tableHeaders,
  colorOrder,
}) => {
  const [active, setActive] = useState({
    group: null,
    subgroup: null,
  });

  const { barData, legendData, groupNames, subgroupNames } = useMemo(
    () =>
      defaultFormatter(
        data,
        groupDimIndex,
        subgroupDimIndex,
        valueDimIndex,
        active.group,
      ),
    [active.group],
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

  return (
    <StyledContainer>
      <Chart
        data={barData}
        groupNames={groupNames}
        subgroupNames={subgroupNames}
        colorOrder={colorOrder}
        chartMouseHoverHandler={chartMouseHoverHandler}
        chartMouseLeaveHandler={chartMouseLeaveHandler}
      />
      <Legend
        data={legendData}
        colorOrder={colorOrder}
        activeSubgroup={active.subgroup}
        tableHeaders={tableHeaders}
      />
    </StyledContainer>
  );
};

export default StackedBarChart;
