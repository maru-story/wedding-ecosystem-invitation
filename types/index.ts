export interface Guest {
  id: number
  nama: string
  nickname: string
  attendances?: Attendance[]
  messages?: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface Attendance {
  id: number
  guestId: number
  nama: string
  konfirmasi:
    | 'Akad'
    | 'Resepsi'
    | 'Akad dan Resepsi'
    | 'Maaf, Saya belum bisa hadir'
  jumlahTamu: number
  guest?: Guest
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: number
  guestId: number
  message: string
  avatar?: string
  name: string
  guest?: Guest
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Add this to your useApi.ts file

export interface AttendanceStats {
  totalTamu: number
  totalResponses: number
  breakdown: {
    akad: {
      count: number
      totalTamu: number
    }
    resepsi: {
      count: number
      totalTamu: number
    }
    akadResepsi: {
      count: number
      totalTamu: number
    }
    tidakHadir: {
      count: number
      totalTamu: number
    }
  }
}
