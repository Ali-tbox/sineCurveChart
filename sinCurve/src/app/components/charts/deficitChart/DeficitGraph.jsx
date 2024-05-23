import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

import colors from '../../../config/colors'
import PointBarChart from './PointBarChart'

function DeficitGraph({ horseSide, data, type }) {
  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} mt={'13px'} h='261px' w='100%' maxW={'100%'} borderRadius='8px' border='1px' borderColor={colors.faintgray}>
      <Box paddingY='12px' paddingX={'16px'} display='flex' justifyContent='space-between'>
        <Text fontFamily={'Noto Sans'} fontSize='14px' fontWeight={700}>
          {type}
        </Text>
        <Text fontFamily={'Noto Sans'} fontSize='12px' color={colors.faintblack}>
          mm
        </Text>
      </Box>
      <Box display={'flex'} height={'80%'}>
        <Box mt='50px' h='140px' display='flex' alignItems={'end'} flexDir={'column'} justifyContent={'space-between'}>
          <Text fontFamily={'Noto Sans'} whiteSpace={'nowrap'} color={colors.faintblack} fontSize='11px' transform='rotate(-90deg)'>
            Right
          </Text>
          <Text fontFamily={'Noto Sans'} color={colors.faintblack} fontSize={'11px'} transform='rotate(-90deg)'>
            Left
          </Text>
        </Box>
        <Box maxW='100%'>
          <PointBarChart type={horseSide} data={data} />
        </Box>
      </Box>
    </Box>
  )
}

export default DeficitGraph
