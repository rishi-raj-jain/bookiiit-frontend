import classNames from 'classnames'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const TimeSlots = ({ setStartTime, setEndTime, globalTime, selectedDate, spaceName }) => {
  const [slots, setSlots] = useState([])

  useEffect(async () => {
    setSlots([])
    for (let i = 0; i < globalTime.length - 1; i++) {
      let startTime = globalTime[i].name.replace(':', '_')
      let endTime = globalTime[i + 1].name.replace(':', '_')
      let resp = await fetch('/api/get_space_time_slot', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          endTime,
          startTime,
          spaceName,
          dateBookedFor: selectedDate,
        }),
      })
      if (!resp.ok) {
        toast(`Timeslot details for ${selectedDate} from ${startTime} to ${endTime} couldn't be fetched.`, {
          theme: 'colored',
          type: 'info',
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          toastId: 2,
        })
      } else {
        let data = await resp.json()
        let newSlot = {}
        if (data.timeSlotObj && Object.keys(data.timeSlotObj).length > 0) {
          newSlot = { startTime, endTime, ...data.timeSlotObj, className: '' }
        } else {
          newSlot = { startTime, endTime, booked: false, ifTimeTable: false, className: '' }
        }
        let newDate = new Date()
        let sTime = new Date(`${selectedDate} ${startTime.replace('_', ':')}`)
        if (newDate < sTime) {
        } else {
          newSlot['old'] = true
        }
        setSlots((slots) => [...slots, newSlot])
      }
    }
  }, [selectedDate])

  return (
    <>
      <h1 className="text-3xl font-bold dark:text-gray-200">
        Time Slots on <span className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-3xl font-extrabold text-transparent dark:text-white">{selectedDate}</span>
      </h1>
      <span className="h-[10px] w-[10px] bg-green-600"></span>
      <div className="mt-5 flex flex-row flex-wrap gap-3">
        {slots.map((i, _ind) => (
          <div
            key={i.startTime}
            onClick={(e) => {
              // Don't do anything if this is an old slot
              if (i.old) {
                toast(`That slot is not available for booking anymore.`, {
                  theme: 'colored',
                  type: 'error',
                  position: 'bottom-right',
                  autoClose: 1000,
                  hideProgressBar: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                  toastId: 2,
                })
                return
              }
              let newClass = i.className
              let temp = [...slots]
              if (newClass.includes('border')) {
                newClass = ''
              } else {
                newClass = 'border border-4 border-black'
              }
              temp.forEach((i) => {
                i.className = ''
              })
              temp[_ind].className = newClass
              setSlots(temp)
              setStartTime(i.startTime.replace('_', ':'))
              setEndTime(i.endTime.replace('_', ':'))
            }}
            className={classNames(
              i.className,
              'w-[130px] rounded border py-2 px-3 text-center dark:border-0',
              { 'bg-black text-white': i.old },
              { 'bg-red-600 text-white': i.booked && !i.ifTimeTable && !i.old },
              { 'bg-yellow-600 text-white': i.booked && i.ifTimeTable && !i.old },
              { 'cursor-pointer bg-green-600 text-white': !i.booked && !i.old }
            )}
          >
            <span>{i.startTime.replace('_', ':')}</span>
            <span>&nbsp;-&nbsp;</span>
            <span>{i.endTime.replace('_', ':')}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default TimeSlots
