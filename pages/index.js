import Link from 'next/link'
import Head from 'next/head'
import redis from '@/lib/redis'
import { status } from '@/lib/data'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Features from '@/components/Features'
import Select from '@/components/Select'

const Home = ({ userData, ssr }) => {
  const [space, setSpace] = useState(ssr.Spaces)
  const [spaces, setSpaces] = useState(ssr.Spaces)
  const [search, setSearch] = useState('')
  const [bookings, setBookings] = useState(ssr.Bookings)
  const [submitting, setSubmitting] = useState(false)
  const [contexts, setContexts] = useState(ssr.Contexts)
  const [departments, setDepartments] = useState(ssr.Departments)

  useEffect(() => {
    if (!userData) {
      window.location.href = 'http://fh.iiitd.edu.in/#login'
    }
    // Update spaces
    fetch('/api/spaces')
      .then((res) => res.json())
      .then((res) => {
        setSpace(res['Spaces'])
        setSpaces(res['Spaces'])
      })
      .catch((e) => {
        // Show error status
        console.log(e)
      })
    // Update Contexts
    fetch('/api/contexts')
      .then((res) => res.json())
      .then((res) => {
        setContexts([
          { name: 'Select Context', unavailable: true },
          ...res['Contexts']
            .filter((i) => i.name)
            .map((i) => ({
              name: i.name,
            })),
        ])
      })
      .catch((e) => {
        // Show error status
        console.log(e)
      })
    // Update departments
    fetch('/api/departments')
      .then((res) => res.json())
      .then((res) => {
        setDepartments([
          { name: 'Select Admin Department', unavailable: true },
          ...res['Departments']
            .filter((i) => i.name)
            .map((i) => ({
              name: i.name,
            })),
        ])
      })
      .catch((e) => {
        // Show error status
        console.log(e)
      })
    // Update booking numbers
    fetch('/api/count_requests')
      .then((res) => res.json())
      .then((res) => {
        setBookings(res['requests'])
      })
      .catch((e) => {
        // Show error status
        console.log(e)
      })
  }, [])

  const changeSpaces = (e) => {
    setSearch(e.target.value)
    if (e.target.value.length > 0) {
      let temp = spaces.filter((i) => i.name.toLowerCase().includes(e.target.value.toLowerCase()))
      setSpace(temp)
      if (temp.length < 1) {
        toast('No spaces found matching that input. Try searching again.', {
          theme: 'colored',
          type: 'info',
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
          toastId: 1,
        })
      }
    } else setSpace(spaces)
  }

  return (
    <>
      {!ssr.enabled && (
        <Head>
          <noscript>
            <meta httpEquiv="refresh" content="0; url=/?ssr=true" />
          </noscript>
        </Head>
      )}
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <div className="z-20 mx-auto w-full py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="dark:text-white">
            <span className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">Welcome to BOOKiiIT</span>
            <span className="mt-3 block text-2xl text-gray-500 dark:text-gray-200">Booking spaces was never this easy. Let's start by choosing a space.</span>
          </h2>
        </div>
        {ssr.Spaces.length < 1 && (
          <div className="flex flex-grow flex-row items-center justify-center">
            <input
              type="search"
              value={search}
              onChange={changeSpaces}
              placeholder="Search By Space Name"
              className="form-input w-full border-teal-600 px-3 py-1.5 text-base font-normal text-gray-700 dark:border-teal-300 dark:bg-teal-600 dark:text-white dark:placeholder:text-gray-200"
            />
          </div>
        )}
        {space && space.length > 0 && (
          <div className="flex space-x-5 overflow-x-scroll">
            {space.map((i) => (
              <div key={i.createdAt} className="my-20 flex min-w-[320px] flex-col rounded-lg border py-4 px-8 hover:shadow-lg">
                <div className="-mt-16 flex justify-start">
                  <img className="h-20 w-20 rounded-full border-2 border-teal-500 object-cover" src={i.image} />
                </div>
                <div className="mt-3">
                  {i && i.name && <h2 className="text-3xl font-semibold text-teal-600 dark:text-white">{i.name}</h2>}
                  {i && i.spaceType && <p className="text-md mt-2 text-gray-600 dark:text-gray-200">{`Space Type: ${i.spaceType}`}</p>}
                  {i && i.capacity && <p className="text-md mt-2 text-gray-600 dark:text-gray-200">{`Capacity: ${i.capacity}`}</p>}
                </div>
                <div className="mt-auto flex justify-end">
                  <Link href={`/spaces/${i.name}`}>
                    <a className="text-md rounded bg-teal-600 py-2 px-4 font-medium text-white shadow dark:border dark:border-gray-200">Book &rarr;</a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <Features />
        {ssr.Spaces.length < 1 && status(bookings, space.length).length > 0 && (
          <div className="flex flex-row items-center justify-center rounded border-t border-b py-5">
            {status(bookings, space.length).map((i, index) => (
              <div key={i.d} className={'flex flex-none flex-col items-center md:flex-1' + (index === status.length - 1 ? '' : ' border-r')}>
                <span className="mt-1 text-2xl font-bold text-teal-600 dark:text-white md:text-6xl">{i.n}</span>
                <span className="md:text-md mt-2 w-[30vw] break-normal text-center text-base font-normal text-gray-600 dark:text-gray-200 md:w-auto">{i.d}</span>
              </div>
            ))}
          </div>
        )}
        {contexts.length > 1 && departments.length > 1 && <h2 className="mt-10 text-xl font-medium leading-8 text-teal-500 dark:text-white sm:text-2xl">Your Feedback Is Valuable</h2>}
        {contexts.length > 1 && departments.length > 1 && (
          <form
            method="POST"
            target="_blank"
            id="feedbackForm"
            action="/api/feedback"
            className="mt-5 flex flex-col"
            onSubmit={(e) => {
              e.preventDefault()
              if (!submitting) {
                setSubmitting(true)
                if (window['context'] !== contexts[0].name && window['department'] !== departments[0].name && e.target.feedback.value.length > 0) {
                  fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      context: window['context'],
                      department: window['department'],
                      feedback: e.target.feedback.value,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      // Show successfully submitted
                      setSubmitting(false)
                      document.getElementById('feedbackForm').reset()
                      toast('Your feedback has been received.', {
                        theme: 'colored',
                        type: 'success',
                        position: 'bottom-right',
                        autoClose: 1000,
                        hideProgressBar: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        closeButton: false,
                      })
                    })
                    .catch((e) => {
                      console.log(e)
                      toast('Oops! Facing an error while recording feedback.', {
                        theme: 'colored',
                        type: 'error',
                        position: 'bottom-right',
                        autoClose: 1000,
                        hideProgressBar: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        closeButton: false,
                      })
                      setSubmitting(false)
                    })
                } else {
                  toast('Please enter your feedback.', {
                    theme: 'colored',
                    type: 'warning',
                    position: 'bottom-right',
                    autoClose: 1000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false,
                  })
                  setSubmitting(false)
                }
              } else {
                toast('Your feedback can not be processed as a the browser is busy submitting the previous one.', {
                  theme: 'colored',
                  type: 'info',
                  position: 'bottom-right',
                  autoClose: 1000,
                  hideProgressBar: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  closeButton: false,
                })
              }
            }}
          >
            <div className="flex flex-row flex-wrap gap-3">
              <Select name="context" items={contexts} />
              <Select name="department" items={departments} />
            </div>
            <label className="block">
              <textarea
                rows="3"
                name="feedback"
                placeholder="Your feedback."
                className="form-textarea mt-2 block w-full rounded-lg border border-gray-100 p-5 shadow-sm focus:outline-none dark:bg-transparent dark:text-white dark:placeholder:text-gray-200"
              ></textarea>
            </label>
            <button
              type="submit"
              className="mt-3 inline-flex w-36 items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base text-white shadow-sm hover:bg-teal-700 dark:border dark:border-gray-200"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  )
}

export default Home

export async function getServerSideProps({ req, res, query }) {
  let userData = res.userData
  let ssr = query?.ssr === 'true'
  let Bookings = 200
  let Spaces = []
  let Contexts = [{ name: 'Select Context', unavailable: true }]
  let Departments = [{ name: 'Select Admin Department', unavailable: true }]
  if (ssr && userData?.username && req.headers?.referer?.includes(process.env.DEPLOYMENT_URL)) {
    Spaces = await redis.hvals('spaces')
    Spaces.forEach((i, ind) => {
      if (i) {
        Spaces[ind] = JSON.parse(i)
        const { name, slug, image, building, capacity, spaceType, createdAt, ifDirect } = Spaces[ind]
        Spaces[ind] = { name, slug, image, building, capacity, spaceType, createdAt, ifDirect }
      }
    })
    let tempContexts = await redis.hvals('contexts')
    tempContexts.forEach((i) => {
      if (i) Contexts.push(JSON.parse(i))
    })
    let tempDepartments = await redis.hvals('departments')
    tempDepartments.forEach((i) => {
      if (i) Departments.push(JSON.parse(i))
    })
  }
  return {
    props: {
      userData,
      ssr: {
        Spaces,
        Bookings,
        Contexts,
        Departments,
        enabled: ssr,
      },
    },
  }
}
