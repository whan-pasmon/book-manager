export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') return res.status(405).end()

  const { image } = req.body

  if (!image) return res.status(400).json({ error: 'No image provided' })

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const timestamp = Math.round(Date.now() / 1000)

  const { createHash } = await import('crypto')
  const signature = createHash('sha1')
    .update(`folder=books&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')

  const formData = new FormData()
  formData.append('file', image)
  formData.append('api_key', apiKey)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)
  formData.append('folder', 'books')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  )

  const data = await response.json()

  if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Upload failed' })

  return res.json({ url: data.secure_url })
}
