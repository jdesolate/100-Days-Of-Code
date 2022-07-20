import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import styled from 'styled-components';

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.white} !important;
  border-radius: 2px !important;
  height: 32px !important;
  width: 177px !important;
`;

export const CalendarHeader = styled(Flex)`
  flex-direction: column;
`;

export const CalendarTitle = styled(Flex)`
  font-weight: ${(props) => props.theme.fontWeights.black};
  font-size: ${(props) => props.theme.fontSizes.lg};
`;

export const CalendarNavigationMenu = styled(Flex)`
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarMenu = styled(Flex)`
  align-items: center;
  margin: 20px 0;
`;

export const DateNavigationIconButton = styled(IconButton)`
  background-color: ${(props) => props.theme.colors.gray10} !important;
  margin-right: 1px;
`;

export const DateNavigationText = styled(Text)`
  background-color: ${(props) => props.theme.colors.gray10};
  margin: 0 1px;
  padding: 3px 28px;
  min-height: 28px;
  width: 180px;
  text-align: center;
`;

export const CalendarViewOptionButton = styled(Button)`
  color: ${(props) => props.theme.colors.gray9} !important;
  background-color: transparent !important;
  margin-right: 1px;
  text-transform: capitalize;

  :focus {
    box-shadow: none !important;
  }

  &.selected {
    color: ${(props) => props.theme.colors.primaryColor} !important;
    border: 1px solid ${(props) => props.theme.colors.primaryColor} !important;
  }
`;

export const CalendarViewOptionText = styled(Text)`
  background-color: ${(props) => props.theme.colors.gray9};
`;

export const CalendarContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.gray3};
  border-top: none !important;
`;

export const TodayButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.gray10} !important;
  margin-left: 4px;
`;

export const CalendarContainer = styled(Box)`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray3};
  border-top: none !important;
  margin-left: 14px;
  padding: 30px;
  border-radius: 10px;
  overflow-x: scroll;

  .tui-full-calendar-holiday-sun {
    color: ${(props) => props.theme.colors.black1} !important;
  }

  .tui-full-calendar-weekday-grid-line.tui-full-calendar-near-month-day.tui-full-calendar-extra-date {
    background-color: ${(props) => props.theme.colors.gray2} !important;
  }

  .tui-full-calendar-dayname-container {
    overflow-y: hidden;
  }

  .tui-full-calendar-time-date-schedule-block {
    height: fit-content !important;
  }
`;

export const CalendarInnerContainer = styled(Box)`
  min-width: 760px;
  width: 100%;
`;
