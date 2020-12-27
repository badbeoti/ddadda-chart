import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import * as d3 from 'd3';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand, easeCircleOut } from 'd3';
import { max } from 'd3-array';
import { divisionArr } from '../utils/filter';
import useDefault from '../hooks/useDefault';
import useDivision from '../hooks/useDivision';
import effectFc from '../utils/effectFc';

const ButtonContainer = styled.div`
  width: 750px;
  display: flex;
  flex-direction: row;
  place-content: center;
  place-items: center;

  margin-bottom: 2rem;

  .ant-btn {
    margin-right: 2rem;
  }
`;

const canvas = {
  width: 1200,
  height: 500,
  chartWidth: 1150,
  chartHeight: 400,
  marginLeft: 100,
};

function Canvas() {
  const { defaultData, onDefaultData } = useDefault();
  const { divisionList, onDivisionList } = useDivision();
  const ref = useRef(null);
  const [axis, changeAxis] = useState(false);
  const [selection, setSelection] = useState<null | Selection<null, unknown, null, undefined>>(
    null
  );

  useEffect(() => {
    onDefaultData();
  }, []);

  const setReset = () => {
    defaultData.data && effectFc(defaultData.data, selection, canvas, axis);
    onDivisionList(divisionArr);
  };

  const setAxis = () => {
    changeAxis(!axis);
    const filterList =
      defaultData.data && defaultData.data.filter((e, i) => divisionList[i].isSelect);
    if (filterList?.length) {
      effectFc(filterList, selection, canvas, !axis);
    } else {
      defaultData.data && effectFc(defaultData.data, selection, canvas, !axis);
    }
  };

  const setSelect = () => {
    const filterList =
      defaultData.data && defaultData.data.filter((e, i) => divisionList[i].isSelect);
    console.log(filterList);
    filterList && effectFc(filterList, selection, canvas, axis);
  };

  const setSort = () => {
    const filterList =
      defaultData.data && defaultData.data.filter((e, i) => divisionList[i].isSelect);
    if (filterList?.length) {
      const filterSortList =
        filterList && axis
          ? [...filterList].sort((a, b) => (a.bikeC! > b.bikeC! ? 1 : -1))
          : [...filterList].sort((a, b) => (a.divC! > b.divC! ? 1 : -1));
      console.log(filterSortList);
      effectFc(filterSortList, selection, canvas, axis);
    } else {
      const defaultSortList =
        defaultData.data && axis
          ? [...defaultData.data!].sort((a, b) => (a.bikeC! > b.bikeC! ? 1 : -1))
          : [...defaultData.data!].sort((a, b) => (a.divC! > b.divC! ? 1 : -1));
      effectFc(defaultSortList, selection, canvas, axis);
    }
  };

  // d3
  let x =
    defaultData.data &&
    scaleBand()
      .domain(defaultData.data.map((d) => d.name))
      .range([0, canvas.chartWidth])
      .paddingInner(0.1);

  let y =
    defaultData.data &&
    scaleLinear()
      .domain([0, max(defaultData.data, (d) => (axis ? d.bikeC : d.divC))!])
      .range([canvas.chartHeight, 0]);

  let color =
    defaultData.data &&
    scaleLinear()
      .domain([0, max(defaultData.data, (d) => (axis ? d.bikeC : d.divC))!])
      .range([0.2, 0.8]);

  const xAxisBot = d3.axisBottom(x!);
  const yAxisRight = d3.axisRight(y!);

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      const xAxisGroup =
        defaultData.data &&
        selection
          .append('g')
          .attr('font-weight', 'bold')
          .attr('transform', `translate(0,${canvas.chartHeight})`)
          .attr('class', 'xAxis')
          .call(xAxisBot);

      const yAxisGroup =
        defaultData.data &&
        selection
          .append('g')
          .attr('transform', `translate(${canvas.chartWidth},0)`)
          .call(yAxisRight);

      defaultData.data &&
        selection
          .selectAll('rect')
          .data(defaultData.data!)
          .enter()
          .append('rect')
          // .attr("fill", (d) => d3.interpolateGreens(color(d.divC)))
          .attr('fill', (d) =>
            axis ? d3.interpolateGreens(color!(d.bikeC!)) : d3.interpolateGreens(color!(d.divC!))
          )

          .attr('width', x!.bandwidth)
          .attr('x', (d) => x!(d.name)!)

          .attr('height', 0)
          .attr('y', canvas.chartHeight)
          .transition()
          .duration(1000)
          .delay((_, i) => i * 50)
          .ease(easeCircleOut)
          .attr('height', (d) => canvas.chartHeight - y!(axis ? d.bikeC! : d.divC!) - 10)
          .attr('y', (d) => y!(axis ? d.bikeC! : d.divC!));

      defaultData.data &&
        selection
          .append('g')
          .attr('class', 'textGroup')
          .selectAll('text')
          .data(defaultData.data!)
          .enter()
          .append('text')
          .text((d) => (axis ? d.bikeC! : d.divC!))
          .attr('class', 'text')
          .attr('fill', '#f5f6fa')
          .attr('x', (d) => x!(d.name)! + x!.bandwidth() / 2)

          .attr('y', canvas.chartHeight)
          .transition()
          .duration(1000)
          .delay((_, i) => i * 50)
          .ease(easeCircleOut)
          .attr('y', (d) => y!(axis ? d.bikeC! : d.divC!) + 20)
          .style('text-anchor', 'middle')
          .style('font-weight', 'bold');
    }
  }, [selection, defaultData.data]);

  return (
    <>
      <svg ref={ref} width={canvas.width} height={canvas.height}></svg>
      <ButtonContainer>
        <Button onClick={setAxis}>{axis ? '자전거 수' : '거치대 수'}</Button>
        <Button onClick={setSelect}>selectChart</Button>
        <Button onClick={setSort}>sortChart</Button>
        <Button onClick={setReset}>resetChart</Button>
      </ButtonContainer>
    </>
  );
}

export default Canvas;
