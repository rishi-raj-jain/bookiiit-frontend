const About = ({ userData }) => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col px-4">
      <div className="z-20 mx-auto w-full py-12 px-4 dark:text-white sm:px-6 lg:py-16 lg:px-8">
        <h2 className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">About BOOKiiIT</h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">
          BOOKiiIT is a cross platform application that provides various functionalities related to booking of spaces in IIITD and management of these bookings. The spaces open for booking are shown
          with their available timeslots and the user can choose and book them according to his needs. They can manage their bookings in one place and contact the concerned authority in case of help.
          This would help in making the booking process much simpler and efficient.
        </h2>
        <h2 className="mt-10 bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">How To Use</h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">* Choose a building or search for a space (use filters for refinement). This will teleport you to a booking screen.</h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">
          * Booking screen has 3 sections- 1st section displays the summary for the space, 2nd Section displays the booking card and 3rd section displays the timeslots. Few questions that may arise in
          your mind are clarified below:
        </h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">How to perform a booking in the booking screen?</h2>
        <ol className="text-gray-500 dark:text-gray-200">
          <li>Choose a date</li>
          <li>Choose a time slot (directly from time slots or from dropdown in booking card)</li>
          <li>Do state the description/reason</li>
          <li>Choose the time duration of the reminder</li>
          <li>Press the BookIT button</li>
        </ol>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">
          What is an event option? <br />
          The booking can be made into an event. The event bookings are displayed in the Event tab of the BOOKiiIT. Few usecases of this are bookings for workshop, guest lectures, club events, etc.
        </h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">This all you need to become a master of booking spaces in BOOKiiIT.</h2>
        <h2 className="mt-5 text-left text-xl text-gray-500 dark:text-gray-200">
          Now you may want to manage, cancel or lookup your bookings. For this checkout the MyBooking Tab which has your bookings segregated into different categories. You can easily cancel your
          bookings from there. <br />
          Also do checkout the event tab to keep yourself updated for the upcoming events. <br />
        </h2>
        <h2 className="mt-5 text-left text-xl font-medium text-teal-600 dark:text-gray-200">Thank you for investing your time in reading this!</h2>
      </div>
    </div>
  )
}

export default About

export async function getServerSideProps({ res }) {
  let userData = res.userData
  return {
    props: {
      userData,
    },
  }
}
