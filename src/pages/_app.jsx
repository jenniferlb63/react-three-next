import { useRef } from 'react'
import Header from '@/config'
import '@/styles/index.css'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('@/components/canvas/Canvas'), { ssr: true })

export default function App({ Component, pageProps = { title: 'index' } }) {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <div ref={ref} className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom bg-zinc-900'>
        <Component {...pageProps} />
        {/* The canvas can either be in front of the dom or behind. If it's in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, hence we make it pointerEvents: false. */}
        {Component?.canvas && (
          <Canvas className='pointer-events-none' eventSource={ref} eventPrefix='client'>
            {Component.canvas(pageProps)}
          </Canvas>
        )}
      </div>
    </>
  )
}
