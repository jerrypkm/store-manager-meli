import { BackButton } from '@/components/back-button'
import React from 'react'

const NotFoundPage = () => {
  return (<div className='container mx-auto py-8'>
    <BackButton></BackButton>
    <div className='mt-52 flex flex-col justify-center items-center'>
      <p className='text-9xl text-sky-600'>404</p>
      <p className='text-2xl'>La página solicitada no existe</p>
    </div>
  </div>
  )
}

export default NotFoundPage