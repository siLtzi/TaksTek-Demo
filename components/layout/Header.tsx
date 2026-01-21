import { getSiteSettings, getNavigation } from '@/sanity/lib/fetchers'
import { HeaderClient } from './HeaderClient'

export async function Header() {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation('header'),
  ])

  return <HeaderClient settings={settings} navigation={navigation} />
}
