import classNames from 'classnames'
import { Tab } from '@headlessui/react'
import { sortItems } from '@/lib/helper'
import RequestCard from '@/components/RequestCard'
import { Fragment, useState, useEffect } from 'react'
import SortComponent from '@/components/SortComponent'

const Dashboard = ({ userData }) => {
  const [sortType, setSortType] = useState(1)
  const [requests, setRequests] = useState([])
  const [showRequests, setShowRequests] = useState([])
  const [requestsList, setRequestsList] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedHashtags, setSelectedHashtags] = useState({})
  const [selectedValue, setSelectedValue] = useState('Sort By')

  useEffect(() => {
    fetch(`/api/user_requests`)
      .then((res) => res.json())
      .then((res) => {
        if (res['requests']) setRequestsList(res.requests)
      })
  }, [])

  // In case events or sortingType changes
  useEffect(() => {
    sortItems(requests, selectedHashtags, sortType, selectedStatus, setShowRequests)
  }, [requests, sortType, selectedHashtags, selectedStatus])

  useEffect(() => {
    if (requestsList.length > 0) {
      setRequests([])
      requestsList.forEach((i) => {
        fetch(`/api/requests?requestID=${i}`)
          .then((res) => res.json())
          .then((res) => {
            if (res && res['requestObj']) {
              setRequests((requests) => [res['requestObj'], ...requests])
            }
          })
      })
    }
  }, [requestsList])

  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4">
      <div className="z-20 mx-auto w-full py-12 px-4 dark:text-white sm:px-6 lg:py-16 lg:px-8">
        <h2 className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">Dashboard</h2>
        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'mt-5 rounded py-2 px-5 dark:border dark:border-teal-400',
                    { 'bg-teal-600 font-bold text-white dark:bg-transparent dark:text-white dark:shadow': selected },
                    { 'border border-teal-600 text-teal-600 dark:text-gray-200': !selected }
                  )}
                >
                  My Requests
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={classNames(
                    'mt-5 ml-2 rounded py-2 px-5 dark:border dark:border-teal-400',
                    { 'bg-teal-600 font-bold text-white dark:bg-transparent dark:text-white dark:shadow': selected },
                    { 'border border-teal-600 text-teal-600 dark:text-gray-200': !selected }
                  )}
                >
                  My Event Requests
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <h2 className="text-md mt-5 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent dark:text-white">Sort By</h2>
              <SortComponent selectedValue={selectedValue} setSelectedValue={setSelectedValue} setSortType={setSortType} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {showRequests.filter((i) => !i.ifEvent).length > 0 ? (
                  showRequests.filter((i) => !i.ifEvent).map((i) => <RequestCard key={`${i.dateBookedOn}_${i.status}`} {...i} />)
                ) : (
                  <span className="mt-5">No requests to show.</span>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <h2 className="text-md mt-5 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent dark:text-white">Sort By</h2>
              <SortComponent selectedValue={selectedValue} setSelectedValue={setSelectedValue} setSortType={setSortType} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
              <h2 className="text-md mt-5 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text font-extrabold text-transparent dark:text-white">Filter By Hashtags</h2>
              {requests.filter((i) => i.ifEvent).length > 0 && (
                <div className="mt-1 flex flex-row flex-wrap gap-2">
                  {Object.keys(
                    requests
                      .filter((i) => i.ifEvent)
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
                {showRequests.filter((i) => i.ifEvent).length > 0 ? (
                  showRequests
                    .filter((i) => i.ifEvent)
                    .map((i) => (
                      <Fragment key={`${i.dateBookedOn}_${i.status}`}>
                        <RequestCard {...i} />
                      </Fragment>
                    ))
                ) : (
                  <span className="mt-5">No events to show.</span>
                )}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default Dashboard

export async function getServerSideProps({ res }) {
  let userData = res.userData
  return {
    props: {
      userData,
    },
  }
}
