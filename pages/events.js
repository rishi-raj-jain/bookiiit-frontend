import Head from 'next/head'
import { sortItems } from '@/lib/helper'
import RequestCard from '@/components/RequestCard'
import { Fragment, useEffect, useState } from 'react'
import SortComponent from '@/components/SortComponent'

const Events = ({ userData, ssr }) => {
  const [events, setEvents] = useState([])
  const [sortType, setSortType] = useState(1)
  const [showEvents, setShowEvents] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedHashtags, setSelectedHashtags] = useState({})
  const [selectedValue, setSelectedValue] = useState('Sort By')

  // As soon as it mounts
  useEffect(() => {
    fetch(`/api/events?scope=all`)
      .then((res) => res.json())
      .then((res) => {
        if (res['requests']) setRequestsList(res.requests)
      })
  }, [])

  // In case events or sortingType changes
  useEffect(() => {
    sortItems(events, selectedHashtags, sortType, selectedStatus, setShowEvents)
  }, [events, sortType, selectedHashtags, selectedStatus])

  useEffect(() => {
    if (requestsList.length > 0) {
      setEvents([])
      // Fetch each request object from the list of requests
      requestsList.forEach((i) => {
        fetch(`/api/requests?requestID=${i}`)
          .then((res) => res.json())
          .then((res) => {
            if (res && res['requestObj']) {
              // Only add in case it's an event and it's approved
              if (res['requestObj']['ifEvent'] && res['requestObj']['status'] === 'approved') {
                setEvents((events) => [res['requestObj'], ...events])
              }
            }
          })
      })
    }
  }, [requestsList])

  return (
    <>
      {!ssr.enabled && (
        <Head>
          <noscript>
            <meta httpEquiv="refresh" content="0; url=/events?ssr=true" />
          </noscript>
        </Head>
      )}
      {ssr.notAllowed && events.length < 1 ? (
        'You need Javascript to visit this page.'
      ) : (
        <div className="mx-auto flex max-w-7xl flex-col px-4">
          <div className="z-20 mx-auto w-full py-12 px-4 dark:text-white sm:px-6 lg:py-16 lg:px-8">
            <h2 className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">Events</h2>
            <h2 className="text-md mt-5 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent dark:text-white">Sort By</h2>
            <SortComponent selectedValue={selectedValue} setSelectedValue={setSelectedValue} setSortType={setSortType} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
            <h2 className="text-md mt-5 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent dark:text-white">Filter By Hashtags</h2>
            {events.length > 0 && (
              <div className="mt-1 flex flex-row flex-wrap gap-2">
                {Object.keys(
                  events
                    .map((i) => i.eventHashtags)
                    .reduce((dict, a) => {
                      let tempHashes = Object.keys(a)
                      for (let i in tempHashes) {
                        if (a[tempHashes[i]]) {
                          dict[tempHashes[i]] = true
                        }
                      }
                      return dict
                    }, {})
                ).map((i) => (
                  <span
                    key={i}
                    onClick={() => {
                      if (selectedHashtags.hasOwnProperty(i)) {
                        setSelectedHashtags({ ...selectedHashtags, [i]: !selectedHashtags[i] })
                      } else {
                        setSelectedHashtags({ ...selectedHashtags, [i]: true })
                      }
                    }}
                    className={`${selectedHashtags[i] ? 'bg-teal-500 text-white' : ''} appearance-none rounded border py-2 px-3 text-center outline-none hover:cursor-pointer`}
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {showEvents.length > 0 ? (
                showEvents.map((i) => (
                  <Fragment key={`${i.dateBookedOn}_${i.status}`}>
                    <RequestCard {...i} />
                  </Fragment>
                ))
              ) : (
                <span className="mt-5">No events to show.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Events

export async function getServerSideProps({ res, req, query }) {
  let userData = res.userData
  let ssr = query?.ssr === 'true'
  let notAllowed = false
  if (ssr && userData?.username && req.headers?.referer?.includes(process.env.DEPLOYMENT_URL)) {
    notAllowed = true
  }
  return {
    props: {
      ssr: { notAllowed, enabled: ssr },
      userData,
    },
  }
}
