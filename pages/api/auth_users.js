import redis, { errorResponseError, invalidMethodError, noCaseBody, verifyUserAsAdmin } from '@/lib/redis'

const authUsers = async (req, res) => {
  try {
    const userEmail = res.userData.username
    if (req.method === 'GET') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      // Match the admin credentials from the .env
      // Check if the user invalidating is first the admin itself
      // In case credentials match, set the value of it being in admin true
      // Succesfully determined the user to be admin, now send the list of active admins
      if (await verifyUserAsAdmin(userEmail)) {
        let admins = await redis.hkeys('auth_lists')
        res.status(200).json({ code: 1, admins })
        return
      } else {
        res.status(400).json(noCaseBody)
        return
      }
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

export default authUsers
