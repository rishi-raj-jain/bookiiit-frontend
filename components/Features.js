import { AdjustmentsIcon, CalendarIcon, CollectionIcon, MailIcon } from '@heroicons/react/outline'

const features = [
  {
    heading: 'Visualization of Time Slots in RealTime',
    text: 'Visualisation of the time slots provides clarity and high transparency in the booking process and eliminates clashes in time slots of the venues.',
    icon: CalendarIcon,
  },
  {
    heading: 'Mail & Google Calendar Integration',
    text: 'Mailing system notifies the user at each step of the booking process increasing the assurance of confirmation status of bookings. BOOKiiIT also helps you in keeping track of bookings with the use of customized reminders and google calendar integration.',
    icon: MailIcon,
  },
  {
    heading: 'Keep Track of Events with Ease',
    text: 'The Event Section displays the events that are scheduled in the spaces. This allows users to keep track of events with greater ease. The user can also visualize the events in the calendar view.',
    icon: CollectionIcon,
  },
  {
    heading: 'Efficient Management of Bookings',
    text: 'User bookings are segregated into different categories like Approved, Pending, Canceled, Rejected and Previous Requests for ease of management. User can also visualise his/her bookings in the calendar mode and download the report of all his bookings in the form of a csv file.',
    icon: AdjustmentsIcon,
  },
]

const Features = () => {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-bold leading-8 text-teal-600 dark:text-white sm:text-4xl">BOOKiiIT to meet your needs</p>
        </div>
        <div className="mt-10">
          <div className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.heading} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-teal-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6 text-gray-900 dark:text-white">{feature.heading}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-200">{feature.text}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
