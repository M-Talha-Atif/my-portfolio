'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const hideNavbar = pathname.startsWith('/projects/') || pathname.startsWith('/r/')

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  )
}
