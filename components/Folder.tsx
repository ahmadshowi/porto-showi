'use client'

import './Folder.css'

const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex

  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('')
  }

  const num = parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff

  r = Math.floor(r * (1 - percent))
  g = Math.floor(g * (1 - percent))
  b = Math.floor(b * (1 - percent))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase()}`
}

export default function Folder({
  color = '#5227FF',
  size = 1,
  items = [],
  className = '',
  isOpen = false,
  onClick
}: {
  color?: string
  size?: number
  items?: React.ReactNode[]
  className?: string
  isOpen?: boolean
  onClick?: () => void
}) {
  const maxItems = 3
  const papers = [...items].slice(0, maxItems)

  while (papers.length < maxItems) papers.push(null)

  const folderBackColor = darkenColor(color, 0.08)

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor
  } as React.CSSProperties

  return (
    <div
      style={{
        transform: `scale(${size})`,
        marginBottom: `${size * 55}px`
      }}
      className={className}
    >
      <div
        className={`folder ${isOpen ? 'open' : ''}`}
        style={folderStyle}
        onClick={onClick}
      >
        <div className="folder__back">
          {papers.map((item, i) => (
            <div key={i} className={`paper paper-${i + 1}`}>
              {item}
            </div>
          ))}
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  )
}