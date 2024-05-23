import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import colors from '../../../config/colors'
function CurvedLineChart({ color, selectedStrideItem, selectedItem, straightData, rightData, leftData, data }) {
  const updatedData = data?.map(item => item?.stride)
  console.log('color', color)
  // const allLeft = selectedItem === 'All data' || selectedItem === 'Left circle' ? leftData?.map(item => item?.stride) : []
  // const allRigth = selectedItem === 'All data' || selectedItem === 'Right circle' ? rightData?.map(item => item?.stride) : []
  // const allStraight = selectedItem === 'All data' || selectedItem === 'Straight line' ? straightData?.map(item => item?.stride) : []
  // const limitedAllLeft = selectedStrideItem === 'Max 10' ? allLeft?.slice(0, 10) : selectedStrideItem === 'Max 5' ? allLeft.slice(0, 5) : allLeft
  // const limitedAllRight = selectedStrideItem === 'Max 10' ? allRigth.slice(0, 10) : selectedStrideItem === 'Max 5' ? allRigth.slice(0, 5) : allRigth
  // const limitedAllStriaght = selectedStrideItem === 'Max 10' ? allStraight.slice(0, 10) : selectedStrideItem === 'Max 5' ? allStraight.slice(0, 5) : allStraight

  const medianObject = data?.find(obj => obj.isMedian === true)
  // const medianRightObject = rightData?.find(obj => obj.isMedian === true)
  // const medianStraightObject = straightData?.find(obj => obj.isMedian === true)
  // console.log('dataataadadadada', straightData)

  const datasets = updatedData?.map((data, index) => ({
    label: `Dataset ${index + 1}`,
    data: data,
    borderColor: color,
    lineTension: 0.4,
    borderCurve: 0.5,
    borderWidth: medianObject?.stride === data ? 5 : 2,
    borderDash: medianObject?.stride === data ? [10, 10] : [0, 0],
    borderCapStyle: 'round',
    fill: false,
    pointStyle: false,
  }))
  // console.log('dataataadadadada123', datasets)

  const chartContainer = useRef(null)
  let myChart = null
  console.log('chartContainer', datasets)
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy()
      }
      const ctx = chartContainer.current.getContext('2d')
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100],
          datasets: [
            ...(datasets ? datasets : []),
            {
              label: 'Dataset 1',

              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              borderColor: '#CCCCCC',
              lineTension: 0.4,
              borderWidth: 1.5,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
            tooltip: false,
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              display: false,
              grid: {
                display: false, // Hide x-axis grid lines
              },
              min: -100,
              max: 100,
              ticks: {
                callback: value => {
                  if (value === 0) {
                    return '0'
                  } else if (value < 0) {
                    return 'left'
                  } else {
                    return 'right'
                  }
                },
              },
            },
          },
        },
      })
    }
    return () => {
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [color, data])
  return <canvas style={{ width: '100%', height: '100%' }} ref={chartContainer} />
}

export default CurvedLineChart