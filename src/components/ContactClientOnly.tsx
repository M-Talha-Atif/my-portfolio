'use client'

import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false,
})

export default function ContactClientOnly() {
  return <Contact />
}


