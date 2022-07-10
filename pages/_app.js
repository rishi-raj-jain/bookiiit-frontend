import Head from 'next/head'
import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'

// Dynamically load, toast container, not necessary
const LazyToastContaner = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), { ssr: false })

function MyApp({ Component, pageProps }) {
  const [media, setMedia] = useState('print')
  const META_TITLE = `BOOKiiIT: Booking spaces was never this easy. Let's start by choosing a space.`
  const META_DESCRIPTION =
    'BOOKiiIT is a cross platform application that provides various functionalities related to booking of spaces in IIITD and management of these bookings. The spaces open for booking are shown with their available timeslots and the user can choose and book them according to his needs. They can manage their bookings in one place and contact the concerned authority in case of help. This would help in making the booking process much simpler and efficient.'
  const META_CANONICAL = 'https://booking.fh.iiitd.edu.in/bookiiitadmin'
  const META_FAVICON_IMAGE = `${META_CANONICAL}/assets/icon/favicon-image.png`
  const META_OG_IMAGE = `${META_CANONICAL}/assets/images/loginwithlogo.png`
  useEffect(() => {
    setMedia('all')
    import('react-toastify/dist/ReactToastify.css')
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>{META_TITLE}</title>
        <meta name="title" property="title" content={META_TITLE} />
        <meta name="og:title" property="og:title" content={META_TITLE} />
        <meta name="twitter:title" property="twitter:title" content={META_TITLE} />
        <meta name="description" property="description" content={META_DESCRIPTION} />
        <meta name="og:description" property="og:description" content={META_DESCRIPTION} />
        <meta name="twitter:description" property="twitter:description" content={META_DESCRIPTION} />
        {META_CANONICAL && <meta name="og:url" property="og:url" content={META_CANONICAL} />}
        {META_CANONICAL && <meta name="twitter:url" property="twitter:url" content={META_CANONICAL} />}
        <link rel="icon" href={META_FAVICON_IMAGE} />
        <meta name="image" property="og:image" content={META_OG_IMAGE} />
        <meta name="og:image" property="og:image" content={META_OG_IMAGE} />
        <meta name="twitter:image" property="twitter:image" content={META_OG_IMAGE} />
        {META_CANONICAL && <link rel="canonical" href={META_CANONICAL} />}
        <meta property="og:locale" content="en_IN" />
      </Head>
      <Navbar {...pageProps} />
      <Component {...pageProps} />
      <Footer />
      {/* If JS in enabled, defer CSS */}
      <link rel="stylesheet" media={media} href="/fonts/inter-var.woff2" />
      {/* If JS in enabled and component is mounted, then only load Toast Containers */}
      {media === 'all' && <LazyToastContaner style={{ width: window.innerWidth > 600 ? 600 : window.innerWidth + 'px' }} />}
    </>
  )
}

export default MyApp
