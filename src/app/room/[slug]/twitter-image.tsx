/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Seo Product'

export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { slug: number } }) {
  const room = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/rooms/${params.slug}`).then((res) => res.json())
  console.log(room.data.images[0])

  return new ImageResponse(
    (
      <>
        <div
          style={{
            background: "white",
            color: "dark",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img style={{ borderRight: "1px solid #e6e6e6", }}
            src={'https://res.cloudinary.com/dqsfwus9c/image/upload/v1711606594/ktravel/listings/a63202c8-43df-4462-9bc4-1a05346f9dc7_ybdl7u.jpg'}
            width={600}
            height={500}
            alt="room seo"
          />

          <h2 style={{ padding: '20px', width: '40%' }}>
            <p style={{ display: "flex", flexDirection: "column-reverse" }}>
              <p style={{ fontWeight: '600' }}>{room.data.name}</p>
              <p style={{ opacity: '0.5' }}>{process.env.NEXT_PUBLIC_NAME}</p>
            </p>
          </h2>
        </div>
      </>

    ),
    { ...size }
  );
}