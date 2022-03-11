import React from 'react';
import {G, Text} from 'react-native-svg';
import {LabelsProps} from '../interfaces';

export const ChartLabel = (props: Partial<LabelsProps>) => {
  const {slices} = props as LabelsProps;
  return (
    <>
      {slices.map((slice: any, index: number) => {
        const {labelCentroid, pieCentroid, data, key} = slice;
        return (
          <G key={index}>
            <G x={pieCentroid[0]} y={pieCentroid[1]}>
              <Text
                key={index}
                x={-0.5}
                y={1.5}
                fill={'white'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={20}
                fontWeight={'bold'}
                stroke={'white'}
                opacity={'1'}
                strokeWidth={0.4}>
                {data.value}
              </Text>
            </G>
            <G x={labelCentroid[0]} y={labelCentroid[1]}>
              <Text
                key={index}
                x={-0.5}
                y={1.5}
                fill={data.svg.fill}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={11}
                fontWeight={'600'}
                stroke={'white'}
                opacity={'1'}
                strokeWidth={0.4}>
                {data.key}
              </Text>
            </G>
          </G>
        );
      })}
    </>
  );
};
