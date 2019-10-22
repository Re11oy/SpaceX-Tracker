import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import Label from '../Common/Label';
import { theme } from '../theme';
import { MONTHS } from '../constants';
import Launch from '../Models/Launch';

const Wrapper = styled.View`
  background: ${theme.colors.cardBackground};
  margin: 20px;
  border-radius: 15px;
  padding: 20px 15px 20px 20px;
`;

const DateWrapper = styled(LinearGradient)`
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Day = styled.Text<{ large?: boolean }>`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 20 : 13)}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Desc = styled.Text<{ bold?: boolean }>`
  color: white;
  font-size: 15px;
  margin-top: 5px;
  ${({ bold }) => bold && 'font-weight: bold;'}
`;

export interface Props {
  data?: Launch;
}
const CalendarCard: React.FC<Props> = ({ data }) => {
  const launchTime = new Date(data.netstamp * 1000);
  return (
    <Wrapper>
      <Row>
        <DateWrapper colors={['#ffb39d', '#ff43bb']} start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}>
          <>
            <Day>{launchTime.getDate()}</Day>
            <Day>{MONTHS[launchTime.getMonth()]}</Day>
          </>
        </DateWrapper>
        <Label numberOfLines={2} text={data.name} />
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>{data.name}</Desc>
    </Wrapper>
  );
};
export default CalendarCard;
