import cn from 'classnames'
import Link from 'next/link'
import { CldVideoPlayer } from 'next-cloudinary'

type Props = {
  title: string
  src: string
  slug?: string
}

const Reel = ({ title, src, slug }: Props) => {
  const reel = (
    <CldVideoPlayer
      src={src}
      width={1080}
      height={1920}
      className={cn('shadow-sm w-full', {
          'hover:shadow-lg transition-shadow duration-200': slug,
      })}
      quality={1080}
    />
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {reel}
        </Link>
      ) : (
        reel
      )}
    </div>
  )
}

export default Reel