import cn from 'classnames'
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'

type Props = {
  title: string
  src: string
  slug?: string
  mouseHover?: boolean
}

const CoverImage = ({ title, src, slug, mouseHover }: Props) => {
  const image = (
    <CldImage
      src={src}
      width={1300}
      height={630}
      className={cn('shadow-sm w-full', {
          'hover:shadow-lg transition-all duration-200': slug,
      })}
      alt={`Cover Image for ${title}`}
    />
  )
  return (
    <div className={`sm:mx-0 ${mouseHover? 'scale-105' : ''} transition-all duration-200`}>
      {slug ? (
        <Link as={`/home/${slug}`} href="/home/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
