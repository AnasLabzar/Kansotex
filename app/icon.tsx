import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const size = {
  width: 64,
  height: 64,
}

export const contentType = 'image/png'

export default function Icon() {
  // Use the icon we copied to public/icon.png
  const iconData = fs.readFileSync(path.join(process.cwd(), 'public', 'icon.png'))
  const iconSrc = `data:image/png;base64,${iconData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f3eee6', // Cream background so it's always visible in Dark Mode!
          borderRadius: '12px', // Nice rounded corners
        }}
      >
        <img
          src={iconSrc}
          style={{
            width: '75%',
            height: '75%',
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
