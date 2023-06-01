const config = {
  connectionConfig: {
    host: 'cc-edapps.calibrateconsulting.com',
    appId: '2de6ff9e-517b-4d34-89fe-d3dfaa93892f',
    comboChartAppId: '062116f1-826d-4db5-9b13-042674f252e9',
    KpiAppId: '6ba5ce84-327f-4ebf-83f8-1eb60f0c81cf',
    comboChartId: 'CrBqBTP',
    stackedBarChartId: 'SRfMW',
    kpiId: 'jUmhPh',
    kpiLineId: 'MWrngq'
  },

  stackedBarChartConfig: {
    // specify the index of the group, subgroup and value columns in the qlik data
    dataIndexes: {
      groupIndex: 0,
      subgroupIndex: 2,
      valueIndex: 1,
    },

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

  comboChartConfig: {
    dataIndexes: {
      groupIndex: 0,
      rollingAvgIndex: 4,
      minIndex: 2,
      maxIndex: 3,
      valueIndex: 1,
    },
    colors: {
      axisColor: '#989898',
      barColor: '#6d8ea6',
      whiskerColor: 'black',
      rollingAvgColor: '#db0a0a',
    },

    legendLabels: ['Average balance', '3 month rolling average', 'Min/max'],

  }
}


export default config
