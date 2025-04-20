import { Button } from '@heroui/button'
import Link from 'next/link'
import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'

export function BackButton() {
  return <div className="mb-6">
    <Link href="/">
      <Button variant="ghost" className="pl-0 border-none px-3">
        <LuArrowLeft className="mr-2 h-4 w-4" />
        Regresar a productos
      </Button>
    </Link>
  </div>
}