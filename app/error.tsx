'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <Button size="lg" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </main>
  )
}
