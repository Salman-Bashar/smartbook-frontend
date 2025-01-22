import Image from 'next/image';
import { IPrimaryHero } from './interface';
import { cn } from '@/lib/shadcn/utils';
import { Typography } from '@/components/typography';

/** This section is expected to be used at the top of a given page */
export function PrimaryHero({ title, description, image }: IPrimaryHero) {
  return (
    <section
      className={cn(
        'section-padding-primary relative flex items-center bg-white dark:bg-black'
      )}
    >
      {image && (
        <Image
          priority
          src={image.src}
          alt="hero-desktop-image"
          fill
          placeholder="blur"
          blurDataURL={image.lqip}
          className="object-cover"
        />
      )}
      <span className="absolute inset-0 bg-black/40"></span>
      <div className="container">
        <div className="relative z-10 max-w-[720px] text-white">
          <div className="space-y-6">
            <Typography size="h1" className="text-white">
              {title}
            </Typography>
            <Typography size="p1">{description}</Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
