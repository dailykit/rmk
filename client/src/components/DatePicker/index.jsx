import React, { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'
// import './datepicker.css'
import {
   addDays,
   addWeeks,
   format,
   getDate,
   isBefore,
   isSameDay,
   subDays,
   subWeeks,
} from 'date-fns'

export default function DatePicker(props) {
   const [selectedDate, setSelectedDate] = useState(new Date())
   const [softSelect, setSoftSelect] = useState(new Date())
   const [currentWeek, setCurrentWeek] = useState(new Date())
   const [currentDate] = useState(new Date())
   const { endDate, shouldScroll } = props
   let { selectDate } = props
   let scroll = false
   shouldScroll === true ? (scroll = true) : (scroll = false)
   let maxValue
   if (scroll === false) {
      maxValue = 7
   } else {
      maxValue = endDate | 90
   }
   const getStyles = day => {
      const classes = []
      if (isSameDay(day, selectedDate)) {
         classes.push('h-full bg-blue-500 text-white DateDayItem--selected')
      }
      if (isBefore(day, currentDate)) {
         classes.push('text-gray-500 DateDayItem--disabled')
      }
      return classes.join(' ')
   }
   const getId = day => {
      if (isSameDay(day, selectedDate)) {
         return 'selected'
      } else {
         return ''
      }
   }
   const getScroll = () => {
      if (scroll === true) {
         return 'Datepicker--DateList--scrollable'
      } else {
         maxValue = 7
         return 'Datepicker--DateList'
      }
   }

   function renderDays() {
      const dayFormat = 'E'
      const dateFormat = 'd'
      const days = []
      let startDay = subDays(currentWeek, 1)
      for (let i = 0; i < maxValue; i++) {
         days.push(
            <div
               id={`${getId(addDays(startDay, i))}`}
               className={`flex-1 text-center py-2 rounded cursor-pointer Datepicker--DateDayItem ${getStyles(
                  addDays(startDay, i)
               )}`}
               key={i * i + 2}
               onClick={() => onDateClick(addDays(startDay, i))}
            >
               {getDate(addDays(startDay, i)) === 1 ? (
                  <Waypoint
                     horizontal={true}
                     onEnter={() => setSoftSelect(addDays(startDay, i))}
                  />
               ) : null}
               {getDate(addDays(startDay, i)) === 20 ? (
                  <Waypoint
                     horizontal={true}
                     onEnter={() => setSoftSelect(addDays(startDay, i))}
                  />
               ) : null}
               {isSameDay(addDays(startDay, i), currentDate) ? (
                  <Waypoint
                     horizontal={true}
                     onEnter={() => setSoftSelect(addDays(startDay, i))}
                  />
               ) : null}
               <div className={'Datepicker--DayLabel'} key={i}>
                  {format(addDays(startDay, i), dayFormat)}
               </div>
               <div className={'Datepicker--DateLabel'} key={i * i + 1}>
                  {format(addDays(startDay, i), dateFormat)}
               </div>
            </div>
         )
      }
      return (
         <div id={'container '} className={`${getScroll()} w-full flex`}>
            {days}
         </div>
      )
   }

   const onDateClick = day => {
      if (!isBefore(day, currentDate)) {
         selectDate = null
         setSelectedDate(day)
         if (props.getSelectedDay) {
            props.getSelectedDay(day)
         }
      }
   }

   useEffect(() => {
      if (props.getSelectedDay) {
         if (selectDate) {
            props.getSelectedDay(selectDate)
         } else {
            props.getSelectedDay(new Date())
         }
      }
   }, [props, selectDate])

   useEffect(() => {
      if (selectDate) {
         if (!isSameDay(selectedDate, selectDate)) {
            setSelectedDate(selectDate)
            setTimeout(() => {
               let view = document.getElementById('selected')
               if (view) {
                  view.scrollIntoView({
                     behavior: 'smooth',
                     inline: 'center',
                     block: 'nearest',
                  })
               }
            }, 20)
         }
      }
   }, [selectDate, selectedDate])

   let e = document.getElementById('container')
   let width = e ? e.getBoundingClientRect().width : null

   const nextWeek = () => {
      scroll
         ? (document.getElementById('container').scrollLeft += width)
         : setCurrentWeek(addWeeks(currentWeek, 1))
   }

   const prevWeek = () => {
      scroll
         ? (document.getElementById('container').scrollLeft -= width)
         : setCurrentWeek(subWeeks(currentWeek, 1))
   }

   // noinspection SpellCheckingInspection
   const dateFormat = 'MMMM yyyy'
   return (
      <div className={'Datepicker--Container flex'}>
         <div className={'w-full Datepicker--Strip '}>
            <span
               className={
                  'text-blue-400 font-medium pl-3 Datepicker--MonthYearLabel'
               }
            >
               {scroll
                  ? format(softSelect, dateFormat)
                  : format(currentWeek, dateFormat)}
               {/*{!scroll? isSameMonth(softSelect,currentWeek)? null: " / " + format(softSelect, dateFormat) : null}*/}
            </span>
            <div className={'w-full flex mt-3'}>
               <button
                  className={'Datepicker--button-prev px-2 bg-gray-200'}
                  onClick={prevWeek}
               >
                  <ChevronLeft />
               </button>
               {renderDays()}
               <button
                  className={'Datepicker--button-next px-2 bg-gray-200'}
                  onClick={nextWeek}
               >
                  <ChevronRight />
               </button>
            </div>
         </div>
      </div>
   )
}

const ChevronLeft = ({ size = 24, color = '#000' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M15 18l-6-6 6-6" />
   </svg>
)

const ChevronRight = ({ size = 24, color = '#000' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M9 18l6-6-6-6" />
   </svg>
)
