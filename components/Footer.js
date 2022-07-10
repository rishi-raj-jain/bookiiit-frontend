const Footer = () => {
  return (
    <footer className="my-10 mx-auto max-w-7xl border-t px-4 dark:text-gray-200">
      <div className="container grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        <div className="mt-10 flex flex-col space-y-4">
          <img src="/assets/icon/horizontal-icon.png" height={265 / 5} width={975 / 5} />
          <img className="mt-1" src="/assets/images/iiitd-logo-color.png" height={438 * 4} width={65 * 4} />
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          <h2 className="text-lg font-medium">Follow Us</h2>
          <div className="flex flex-row space-x-3">
            <a target="_blank" href="https://www.facebook.com/IIITDelhi/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-teal-600 dark:fill-white" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a target="_blank" href="https://www.linkedin.com/school/iiit-delhi/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-teal-600 dark:fill-white" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </a>
            <a target="_blank" href="https://twitter.com/IIITDelhi">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-teal-600 dark:fill-white" viewBox="0 0 16 16">
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </a>
            <a target="_blank" href="https://www.quora.com/topic/Indraprastha-Institute-of-Information-Technology-Delhi-IIIT-Delhi">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-teal-600 dark:fill-white" viewBox="0 0 16 16">
                <path d="M8.73 12.476c-.554-1.091-1.204-2.193-2.473-2.193-.242 0-.484.04-.707.142l-.43-.863c.525-.45 1.373-.808 2.464-.808 1.697 0 2.568.818 3.26 1.86.41-.89.605-2.093.605-3.584 0-3.724-1.165-5.636-3.885-5.636-2.68 0-3.839 1.912-3.839 5.636 0 3.704 1.159 5.596 3.84 5.596.425 0 .811-.046 1.166-.15Zm.665 1.3a7.127 7.127 0 0 1-1.83.244C3.994 14.02.5 11.172.5 7.03.5 2.849 3.995 0 7.564 0c3.63 0 7.09 2.828 7.09 7.03 0 2.337-1.09 4.236-2.675 5.464.512.767 1.04 1.277 1.773 1.277.802 0 1.125-.62 1.179-1.105h1.043c.061.647-.262 3.334-3.178 3.334-1.767 0-2.7-1.024-3.4-2.224Z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          <h2 className="text-lg font-medium">Contact Us</h2>
          <div className="dark:text-coolGray-400 flex flex-col space-y-2 text-sm">
            <a rel="noopener noreferrer" href="mailto:bookiiit.iiitd.ac.in">
              {'bookiiit.iiitd.ac.in'}
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col space-y-4">
          <h2 className="text-lg font-medium">Designed & Developed By</h2>
          <div className="dark:text-coolGray-400 flex flex-col space-y-2 text-sm">
            <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/rishi-raj-jain">
              Rishi Raj Jain
            </a>
            <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/himanshu-singh-b028a4151">
              Himanshu Singh
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
