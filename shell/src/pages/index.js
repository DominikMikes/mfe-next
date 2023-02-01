import { Inter } from '@next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })
const Title = dynamic(() => {
  return import('mfe1/title')
}, {ssr: false});

export default function Home() {
  return (
    <>
      <h1>SHELL</h1>
      <Title></Title>
    </>
  )
}
