import config from './qlik-config';
import { Routes, Route, Link } from 'react-router-dom';
import useApp from './qlik/hooks/useApp';
import useObject from './qlik/hooks/useObject';
import styled from 'styled-components';
import './App.css';
import StackedBarChart from './components/stacked-barchart/StackedBarChart';
import ComboChart from './components/combo-chart/Chart';
import KPI from './components/button/KPI';

const StyledScreenContainer = styled.div`
  height: 97vh;
`;

const Styledlink = styled(Link)`
  height: 10px;
  width: 10px;
  background: white;
  text-decoration: none;
  border-radius: 5%;
  padding: 5px;
`

function App() {
  const {
    connectionConfig: { host, appId, comboChartAppId, KpiAppId, comboChartId, stackedBarChartId, kpiId, kpiLineId },
    stackedBarChartConfig: { dataIndexes, fieldNames, colorOrder, tableHeaders },
    comboChartConfig: { legendLabels, dataIndexes: comboDataIndexes, colors },
  } = config;
  const app = useApp(host, appId);
  const comboApp = useApp(host, comboChartAppId);
  const kpiApp = useApp(host, KpiAppId);

  const { data } = useObject(app, stackedBarChartId);
  const { data: comboData } = useObject(comboApp, comboChartId);
  const { data: kpiData } = useObject(kpiApp, kpiId);
  const { data: kpiLineData } = useObject(kpiApp, kpiLineId);
  console.log(comboData)


  const { groupIndex, subgroupIndex, valueIndex } = dataIndexes;
  const { groupIndex: comboGroupIndex, valueIndex: comboValueindex, minIndex, maxIndex, rollingAvgIndex } = comboDataIndexes
  const { axisColor, barColor, whiskerColor, rollingAvgColor } = colors

  if (data?.length && comboData?.length && kpiData?.length && kpiLineData?.length) {
    console.log(kpiLineData)
    return (
      <StyledScreenContainer>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Styledlink to="/KPI">Go to KPI Chart</Styledlink>
                <StackedBarChart
                  app={app}
                  data={data}
                  fieldNames={fieldNames}
                  groupIndex={groupIndex}
                  subgroupIndex={subgroupIndex}
                  valueIndex={valueIndex}
                  tableHeaders={tableHeaders}
                  colorOrder={colorOrder}
                />
              </>
            }
          />
          <Route
            path="/KPI"
            element={
              <>
                <Styledlink to="/combo">Go to Combo Chart</Styledlink>
                <KPI
                  data={kpiData}
                /></>
            }
          />
          <Route
            path="/combo"
            element={
              <>
                <Styledlink to="/">Go to Stacked Bar Chart</Styledlink>
                <ComboChart
                  data={comboData}
                  legendLabels={legendLabels}
                  axisColor={axisColor}
                  barColor={barColor}
                  whiskerColor={whiskerColor}
                  rollingAvgColor={rollingAvgColor}
                  groupIndex={groupIndex}
                  rollingAvgIndex={rollingAvgIndex}
                  minIndex={minIndex}
                  maxIndex={maxIndex}
                  valueIndex={valueIndex}
                /></>
            }
          />
        </Routes>

      </StyledScreenContainer>
    );
  }
  return <div>loading...</div>;
}

export default App;
