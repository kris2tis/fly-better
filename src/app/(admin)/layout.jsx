import React from 'react'

export default function Layout({children}) {
  return (
    <div>
      <span className='mb-3'>پنل ادمین</span>
      {children}
    </div>
  )
}
