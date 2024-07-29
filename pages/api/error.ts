import { logServerStats } from '@utils/logger'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  logServerStats(req, res)

  if (req.method === 'GET') {
    // Simulate a database operation that fails
    try {
      throw new Error('Database connection failed')
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }
}