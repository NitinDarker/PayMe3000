type WelcomeProps = {
  name: string
  balance: number
}

export default function Welcome ({ name, balance }: WelcomeProps) {
  return (
    <div className='mb-4 mt-18 text-center text-3xl font-bold gap-4 flex flex-col justify-center'>
      <p>Welcome {name}</p>
      <p className='text-neutral-400'>Your Balance: ₹{balance / 100}</p>
    </div>
  )
}
