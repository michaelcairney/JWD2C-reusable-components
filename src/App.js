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
  const { data, model, layout } = useObject(app, stackedBarChartId);

  const { groupIndex, subgroupIndex, valueIndex } = dataIndexes

  if (data?.length) {
    // app.clearAll()
    return (
      <StyledScreenContainer>
        <StackedBarChart
          data={data}
          model={model}
          layout={layout}
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
