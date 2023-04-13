const defaultFormatter = (rawData, groupDimIndex, subgroupDimIndex, valueDimIndex, activeGroup) => {

  const qMatrix = rawData[0].qMatrix;
  const groupNames = qMatrix
    .map((item) => item[groupDimIndex].qText)
    .filter((value, index, self) => self.indexOf(value) === index);
  const subgroupNames = qMatrix
    .map((item) => item[subgroupDimIndex].qText)
    .filter((value, index, self) => self.indexOf(value) === index);

  const subgroupTotals = subgroupNames.map((name) => {
    const filteredBySubgroup = qMatrix.filter((item) => item[subgroupDimIndex].qText === name)
    const total = filteredBySubgroup.reduce((accumulator, currentValue) => accumulator + currentValue[valueDimIndex].qNum, 0)
    return { name, total }
  })

  const subgroupsSortedbyTotal = subgroupTotals.sort((a, b) => b.total - a.total)
  const grandTotal = subgroupTotals.reduce((accumulator, currentValue) => accumulator + currentValue.total, 0)

  // BAR DATA
  const barData = groupNames.map((name) => ({ groupName: name }));
  subgroupsSortedbyTotal.forEach((subgroup) => {
    barData[subgroup.name] = 0
  })

  qMatrix.forEach((item) => {
    barData.find((obj) => obj.groupName === item[0].qText)[
      item[subgroupDimIndex].qText
    ] = item[valueDimIndex].qNum;
  });

  // LEGEND DATA
  if (activeGroup) {
    const groupObject = barData.find((item) => item.groupName === activeGroup)
    const groupEntries = Object.entries(groupObject).filter((entry) => entry[0] !== 'groupName')
    const entriesSorted = groupEntries.sort((a, b) => subgroupsSortedbyTotal.findIndex((subgroup) => subgroup.name === a[0]) - subgroupsSortedbyTotal.findIndex((subgroup) => subgroup.name === b[0]))
    const total = entriesSorted.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0)
    const legendData = groupEntries.map((entry) => ({ name: entry[0], total: entry[1], percent: ((entry[1] / total) * 100).toFixed(1) + '%' }))
    return { barData, legendData, groupNames, subgroupNames }
  }

  const legendData = subgroupsSortedbyTotal.map((item) => {
    const subgroupPercent = ((item.total / grandTotal) * 100).toFixed(1) + '%'
    return { ...item, percent: subgroupPercent }
  })

  return { barData, legendData, groupNames, subgroupNames }
}
export default defaultFormatter