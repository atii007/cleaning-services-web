import type { IconType } from 'react-icons'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6'

import type { SocialPlatform } from '@/types/site'

const SOCIAL_ICONS: Record<SocialPlatform, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
}

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
}

export const getSocialLabel = (platform: SocialPlatform) =>
  SOCIAL_LABELS[platform]

export const SocialIcon = ({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) => {
  const Icon = SOCIAL_ICONS[platform]
  return <Icon className={className} aria-hidden />
}
