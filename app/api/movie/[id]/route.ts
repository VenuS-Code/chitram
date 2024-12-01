import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const apiKey = process.env.RAPIDAPI_KEY
  const apiHost = 'imdb146.p.rapidapi.com'

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const url = `https://${apiHost}/v1/name/?id=${id}`

  try {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-host': apiHost,
        'x-rapidapi-key': apiKey,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching movie data:', error)
    return NextResponse.json({ error: 'Failed to fetch movie data' }, { status: 500 })
  }
}

