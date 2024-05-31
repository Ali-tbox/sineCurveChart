import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import colors from '../../../config/colors'

function generateZeroArray(length) {
  const zeroArray = []
  for (let i = 0; i < length; i++) {
    zeroArray.push(0)
  }
  return zeroArray
}
function CurvedLineChart({ baseline, color, selectedStrideItem, selectedItem, straightData, rightData, leftData, data }) {
  const updatedData = data?.map(item => item?.stride)
  const baselineUpdatedData = baseline?.map(item => item?.stride)

  // const allLeft = selectedItem === 'All data' || selectedItem === 'Left circle' ? leftData?.map(item => item?.stride) : []
  // const allRigth = selectedItem === 'All data' || selectedItem === 'Right circle' ? rightData?.map(item => item?.stride) : []
  // const allStraight = selectedItem === 'All data' || selectedItem === 'Straight line' ? straightData?.map(item => item?.stride) : []
  // const limitedAllLeft = selectedStrideItem === 'Max 10' ? allLeft?.slice(0, 10) : selectedStrideItem === 'Max 5' ? allLeft.slice(0, 5) : allLeft
  // const limitedAllRight = selectedStrideItem === 'Max 10' ? allRigth.slice(0, 10) : selectedStrideItem === 'Max 5' ? allRigth.slice(0, 5) : allRigth
  // const limitedAllStriaght = selectedStrideItem === 'Max 10' ? allStraight.slice(0, 10) : selectedStrideItem === 'Max 5' ? allStraight.slice(0, 5) : allStraight

  const medianObject = data?.find(obj => obj.isMedian === true)
  const baselineMedianObject = baseline?.find(obj => obj.isMedian === true)
  // const medianRightObject = rightData?.find(obj => obj.isMedian === true)
  // const medianStraightObject = straightData?.find(obj => obj.isMedian === true)
  // console.log('dataataadadadada', straightData)

  const datasets = updatedData?.map((data, index) => ({
    label: `Dataset ${index + 1}`,
    data: data,
    borderColor: medianObject?.stride === data ? colors.purple : 'rgba(45, 156, 219, 0.5)',
    lineTension: 0.4,
    borderCurve: 0.5,
    borderWidth: medianObject?.stride === data ? 3 : 1,
    // borderDash: medianObject?.stride === data ? [10, 10] : [0, 0],
    borderCapStyle: 'round',
    fill: false,
    pointStyle: false,
  }))
  const baselineDatasets = baselineUpdatedData?.map((data, index) => ({
    label: `Dataset ${index + 1}`,
    data: data,
    borderColor: baselineMedianObject?.stride === data ? colors.faintgreen : 'rgba(45, 156, 219, 0.5)',
    lineTension: 0.4,
    borderCurve: 0.5,
    borderWidth: baselineMedianObject?.stride === data ? 3 : 1,
    borderCapStyle: 'round',
    fill: false,
    pointStyle: false,
  }))

  const chartContainer = useRef(null)
  let myChart = null
  function getMaxLengthArray(data) {
    const maxObj = data?.reduce(
      (maxObj, arr) => {
        const length = arr.stride ? arr.stride.length : 0
        if (length > maxObj.maxLength) {
          maxObj.maxLength = length
          maxObj.maxLengthArray = arr.stride
        }
        return maxObj
      },
      { maxLength: 0, maxLengthArray: [] },
    )

    return maxObj?.maxLengthArray
  }

  // Example usage:
  const maxDataLengthArray = getMaxLengthArray(data) === undefined ? [] : getMaxLengthArray(data)
  const maxLengthArray = getMaxLengthArray(baseline) === undefined ? [] : getMaxLengthArray(baseline)
  const labelsArray = maxDataLengthArray?.length > maxLengthArray?.length ? maxDataLengthArray : maxLengthArray

  console.log('Array with the maximum length:', maxDataLengthArray?.length, maxLengthArray?.length)

  // console.log('chartContainer', maxLength)
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy()
      }
      const ctx = chartContainer.current.getContext('2d')
      myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsArray,
          datasets: [
            ...(datasets ? datasets : []),
            ...(baselineDatasets ? baselineDatasets : []),
            {
              label: 'Dataset 1',

              data: generateZeroArray(labelsArray?.length),
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
