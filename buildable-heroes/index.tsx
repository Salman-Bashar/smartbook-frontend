import dynamic from 'next/dynamic';
import { Typography } from '@/components/typography';
import { ISanityHero } from './interface';
const PrimaryHeroBuilder = dynamic(() =>
  import('./primary/builder').then((mod) => mod.PrimaryHeroBuilder)
);

interface Props {
  hero: ISanityHero;
}

export function HeroBuilder({ hero }: Props) {
  if (hero) {
    switch (hero._type) {
      case 'primaryHeroSection': {
        return <PrimaryHeroBuilder {...hero} />;
      }
      default:
        return (
          <div className="container" key={'default'}>
            <div className="flex min-h-screen items-center justify-center">
              <div className="rounded-10  mx-auto max-w-[1200px] bg-primary px-6 py-10 text-black">
                <h2 className="text-center text-5xl font-bold 2xl:text-6xl ">
                  Hero builder not implemented
                </h2>
              </div>
            </div>
          </div>
        );
    }
  }

  return (
    <FallbackSection
      title={'Hero not found'}
      description="Please apply a hero section for this page."
    />
  );
}

interface FallbackHeroProps {
  title: string;
  description: string;
}

function FallbackSection({ title, description }: FallbackHeroProps) {
  return (
    <div className="container">
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-10  mx-auto max-w-[1200px] bg-primary px-6 py-10 text-black">
          <Typography size="h2">{title}</Typography>s{' '}
          <Typography size="p1">{description}</Typography>
        </div>
      </div>
    </div>
  );
}
