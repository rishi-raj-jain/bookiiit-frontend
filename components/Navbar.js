import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline'

const Navbar = ({ userData }) => {
  return (
    <Popover className="relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-row items-center justify-between border-b border-gray-100 py-3">
          <div className="flex justify-start">
            <Link passHref href="/">
              <a>
                <img className="h-8 w-auto sm:h-10" src="/assets/icon/horizontal-icon.png" alt="BookIIIT Logo" />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden flex-row items-center space-x-5 md:flex">
            <Link passHref href="/about">
              <a className="hidden text-base text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white md:block">About</a>
            </Link>
            <Link passHref href="/faq">
              <a className="hidden text-base text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white md:block">FAQs</a>
            </Link>
            <Link passHref href="/events">
              <a className="hidden text-base text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white md:block">Events</a>
            </Link>
          </div>
          {userData && userData.first_name && userData.last_name && (
            <Link passHref href="/dashboard">
              <a className="hidden flex-row items-center text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white md:flex">
                <span className="mr-2 text-base">{`${userData.first_name} ${userData.last_name}`}</span>
                <UserCircleIcon className="h-6 w-6" />
              </a>
            </Link>
          )}
        </div>
      </div>
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src="/assets/icon/horizontal-icon.png" alt="Workflow" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5 md:hidden">
              <div className="flex flex-col">
                <Link passHref href="/about">
                  <a className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">About &rarr;</a>
                </Link>
                <Link passHref href="/events">
                  <a className="mt-5 text-base text-gray-500 hover:text-gray-900 dark:text-gray-200">Events &rarr;</a>
                </Link>
                <Link passHref href="/faq">
                  <a className="mt-5 text-base text-gray-500 hover:text-gray-900 dark:text-gray-200">Frequently Asked Questions &rarr;</a>
                </Link>
              </div>
              {userData && userData.first_name && userData.last_name && (
                <Link passHref href="/dashboard">
                  <a className="flex flex-row items-center">
                    <UserCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-200" />
                    <span className="ml-2 text-base text-gray-500 hover:text-gray-900 dark:text-gray-200">{`${userData.first_name} ${userData.last_name}`}</span>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Navbar
