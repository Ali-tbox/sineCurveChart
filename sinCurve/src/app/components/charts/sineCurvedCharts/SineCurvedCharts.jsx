import React from 'react'
import SineCurve from './SineCurve'
import { Box, Text } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Icon from '../../form/Icon'
import assets from '../../../assets/assests'
// import chartData from '../chartData'

function SineCurvedCharts({ chartData, date }) {
  // console.log("SineCurvedCh ", chartData?.sineCurve?.rightFore);
  return (
    <Box w='100%'>
      <Box display={'flex'} gap={'29px'}>
        {chartData?.sineCurve?.leftFore?.length > 0 && (
          <SineCurve color={colors.lightMediumBlue} chartData={chartData} date={date} data={chartData?.sineCurve?.leftFore} circle='Left circle' type='front' />
        )}
        {chartData?.sineCurve?.rightFore?.length > 0 && (
          <SineCurve color={colors.lightPurple} chartData={chartData} date={date} data={chartData?.sineCurve?.rightFore} circle='Right circle' type='front' />
        )}
        {chartData?.sineCurve?.straightFore?.length > 0 && (
          <SineCurve color={colors.lightMustard} chartData={chartData} date={date} data={chartData?.sineCurve?.straightFore} circle='Straight' type='front' />
        )}
      </Box>
      <Box display={'flex'} gap={'29px'}>
        {chartData?.sineCurve?.leftHind?.length > 0 && <SineCurve color={colors.lightMediumBlue} chartData={chartData} date={date} data={chartData?.sineCurve?.leftHind} type='hind' />}
        {chartData?.sineCurve?.rightHind?.length > 0 && <SineCurve color={colors.lightPurple} chartData={chartData} date={date} data={chartData?.sineCurve?.rightHind} type='hind' />}
        {chartData?.sineCurve?.straighthind?.length > 0 && <SineCurve color={colors.lightMustard} chartData={chartData} date={date} data={chartData?.sineCurve?.straighthind} type='hind' />}
      </Box>
    </Box>
  )
}

export default SineCurvedCharts
