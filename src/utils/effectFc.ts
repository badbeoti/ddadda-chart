import * as d3 from 'd3';
import { scaleLinear, scaleBand, easeCircleOut } from 'd3';
import { max } from 'd3-array';

type List = {
  name: string;
  id: number;
  divC: number | undefined;
  bikeC: number | undefined;
}[];

type Canvas = {
  width: number;
  height: number;
  chartWidth: number;
  chartHeight: number;
  marginLeft: number;
};

function effectFc(
  list: List,
  selection: d3.Selection<null, unknown, null, undefined> | null,
  canvas: Canvas,
  axis: boolean
) {
  // domain과 range 설정
  const x = scaleBand()
    .domain(list.map((d) => d.name))
    .range([0, canvas.chartWidth])
    .paddingInner(0.1);

  const y = scaleLinear()
    .domain([0, max(list, (d) => (axis ? d.bikeC : d.divC))!])
    .range([canvas.chartHeight, 0]);

  const color = scaleLinear()
    .domain([0, max(list, (d) => (axis ? d.bikeC : d.divC))!])
    .range([0.2, 0.8]);

  const xAxisBot = d3.axisBottom(x!);
  const yAxisRight = d3.axisRight(y!);

  selection!.selectAll('g').remove(); // remove 메서드로 이전 svg 안 'g'를 삭제

  // 그리고 다시 append와 call로 'g' (axis group)을 설정해준다.
  const xAxisGroup = selection!
    .append('g')
    .attr('font-weight', 'bold')
    .attr('transform', `translate(0,${canvas.chartHeight})`)
    .attr('class', 'xAxis')
    .call(xAxisBot);

  const yAxisGroup = selection!
    .append('g')
    .attr('transform', `translate(${canvas.chartWidth},0)`)
    .call(yAxisRight);

  const rects = selection!.selectAll('rect').data(list);

  rects.exit().remove(); // 'g'와 마찬가지로 rects도 remove로 지워준다.

  rects // 그리고 다시 재설정
    .attr('width', x.bandwidth)
    .attr('x', (d) => x(d.name)!)
    .attr('fill', (d) =>
      axis ? d3.interpolateGreens(color(d.bikeC!)) : d3.interpolateGreens(color(d.divC!))
    )
    .attr('height', 0)
    .attr('y', canvas.chartHeight)
    .transition()
    .duration(1000)
    .delay((_, i) => i * 50)
    .ease(easeCircleOut)
    .attr('height', (d) => canvas.chartHeight - y(axis ? d.bikeC! : d.divC!) - 10)
    .attr('y', (d) => y(axis ? d.bikeC! : d.divC!));

  rects // rects는 'g'와 다르게 enter를 더한 설정을 한 번 더 해줘야 한다.
    .enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('x', (d) => x(d.name)!)
    .attr('fill', (d) =>
      axis ? d3.interpolateGreens(color(d.bikeC!)) : d3.interpolateGreens(color(d.divC!))
    )
    .attr('height', 0)
    .attr('y', canvas.chartHeight)
    .transition()
    .duration(1000)
    .delay((_, i) => i * 50)
    .ease(easeCircleOut)
    .attr('height', (d) => canvas.chartHeight - y(axis ? d.bikeC! : d.divC!) - 10)
    .attr('y', (d) => y(axis ? d.bikeC! : d.divC!));

  const texts = selection!.append('g').attr('class', 'textGroup').selectAll('text').data(list);

  texts.exit().remove(); // rects와 마찬가지로 rects도 remove로 지워준다.

  texts // 그리고 다시 재설정
    .text((d) => (axis ? d.bikeC! : d.divC!))
    .attr('class', 'text')
    .attr('fill', '#f5f6fa')
    .style('font-weight', 'bold')
    .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
    .attr('y', canvas.chartHeight)
    .transition()
    .duration(1000)
    .delay((_, i) => i * 50)
    .ease(easeCircleOut)
    .attr('y', (d) => y(axis ? d.bikeC! : d.divC!) + 20)
    .style('text-anchor', 'middle');

  texts // texts도 rects와 같아 enter를 더한 설정을 한 번 더 해줘야 한다.
    .enter()
    .append('text')
    .text((d) => (axis ? d.bikeC! : d.divC!))
    .attr('class', 'text')
    .attr('fill', '#f5f6fa')
    .style('font-weight', 'bold')
    .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
    .attr('y', canvas.chartHeight)
    .transition()
    .duration(1000)
    .delay((_, i) => i * 50)
    .ease(easeCircleOut)
    .attr('y', (d) => y(axis ? d.bikeC! : d.divC!) + 20)
    .style('text-anchor', 'middle');
}

export default effectFc;
