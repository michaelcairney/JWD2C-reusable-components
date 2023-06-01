import ComboChart from '../components/combo-chart/Chart';
import comboChartData from '../components/combo-chart/comboChartData';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/ComboChart',
  component: ComboChart,
  tags: ['autodocs'],
  args: {
    data: comboChartData
  },
};

export const Primary = {
  args: {
    data: comboChartData,
    groupIndex: 0,
    rollingAvgIndex: 4,
    minIndex: 2,
    maxIndex: 3,
    valueIndex: 1,

    axisColor: '#989898',
    barColor: '#6d8ea6',
    whiskerColor: 'black',
    rollingAvgColor: '#db0a0a',

    legendLabels: ['Average balance', '3 month rolling average', 'Min/max'],
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
