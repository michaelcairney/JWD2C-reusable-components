const config = {
  connectionConfig: {
    host: 'cc-edapps.calibrateconsulting.com',
    appId: '2de6ff9e-517b-4d34-89fe-d3dfaa93892f',
    stackedBarChartId: 'SRfMW',
  },

  chartConfig: {
    // specify the index of the group, subgroup and value columns in the qlik data
    dataIndexes: {
      groupIndex: 0,
      subgroupIndex: 2,
      valueIndex: 1,
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

export default config
