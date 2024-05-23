import React from 'react'
import SineCurve from './SineCurve'
import { Box, Text } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Icon from '../../form/Icon'
import assets from '../../../assets/assests'
import chartData from '../chartData'

function SineCurvedCharts({ handleItemClick }) {
  // console.log("SineCurvedCh ", chartData?.sineCurve?.rightFore);
  return (
    <Box w='100%'>
      <Box display={'flex'} gap={'29px'}>
        <SineCurve color={colors.lightMediumBlue} chartData={chartData} data={chartData?.sineCurve?.leftFore} circle='Left circle' type='front' />
        <SineCurve color={colors.lightPurple} chartData={chartData} data={chartData?.sineCurve?.rightFore} circle='right circle' type='front' />
        <SineCurve color={colors.lightMustard} chartData={chartData} data={chartData?.sineCurve?.straightFore} circle='Straight' type='front' />
      </Box>
      <Box display={'flex'} gap={'29px'}>
        <SineCurve color={colors.lightMediumBlue} chartData={chartData} data={chartData?.sineCurve?.leftHind} type='hind' />
        <SineCurve color={colors.lightPurple} chartData={chartData} data={chartData?.sineCurve?.rightHind} type='hind' />
        <SineCurve color={colors.lightMustard} chartData={chartData} data={chartData?.sineCurve?.straighthind} type='hind' />
      </Box>
    </Box>
  )
}

export default SineCurvedCharts
