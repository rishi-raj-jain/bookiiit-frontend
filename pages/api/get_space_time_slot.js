import redis, { getStringDate, errorResponseError, invalidMethodError } from '@/lib/redis'

const spaceTimeSlot = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const userEmail = res.userData.username
      const { spaceName, dateBookedFor, startTime, endTime } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      const timeSlotObj = JSON.parse(await redis.hget(`${spaceName}_timeslots`, `${getStringDate(dateBookedFor)}_${startTime}_${endTime}`))
      res.status(200).json({ timeSlotObj })
      return
    } else {
      res.status(400).json(invalidMethodError)
      return
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
    return
  }
}

export default spaceTimeSlot
