const next = require('next')
const { parse } = require('url')
const { createServer } = require('http')
const Cors = require('cors')
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const port = 9015
const hostname = 'localhost'
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const authUser = async (token) => {
  if (token) {
    let resCall = await fetch('http://auth.fh.iiitd.edu.in/core/current_user/', {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
    let resRes = await resCall.json()
    if (!resCall.ok || !(resRes.hasOwnProperty('username') && resRes['username'].length > 0)) {
      return undefined
    }
    return resRes
  }
  return undefined
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      // let userData = {
      //   username: 'rishi18304@iiitd.ac.in',
      //   first_name: 'Rishi Raj',
      //   last_name: 'Jain',
      //   username_osa: 'rishi18304@iiitd.ac.in-2022-05-22 07:54:36.321160',
      //   is_verified: true,
      // }
      // res.userData = userData
      let userData = undefined
      let assumedCookie = req.headers.cookie
      if (assumedCookie) {
        assumedCookie = assumedCookie.split(';')
        if (assumedCookie.length > 0) {
          assumedCookie = assumedCookie.find((item) => item.includes('osa_token'))
          if (assumedCookie && assumedCookie.length > 'osa_token='.length) {
            assumedCookie = assumedCookie.substring('osa_token='.length)
            userData = await authUser(assumedCookie)
            if (userData) {
              res.userData = userData
            }
          }
        }
      }
      // Define the urls to verify the user for
      if (['/', '/dashboard'].includes(pathname) || pathname.includes('/spaces/')) {
        if (userData) {
          await handle(req, res, parsedUrl)
        }
        // redirect to the login
        else {
          await app.render(req, res, '/redirect')
        }
      }
      // For every other path, don't auth
      else {
        // If apis for except pages, verify the user before requesting
        if (pathname.includes('/api/')) {
          const cors = initMiddleware(
            // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
            Cors({
              methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            })
          )
          // Run cors
          await cors(req, res)
          if (userData) {
            await handle(req, res, parsedUrl)
          }
          // redirect to the login
          else {
            await app.render(req, res, '/redirect')
          }
        }
        // For any other request
        else {
          await handle(req, res, parsedUrl)
        }
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
