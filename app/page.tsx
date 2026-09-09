import { cookies } from 'next/headers'
import { PortfolioShell } from '@/components/PortfolioShell'

export default function Home() {
  const cookieStore = cookies()
  const cookieMode = cookieStore.get('portfolio_view_mode')?.value
  const initialMode = cookieMode === 'client' || cookieMode === 'tech' ? cookieMode : 'tech'

  return <PortfolioShell initialMode={initialMode} />
}
