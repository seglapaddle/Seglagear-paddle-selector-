import dynamic from 'next/dynamic';
const PaddleSelector = dynamic(() => import('@/components/PaddleSelector'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Segla Gear Paddle Selector</h1>
      <PaddleSelector />
    </div>
  );
}
