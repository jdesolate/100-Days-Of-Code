import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Img } from '@chakra-ui/react';
import Calendar from '@toast-ui/react-calendar';
import moment from 'moment';
import React from 'react';
import {
  ISchedule,
  ICalendarInfo,
  IWeekDayNameInfo,
  ITimezoneHourMarker
} from 'tui-calendar';

import CreateIcon from 'assets/create-icon.svg';
import { get12HourFormatTimeFromDate } from 'utils/TimeUtils';

import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import * as S from './styles';

enum CalendarView {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
}

enum CalendarAction {
    BACK = 'back',
    NEXT = 'next'
}

export type DateRange = {
    start: Date;
    end: Date
}

type Props = {
    isReadOnly: boolean;
    calendars?: ICalendarInfo[];
    calendarRef: React.MutableRefObject<Calendar | undefined>;
    dateToday: Date;
    handleNavigate: React.Dispatch<React.SetStateAction<CalendarAction | undefined>>;
    schedules?: ISchedule[];
    onEditSchedule: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverallScheduleCalendarComponent(props: Props) {
  const {
    isReadOnly,
    calendars,
    calendarRef,
    dateToday,
    handleNavigate,
    schedules,
    onEditSchedule,
  } = props;

  function getTimeTemplate(schedule: ISchedule, isAllDay: boolean) {
    const html = [];

    if (!isAllDay) {
      html.push(
        '<strong>' +
        get12HourFormatTimeFromDate(new Date(schedule.start as Date)) + ' - ' +
        get12HourFormatTimeFromDate(new Date(schedule.end as Date)) +
        '</strong> '
      );
    }

    return html.join('');
  }

  const templates = {
    time: (schedule: ISchedule) => getTimeTemplate(schedule, false),
    timegridCurrentTime: (hourMarker: ITimezoneHourMarker) =>
      `${get12HourFormatTimeFromDate(hourMarker.hourmarker.toDate())}`,
    weekDayname: (model: IWeekDayNameInfo) => {
      const currentTileDay = moment(model.renderDate).weekday();
      const currentTileDate = moment(model.renderDate);
      const currentWeekSunday = moment().startOf('week').format('MM-DD-YYYY');
      const pastDate = moment().subtract(1, 'days');

      if (currentTileDay === 0 && currentTileDate.diff(currentWeekSunday) <= 0) {
        return `<span style="color:rgba(255, 64, 64, 0.5);font-size:26px">
            ${model.date}</span>
            &nbsp;&nbsp;
          <span style="color:rgba(255, 64, 64, 0.5); font-size:12px; font-weight:bold;">
            ${model.dayName}
          </span>`;
      }

      if (currentTileDay === 0 && currentTileDate.diff(currentWeekSunday) > 0) {
        return `<span style="color:#ff4040;font-size:26px">
            ${model.date}
          </span>&nbsp;&nbsp;<span style="color:#ff4040; font-size:12px; font-weight:bold;">
            ${model.dayName}
          </span>`;
      }

      if (currentTileDate.diff(pastDate) < 0) {
        return `<span style="color:#bbb;font-size:26px">
            ${model.date}
          </span>&nbsp;&nbsp;<span style="color:#bbb; font-size:12px; font-weight:bold;">
            ${model.dayName}
          </span>`;
      }

      return `<span style="color:#333;font-size:26px">${model.date}</span>&nbsp;&nbsp;
      <span style="color:#333; font-size:12px; font-weight:bold;">${model.dayName}</span>`;
    }
  };

  return (
    <S.CalendarContainer>
      <S.CalendarInnerContainer>
        <S.CalendarHeader>
          <S.CalendarNavigationMenu>
            <S.CalendarTitle>Overall Schedule</S.CalendarTitle>
            <S.CustomButton
              leftIcon={<Img src={CreateIcon} />}
              variant="solid"
              onClick={() => onEditSchedule(true)}
            >
            Edit Schedule
            </S.CustomButton>
          </S.CalendarNavigationMenu>
          <S.CalendarMenu>
            <S.DateNavigationIconButton
              aria-label="Go to previous month"
              icon={<ChevronLeftIcon />}
              size="sm"
              onClick={() => handleNavigate(CalendarAction.BACK)}
            />
            <S.DateNavigationText>
              {moment(dateToday).format('MMMM YYYY')}
            </S.DateNavigationText>
            <S.DateNavigationIconButton
              aria-label="Go to next month"
              icon={<ChevronRightIcon />}
              size="sm"
              onClick={() => handleNavigate(CalendarAction.NEXT)}
            />
          </S.CalendarMenu>
        </S.CalendarHeader>
        <S.CalendarContent>
          <Calendar
            ref={calendarRef as React.RefObject<Calendar>}
            useCreationPopup
            useDetailPopup
            calendars={calendars}
            disableDblClick={true}
            height="auto"
            isReadOnly={isReadOnly}
            month={{
              isAlways6Week: false,
              startDayOfWeek: 0,
            }}
            schedules={schedules}
            scheduleView={['time']}
            taskView={false}
            template={templates}
            usageStatistics={false}
            view={CalendarView.MONTH}
            week={{
              showTimezoneCollapseButton: true,
              timezonesCollapsed: false,
            }}
          />
        </S.CalendarContent>
      </S.CalendarInnerContainer>
    </S.CalendarContainer>
  );
}
