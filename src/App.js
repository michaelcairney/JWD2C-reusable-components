import config from './config';
import useApp from './qlik/hooks/useApp';
import useObject from './qlik/hooks/useObject';
import styled from 'styled-components';
import './App.css';
import StackedBarChart from './stacked-barchart/StackedBarChart';

const StyledScreenContainer = styled.div`
  height: 97vh;
`;

function App() {
  const {
    connectionConfig: { host, appId, stackedBarChartId },
    chartConfig: { dataIndexes, dimensionNames, colorOrder, tableHeaders },
  } = config;

  const app = useApp(host, appId);
  const { data } = useObject(app, stackedBarChartId);
  const { groupIndex, subgroupIndex, valueIndex } = dataIndexes;

  if (data?.length) {
    return (
      <StyledScreenContainer>
        <StackedBarChart
          app={app}
          data={data}
          dimensionNames={dimensionNames}
          groupIndex={groupIndex}
          subgroupIndex={subgroupIndex}
          valueIndex={valueIndex}
          tableHeaders={tableHeaders}
          colorOrder={colorOrder}
        />
      </StyledScreenContainer>
    );
  }
  return <div>loading...</div>;
}

export default App;
