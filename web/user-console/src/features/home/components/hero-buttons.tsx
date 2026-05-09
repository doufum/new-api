import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/lib/route-paths'
import { Button } from '@/components/ui/button'

interface HeroButtonsProps {
  isAuthenticated: boolean
}

/**
 * Hero section action buttons
 */
export function HeroButtons({ isAuthenticated }: HeroButtonsProps) {
  const { t } = useTranslation()
  if (isAuthenticated) {
    return (
      <Button size='lg' asChild>
        <Link to={routePaths.console}>
          {t('Go to Dashboard')} <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </Button>
    )
  }

  return (
    <>
      <Button size='lg' asChild>
        <Link to={routePaths.auth.signUp}>
          {t('Get Started')}
          <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </Button>
      <Button size='lg' variant='outline' asChild>
        <Link to={routePaths.auth.signIn}>{t('Sign In')}</Link>
      </Button>
    </>
  )
}
