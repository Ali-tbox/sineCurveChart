import { Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import StrideSymmetry from './charts/StrideSymmetry'
import DeficitCharts from './charts/deficitChart/DeficitCharts'
import DeficitScatterCharts from './charts/deficitScatterCharts/DeficitScatterCharts'
import SineCurvedCharts from './charts/sineCurvedCharts/SineCurvedCharts'
import StridePrecision from './form/StridePrecision'
import colors from '../config/colors'
import chartData from './charts/chartData'

function ChartMainContainer() {
  // function sendMessageToNative(data) {
  //   console.log("sendMessageToNative");
  //   window.webkit.messageHandlers.nativeMessageHandler.postMessage(data);
  // }
  // window.handleMessageFromNative = function (data) {
  //   console.log("sendMessageToNative", data);
  // };
  const [dataFromIOS, setDataFromIOS] = useState('')
  const [dateFromIOS, setDateFromIOS] = useState('')

  useEffect(() => {
    // Adding event for IOS app

    window.addEventListener('iosEvent', iosEventHandler)

    return () => window.removeEventListener('iosEvent', iosEventHandler)
  }, [])

  const iosEventHandler = useCallback(
    e => {
      console.log('Received data from IOS : ' + e.detail.data)
      setDataFromIOS(e.detail.data)
      setDateFromIOS(e.detail.date)
    },
    [setDataFromIOS],
  )

  const onClickHandler = name => {
    console.log('Sending data to IOS : ' + name)
    // Sending Data to IOS App
    window?.webkit?.messageHandlers?.IOS_BRIDGE?.postMessage({
      message: name,
    })
  }

  const names = ['Atif', 'Jane', 'Vicky', 'Alice', 'Raj']

  // const rightHindArray = newData.deficitScatter.rightHind;

  // Accessing maxDiff of each item in rightHind array
  // const maxDiffs = rightHindArray.map((item) => item.MaxMinDiff.maxDiff);

  function isJSONString(str) {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <Box w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'center'} overflow={'hidden'}>
      <SineCurvedCharts date={dateFromIOS} chartData={dataFromIOS} handleItemClick={onClickHandler} />
    </Box>
  )
}

export default ChartMainContainer
