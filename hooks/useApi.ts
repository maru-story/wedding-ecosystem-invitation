import { useState, useEffect, useCallback } from 'react'
import { Guest, Attendance, Message, AttendanceStats } from '@/types'

// Generic API hook with pagination
function useApiWithPagination<T>(url: string, pageSize: number = 20) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchData = useCallback(
    async (pageNum: number, reset: boolean = false) => {
      try {
        if (pageNum === 1) {
          setLoading(true)
        } else {
          setLoadingMore(true)
        }

        const response = await fetch(`${url}?page=${pageNum}&limit=${pageSize}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()

        // For now, since your API doesn't support pagination, we'll simulate it
        // In a real scenario, your API would return { data: T[], hasMore: boolean, total: number }
        const allData = Array.isArray(result) ? result : []
        const startIndex = (pageNum - 1) * pageSize
        const endIndex = startIndex + pageSize
        const pageData = allData.slice(startIndex, endIndex)

        if (reset || pageNum === 1) {
          setData(pageData)
        } else {
          setData((prev) => [...prev, ...pageData])
        }

        setHasMore(endIndex < allData.length)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [url, pageSize]
  )

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchData(nextPage)
    }
  }, [fetchData, loadingMore, hasMore, page])

  const refetch = useCallback(() => {
    setPage(1)
    setHasMore(true)
    fetchData(1, true)
  }, [fetchData])

  useEffect(() => {
    fetchData(1, true)
  }, [fetchData])

  return { data, loading, loadingMore, error, hasMore, loadMore, refetch }
}

// Regular API hook for non-paginated data
function useApi<T>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, options])

  const refetch = async () => {
    try {
      setLoading(true)
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Guest API hooks with pagination
export function useGuests() {
  return useApi<Guest[]>('/api/guest')
}

export function useGuestsPaginated(pageSize: number = 20) {
  return useApiWithPagination<Guest>('/api/guest', pageSize)
}

export function useGuest(id: string) {
  return useApi<Guest>(`/api/guest/${id}`)
}

export function useGuestByNickname(nickname: string) {
  return useApi<Guest>(`/api/guest/nickname/${nickname}`)
}

// Attendance API hooks with pagination
export function useAttendances() {
  return useApi<Attendance[]>('/api/attendance')
}

export function useAttendancesPaginated(pageSize: number = 20) {
  return useApiWithPagination<Attendance>('/api/attendance', pageSize)
}

// Messages API hooks with pagination
export function useMessages() {
  return useApi<Message[]>('/api/messages')
}

// Attendance Stats API hook
export function useAttendanceStats() {
  return useApi<AttendanceStats>('/api/attendance?stats=true')
}

export function useMessagesPaginated(pageSize: number = 20) {
  return useApiWithPagination<Message>('/api/messages', pageSize)
}

export function useLastIndex() {
  return useApi<number>('/api/guest/last-index')
}

// API action functions
export async function createAttendance(data: {
  guestId: number
  nama: string
  konfirmasi: string
  jumlahTamu: number
}) {
  const response = await fetch('/api/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit attendance')
  }

  return response.json()
}

export async function createMessage(data: {
  guestId: number
  message: string
  name: string
}) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit message')
  }

  return response.json()
}

// ADD THIS NEW FUNCTION
export async function updateGuest(
  id: number,
  data: {
    nama: string
    nickname: string
  }
) {
  const response = await fetch(`/api/guest/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update guest')
  }

  return response.json()
}

// OPTIONALLY ADD DELETE FUNCTION TOO
export async function deleteGuest(id: number) {
  const response = await fetch(`/api/guest/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete guest')
  }

  return response.json()
}

// Update your createGuest function in hooks/useApi.ts

export async function createGuest(data: {
  nama: string
  nickname: string
  id: number
}) {
  try {
    const response = await fetch('/api/guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    // Get the response text to see the actual error
    const responseText = await response.text()

    if (!response.ok) {
      console.error('Server response:', responseText)

      // Try to parse as JSON for more details
      try {
        const errorData = JSON.parse(responseText)
        throw new Error(errorData.error || `Server error: ${response.status}`)
      } catch {
        throw new Error(`Server error (${response.status}): ${responseText}`)
      }
    }

    // Parse successful response
    return JSON.parse(responseText)
  } catch (error) {
    console.error('Create guest error:', error)
    throw error
  }
}
