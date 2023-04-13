import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { axisBottom, axisLeft } from 'd3';
import styled from 'styled-components';

const StyledChartContainer = styled.div`
  display: block;
  width: 60%;
  align-items: center;
`;

const Chart = ({
  data,
  groupNames,
  subgroupNames,
  colorOrder,
  chartMouseHoverHandler,
  chartMouseLeaveHandler,
}) => {
  const chartRef = useRef(null);
  const wrapperRef = useRef(null);

  const margin = { right: 10, bottom: 150, top: 30, left: 100 };
  const height = 450;
  const width = 700;

  const stackedData = d3.stack().keys(subgroupNames)(data);
  const stackedDataWithSubgroup = stackedData.map((item) =>
    item.map((subitem) => [...subitem, { ...subitem.data, subGroupName: item.key }]),
  );
  const groupSizes = data.map((group) => {
    return d3.sum(Object.values(group));
  });
  const largestGroupSize = d3.max(groupSizes);

  // define scales
  const xScale = d3.scaleBand().domain(groupNames).range([0, width]).padding([0.4]);
  const yScale = d3.scaleLinear().domain([0, largestGroupSize]).range([height, 0]);

  xScale.bandwidth(1);

  const yAxis = axisLeft(yScale).tickSize(0).tickPadding(10).tickSizeOuter(0);
  const xAxis = axisBottom(xScale).tickSizeOuter(0).tickSize(0).tickPadding(15);

  // Define grid lines
  const gridLines = axisLeft(yScale)
    .tickSizeOuter(0)
    .tickSizeInner(-width)
    .tickFormat((d) => ``);

  const axisLabelColor = '#b9c4c4';
  const gridColor = '#889291';

  useEffect(() => {
    const chart = d3.select(chartRef.current);

    // apply y axis
    chart
      .select('.yAxis')
      .attr('id', 'ticks')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(yAxis)
      .style('font', '14px sans-serif')
      .style('color', axisLabelColor)
      .select('path')
      .style('display', 'none')
      .attr('transform', `translate(10, 0)`);

    // apply x axis
    chart
      .select('.xAxis')
      .attr('transform', `translate(${margin.left}, ${height + margin.top} )`)
      .call(xAxis)
      .style('font', '14px sans-serif')
      .style('color', axisLabelColor)
      .select('path')
      .style('opacity', '0.1');

    // Apply grid lines
    chart
      .select('.grid')
      .attr('transform', `translate(${margin.left}, ${margin.top} )`)
      .call(gridLines)
      .style('color', gridColor)
      .attr('stroke-opacity', 0.3)
      .select('path')
      .style('display', 'none');

    // apply bars
    chart
      .select('.bars')
      .selectAll('g')
      .data(stackedDataWithSubgroup)
      .join('g')
      .attr('fill', (d, i) => {
        return colorOrder[i];
      })
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => xScale(d[2].groupName))
      .attr('y', (d) => yScale(d[1]))
      .attr('height', (d) => yScale(d[0]) - yScale(d[1]) - 1)
      .attr('width', xScale.bandwidth())
      .attr('margin', 20)
      .attr('transform', `translate(${margin.left}, ${margin.top} )`)
      .attr('class', (d, i) => `${d[2].groupName}`)
      .attr('id', (d, i) => `${d[2].subGroupName}`);

    const bars = chart.selectAll('rect');

    // chart hover
    bars.on('mouseenter', (e, d) => {
      chartMouseHoverHandler(d[2].groupName, d[2].subGroupName);
      d3.selectAll('rect').attr('opacity', '0.1');
      d3.selectAll(`[class="${d[2].groupName}"]`).attr('opacity', '1');
      d3.select(e.target).attr('stroke', 'white').attr('stroke-width', '2');
    });

    bars.on('mouseleave', (e, d) => {
      d3.select(e.target).attr('stroke', 'none');
    });

    // Legend table interaction
    d3.selectAll('.legendRow')
      .on('mouseenter', (e) => {
        chart.selectAll('rect').attr('opacity', '0.1');
        chart.selectAll(`[id="${e.target.id}"]`).attr('opacity', '1');
      })
      .on('mouseleave', (e) => {
        chart.selectAll('rect').attr('opacity', '1');
      });

    // Reset when not hovering on chart
    chart.on('mouseleave', () => {
      chartMouseLeaveHandler();
      d3.selectAll('rect').attr('opacity', '1');
    });
  }, [margin, xAxis, yAxis]);

  return (
    <StyledChartContainer ref={wrapperRef}>
      <svg ref={chartRef} viewBox={`30 0 800 510`}>
        <g className="xAxis" />
        <g className="yAxis" />
        <g className="grid" />
        <g className="bars" />
      </svg>
    </StyledChartContainer>
  );
};

export default Chart;
