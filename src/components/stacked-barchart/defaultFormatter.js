const defaultFormatter = (rawData, groupIndex, subgroupIndex, valueIndex, activeGroup) => {

  const qMatrix = rawData[0].qMatrix;
  const groupNames = qMatrix
    .map((item) => item[groupIndex].qText)
    .filter((value, index, self) => self.indexOf(value) === index);
  const subgroupNames = qMatrix
    .map((item) => item[subgroupIndex].qText)
    .filter((value, index, self) => self.indexOf(value) === index);

  const subgroupsData = subgroupNames.map((name) => {
    const filteredBySubgroup = qMatrix.filter((item) => item[subgroupIndex].qText === name)
    const total = filteredBySubgroup.reduce((accumulator, currentValue) => accumulator + currentValue[valueIndex].qNum, 0)
    return { name, total }
  })

  const subgroupsSortedbyTotal = subgroupsData.sort((a, b) => b.total - a.total)
  const subgroupNamesSortedByTotal = subgroupsSortedbyTotal.map((subgroup) => subgroup.name)
  const grandTotal = subgroupsData.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0)

  // BAR DATA
  const barData = groupNames.map((name) => ({ groupName: name }));

  // apply values
  qMatrix.forEach((item) => {
    const barGroup = barData.find((obj) => obj.groupName === item[groupIndex].qText)
    barGroup[item[subgroupIndex].qText] = item[valueIndex].qNum;
  });

  // LEGEND DATA
  if (activeGroup) {
    const groupObject = barData.find((item) => item.groupName === activeGroup)
    const groupEntries = Object.entries(groupObject).filter((entry) => typeof entry[1] === 'number')
    const entriesSorted = groupEntries.sort((a, b) => subgroupsSortedbyTotal.findIndex((subgroup) => subgroup.name === a[0]) - subgroupsSortedbyTotal.findIndex((subgroup) => subgroup.name === b[0]))
    const total = entriesSorted.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0)
    const activeGroupLegendData = groupEntries.map((entry) => ({ name: entry[0], total: entry[1], percent: ((entry[1] / total) * 100).toFixed(1) + '%' }))
    return { barData, legendData: activeGroupLegendData, groupNames, subgroupNames: subgroupNamesSortedByTotal }
  }

  const defaultLegendData = subgroupsSortedbyTotal.map((item) => {
    const subgroupPercent = ((item.total / grandTotal) * 100).toFixed(1) + '%'
    return { ...item, percent: subgroupPercent }
  })

  return { barData, legendData: defaultLegendData, groupNames, subgroupNames: subgroupNamesSortedByTotal }
}
export default defaultFormatter