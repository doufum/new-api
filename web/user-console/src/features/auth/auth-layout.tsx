import { Link } from '@tanstack/react-router'
import { routePaths } from '@/lib/route-paths'
import { DEFAULT_LOGO, DEFAULT_SYSTEM_NAME } from '@/lib/constants'
import { useSystemConfig } from '@/hooks/use-system-config'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { systemName, logo } = useSystemConfig()
  const displayName = systemName || DEFAULT_SYSTEM_NAME
  const displayLogo = logo || DEFAULT_LOGO

  return (
    <div className='min-h-svh bg-[linear-gradient(180deg,#fffcf8_0%,#fff7f0_42%,#f6f8ff_100%)] px-6 py-8'>
      <div className='mx-auto flex max-w-5xl justify-between'>
        <Link to={routePaths.home} className='flex items-center gap-3'>
          <img
            src={displayLogo}
            alt={displayName}
            className='h-10 w-10 rounded-full object-cover'
          />
          <span className='text-lg font-semibold text-slate-950'>
            {displayName}
          </span>
        </Link>
      </div>
      <div className='mx-auto mt-12 max-w-md rounded-[28px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur'>
        {children}
      </div>
    </div>
  )
}
