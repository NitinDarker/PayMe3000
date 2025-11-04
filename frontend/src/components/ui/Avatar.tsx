interface AvatarProps {
  firstName: string
  lastName?: string
  size?: number
  className?: string
}

const Avatar = ({ firstName, lastName = '', size = 40 }: AvatarProps) => {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  return (
    <div
      className='flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold hover:cursor-pointer hover:-translate-y-0.5 transition-all z-30'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`
      }}
    >
      {initials}
    </div>
  )
}

export default Avatar
