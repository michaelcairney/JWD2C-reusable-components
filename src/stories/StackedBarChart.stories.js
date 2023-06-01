import StackedBarChart from '../components/stacked-barchart/StackedBarChart';
import stackedBarChartData from '../components/stacked-barchart/stackedBarChartData';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/StackedBarChart',
  component: StackedBarChart,
  tags: ['autodocs'],
  args: {
    data: stackedBarChartData
  },
};

export const Primary = {
  args: {
    data: stackedBarChartData,
    groupIndex: 0,
    subgroupIndex: 2,
    valueIndex: 1,
    fieldNames: {
      group: "Month",
      subgroup: "Business Line"
    },
    colorOrder: [
      '#716196',
      '#588942',
      '#ba8111',
      '#547da7',
      '#a15b87',
      '#a0a937',
      '#5fadb4',
      '#c75151',
      '#677b88',
    ],

    tableHeaders: ['Business Line', '% Share', 'Value'],
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
