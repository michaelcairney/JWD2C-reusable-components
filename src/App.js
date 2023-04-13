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
    chartConfig: { dataIndexes, colorOrder, tableHeaders },
  } = config;

  const app = useApp(host, appId);
  const { data } = useObject(app, stackedBarChartId);

  const { groupDimIndex, subgroupDimIndex, valueDimIndex } = dataIndexes

  if (data?.length) {
    return (
      <StyledScreenContainer>
        <StackedBarChart
          data={data}
          groupDimIndex={groupDimIndex}
          subgroupDimIndex={subgroupDimIndex}
          valueDimIndex={valueDimIndex}
          tableHeaders={tableHeaders}
          colorOrder={colorOrder}
        />
      </StyledScreenContainer>
    );
  }
  return <div>loading...</div>;
}

export default App;
