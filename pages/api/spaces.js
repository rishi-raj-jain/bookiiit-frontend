import redis, { errorResponseError, invalidMethodError, noCaseBody, okResponseBody, verifyUserAsAdmin } from '@/lib/redis'

const spaces = async (req, res) => {
  try {
    const userEmail = res.userData.username
    if (req.method === 'GET') {
      const { spaceName } = req.query
      // Get a space
      if (spaceName) {
        // Search for key spaceName inside spaces
        let Space = JSON.parse(await redis.hget('spaces', spaceName))
        res.status(Space ? 200 : 400).json(Space ? { code: 1, Space } : errorResponseError)
      }
      // Get spaces
      else {
        // Send all under spaces
        let Spaces = await redis.hvals('spaces')
        Spaces.forEach((i, ind) => {
          // Parse each string of space
          if (i) {
            Spaces[ind] = JSON.parse(i)
            const { name, slug, image, building, capacity, spaceType, createdAt, ifDirect } = Spaces[ind]
            Spaces[ind] = { name, slug, image, building, capacity, spaceType, createdAt, ifDirect }
          }
        })
        res.status(200).json({ code: 1, Spaces })
      }
    }
    // Create spaces
    else if (req.method === 'POST') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { name, image, spaceType, capacity, ifDirect, building } = req.body
        if (!(typeof name === 'string') || !name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Space Namme] Incorrect format.' })
          return
        }
        let slug = name.toLowerCase().trim().replace(/\s+/g, '-')
        const spaceObj = {
          name,
          image,
          spaceType,
          capacity,
          slug,
          ifDirect,
          building,
          createdAt: Date.now(),
        }
        // Set value inside spaces based on the spaceName
        await redis.hset('spaces', name, JSON.stringify(spaceObj))
        res.status(200).json(okResponseBody)
        return
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    }
    // Update the value for a given space with the given value
    else if (req.method === 'PUT') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { name } = req.body
        if (!(typeof name === 'string') || !name || name.length < 1) {
          res.status(400).json({ code: 0, message: '[Space Namme] Incorrect format.' })
          return
        }
        // Get over each attribute whatever present in the body
        let keys = Object.keys(req.body)
        for (const i of keys) {
          // If not name, update the value given that it's defined
          if (i !== 'name' && req.body[i]) {
            let oldObj = JSON.parse(await redis.hget('spaces', name))
            // [i] represents key inside json
            await redis.hset('spaces', name, JSON.stringify({ ...oldObj, [i]: req.body[i] }))
          }
        }
        res.status(200).json(okResponseBody)
        return
      } else {
        res.status(400).json(noCaseBody)
        return
      }
    }
    // Delete the space
    else if (req.method === 'DELETE') {
      // If invalid userEmail
      if (!userEmail || userEmail.length < 1) {
        res.status(400).json({ code: 0, message: '[User] Login not found. Please login in the main app.' })
        return
      }
      if (await verifyUserAsAdmin(userEmail)) {
        const { name } = req.body
        await redis.hdel('spaces', name)
        res.status(200).json(okResponseBody)
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

export default spaces
