import Head from 'next/head'
import redis from '@/lib/redis'
import { useState, useEffect } from 'react'

const FAQs = ({ userData, ssr }) => {
  const [faqs, setFaqs] = useState(ssr.faqs)
  useEffect(() => {
    // Update FAQs
    fetch('/api/faqs')
      .then((res) => res.json())
      .then((res) => {
        setFaqs(res['FAQs'])
      })
      .catch((e) => {
        // Show error status
        console.log(e)
      })
  }, [])
  return (
    <>
      {!ssr.enabled && (
        <Head>
          <noscript>
            <meta httpEquiv="refresh" content="0; url=/faq?ssr=true" />
          </noscript>
        </Head>
      )}
      <div className="mx-auto flex max-w-7xl flex-col px-4">
        <div className="z-20 mx-auto w-full py-12 px-4 dark:text-white sm:px-6 lg:py-16 lg:px-8">
          {faqs && faqs.length > 0 ? (
            <>
              <h2 className="bg-gradient-to-r from-gray-600 via-teal-400 to-teal-600 bg-clip-text text-6xl font-extrabold text-transparent dark:text-white">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {faqs.map((i, _ind) => (
                  <div key={_ind} className="mt-5 flex flex-col space-y-3 rounded border p-5 hover:shadow dark:border-teal-500">
                    <span className="text-xl font-semibold dark:text-gray-100">Q. {i.q}</span>
                    <span className="text-lg text-teal-600 dark:text-white">A. {i.a}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            'No Frequently Asked Questions'
          )}
        </div>
      </div>
    </>
  )
}

export default FAQs

export async function getServerSideProps({ req, res, query }) {
  let userData = res.userData
  let ssr = query?.ssr === 'true'
  let FAQs = []
  if (ssr && userData?.username && req.headers?.referer?.includes(process.env.DEPLOYMENT_URL)) {
    FAQs = await redis.hvals('faqs')
    FAQs.forEach((i, ind) => {
      if (i) FAQs[ind] = JSON.parse(i)
    })
  }
  return {
    props: {
      ssr: { faqs: FAQs, enabled: ssr },
      userData,
    },
  }
}
