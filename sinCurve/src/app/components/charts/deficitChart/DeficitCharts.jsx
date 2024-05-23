import { Box, Divider, Text } from '@chakra-ui/layout'
import React from 'react'
import Icon from '../../form/Icon'
// import chartData from '../chartData'

import DeficitGraph from './DeficitGraph'

import colors from '../../../config/colors'
import SymmentryRoundLabel from '../SymmentryRoundLabel'
import assets from '../../../assets/assests'
import SymmentryLabel from '../SymmentryLabel'

const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
}
const badgeColor = {
  left: colors.faintblue,
  right: colors.darkpurple,
  straight: colors.mustard,
}

function DeficitCharts({ chartData, handleItemClick }) {
  function getLabelByRange(number) {
    if (number >= 0 && number <= 11) {
      return { name: 'Normal symmetry', color: colors.mediumGreen }
    } else if (number >= 12 && number <= 23) {
      return { name: 'Mild asymmetry', color: colors.darkGreen }
    } else if (number >= 24 && number <= 35) {
      return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
    } else if (number >= 36 && number <= 47) {
      return { name: 'Moderate asymmetry', color: colors.paleYellow }
    } else if (number >= 48 && number <= 59) {
      return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
    } else if (number >= 60) {
      return { name: 'Severe asymmetry', color: colors.mehron }
    } else {
      return {} // Default color if the number is out of specified ranges
    }
  }
  function getLabelByRangeHind(number) {
    if (number >= 0 && number <= 5) {
      return { name: 'Normal symmetry', color: colors.mediumGreen }
    } else if (number >= 6 && number <= 13) {
      return { name: 'Mild asymmetry', color: colors.darkGreen }
    } else if (number >= 14 && number <= 21) {
      return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
    } else if (number >= 22 && number <= 29) {
      return { name: 'Moderate asymmetry', color: colors.paleYellow }
    } else if (number >= 30 && number <= 37) {
      return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
    } else if (number >= 38) {
      return { name: 'Severe asymmetry', color: colors.mehron }
    } else {
      return {} // Default color if the number is out of specified ranges
    }
  }

  const FrontLabels = [
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.straight)),
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.right)),
    getLabelByRange(Math.abs(chartData?.deficit?.foreImpact?.left)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.straight)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.right)),
    getLabelByRange(Math.abs(chartData?.deficit?.forePushoff?.left)),
  ]
  const HindLabels = [
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.straight)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.right)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindImpact?.left)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.straight)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.right)),
    getLabelByRangeHind(Math.abs(chartData?.deficit?.hindPushoff?.left)),
  ]
  const uniqueFrontArray = FrontLabels.filter((obj, index, self) => obj.name && index === self.findIndex(o => o.name === obj.name))
  const uniqueHindArray = HindLabels.filter((obj, index, self) => obj.name && index === self.findIndex(o => o.name === obj.name))

  console.log('123123123123132', getLabelByRange())
  return (
    <Box paddingX={'16px'} paddingY={'32px'}>
      <Box mb='10px' paddingY={'7px'} alignItems={'center'} display={'flex'} gap={'6px'}>
        <Text fontSize='16px' color={colors.dullblack} lineHeight={'22px'} fontWeight={700} fontFamily='Nunito'>
          Deficit Bar Chart
        </Text>
        <Icon onClick={() => handleItemClick('deficit-bar-chart')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
      </Box>
      <Box display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'16px'} lineHeight={'20px'} color={colors.textcolor}>
          Front
        </Text>
      </Box>
      <Box maxW={'100%'} gap={'23px'} display='flex'>
        <DeficitGraph horseSide='front' data={chartData?.deficit?.foreImpact} type='Impact' />
        <DeficitGraph horseSide='front' data={chartData?.deficit?.forePushoff} type='Push Off' />
      </Box>
      <Box mt='12px' display={'flex'} gap={'20px'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
        <Box display={'flex'} gap={'4px'} alignItems={'center'}>
          <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
          <Text ml='2px' fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack} paddingTop={'2px'}>
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt='8px' />
      <Box display={'flex'} flexDir={'column'} gap={'8px'} mt='8px'>
        {uniqueFrontArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueFrontArray[index + 1]?.name || ''} color2={uniqueFrontArray[index + 1]?.color || ''} />,
        )}
      </Box>
      <Box mt='40px' display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'14px'} lineHeight={'20px'} color={colors.textcolor}>
          Hind
        </Text>
      </Box>
      <Box maxW={'100%'} gap={'23px'} display='flex'>
        <DeficitGraph horseSide='hind' data={chartData?.deficit?.hindImpact} type='Impact' />
        <DeficitGraph horseSide='hind' data={chartData?.deficit?.hindPushoff} type='Push Off' />
      </Box>
      <Box mt='12px' gap='20px' display={'flex'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
        <Box display={'flex'} gap={'4px'} alignItems={'center'}>
          <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
          <Text ml='2px' fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack} paddingTop={'2px'}>
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt='8px' />
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='8px'>
        {uniqueHindArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueHindArray[index + 1]?.name || ''} color2={uniqueHindArray[index + 1]?.color || ''} />,
        )}
      </Box>
    </Box>
  )
}

export default DeficitCharts
