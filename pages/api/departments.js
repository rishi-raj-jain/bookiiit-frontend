import redis, { errorResponseError, invalidMethodError, noCaseBody, okResponseBody, verifyUserAsAdmin } from '@/lib/redis'

const departments = async (req, res) => {
  try {
    const userEmail = res.userData.username
    // Get all the departments
    if (req.method === 'GET') {
      let Departments = []
      let departments = await redis.hvals('departments')
      departments.forEach((i) => {
        if (i) Departments.push(JSON.parse(i))
      })
      res.status(200).json({ Departments })
      return
    }
    // Create a department
    else if (req.method === 'POST') {
      const { name } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        if (!name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Context Name] Incorrect format.' })
          return
        } else {
          const departmentObj = {
            name,
            createdAt: Date.now(),
          }
          await redis.hset('departments', departmentObj['createdAt'], JSON.stringify(departmentObj))
          res.status(200).json(okResponseBody)
          return
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    }
    // Delete department(s)
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { createdAt } = req.body
        // Delete one Department
        if (createdAt) {
          await redis.hdel('departments', createdAt)
          res.status(200).json(okResponseBody)
        }
        // Delete all departments
        else {
          await redis.del('departments')
          res.status(200).json(okResponseBody)
        }
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    } else {
      res.status(400).json(invalidMethodError)
    }
  } catch (e) {
    console.log(e)
    res.status(400).json(errorResponseError)
  }
}

export default departments
