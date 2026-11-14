import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { SITE_CONFIG } from '@/content/site'

/** Desktop navigation (lg and up). */
export const MainNav = () => (
  <NavigationMenu className="hidden lg:flex" aria-label="Main">
    <NavigationMenuList>
      {SITE_CONFIG.mainNav.map((item) =>
        'children' in item ? (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-1 p-1">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavigationMenuLink asChild>
                      <Link href={child.href}>{child.label}</Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      )}
    </NavigationMenuList>
  </NavigationMenu>
)
