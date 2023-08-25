import { Inter } from 'next/font/google';
import HomeContainer from '../containers/Home';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <HomeContainer />;
}
