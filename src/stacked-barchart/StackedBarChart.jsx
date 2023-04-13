import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Chart from './Chart';
import Legend from './Legend';
import defaultFormatter from './defaultFormatter';
import selectHyperCubeValue from '../qlik/functions/selectHyperCubeValue';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const StackedBarChart = ({
  data,
  model,
  groupIndex,
  subgroupIndex,
  valueIndex,
  tableHeaders,
  colorOrder,
}) => {
  const [active, setActive] = useState({
    group: null,
    subgroup: null,
  });

  const { barData, legendData, groupNames, subgroupNames } = useMemo(
    () => defaultFormatter(data, model, groupIndex, subgroupIndex, valueIndex, active.group),
    [data, model, active.group],
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

  const selectionHandler = async (dimIndex, qElemNumber) => {
    await selectHyperCubeValue(model, dimIndex, qElemNumber);
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

export default StackedBarChart;
