import redis, { errorResponseError, invalidMethodError, verifyUserAsAdmin } from '@/lib/redis'

const invalidateAdmin = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const userEmail = res.userData.username
      const { adminToInvalidate } = req.body
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // In case incorrect format of username
      if (!adminToInvalidate || adminToInvalidate.length < 1) {
        res.status(400).json({ code: 0, message: '[Username] Incorrect format.' })
        return
      }
      // Check if the user invalidating is first the admin itself
      // In case credentials match, set the value of it being in admin true
      // Succesfully determined the user to be admin, now invalidate the admin user
      if (await verifyUserAsAdmin(userEmail)) {
        await redis.hdel('auth_lists', adminToInvalidate)
        res.status(200).json({ code: 1 })
        return
      } else {
        res.status(200).json({ code: 0 })
        return
      }
    } catch (e) {
      console.log(e)
      res.status(400).json(errorResponseError)
      return
    }
  } else {
    res.status(400).json(invalidMethodError)
    return
  }
}

export default invalidateAdmin
