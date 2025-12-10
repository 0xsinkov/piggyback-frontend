import Link from 'next/link';
import { type JSX } from 'react';
import { buttonVariants } from '@root/src/components/ui/button';
import {
  PROTECTED_PAGES_URLS,
  PUBLIC_PAGES_URLS,
} from '@root/src/constants/routes.constants';

function Page(): JSX.Element {
  return (
    <div className="bg-purple-light relative w-full bg-none bg-right bg-no-repeat xl:bg-[url(/shared/hero-bg.svg)]">
      <div className="mx-auto flex h-225 flex-col items-center justify-center gap-8 px-4 md:px-16 xl:items-start">
        <h1 className="text-left text-[56px]/17 font-bold text-black">
          PiggyBank,
          <br /> AI for Airdrops!
        </h1>
        <p className="text-left text-lg xl:max-w-[50%]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div className="flex gap-4">
          <Link
            href={PUBLIC_PAGES_URLS.QUESTS}
            className={buttonVariants({ size: 'xl' })}
          >
            Start Earning
          </Link>
          <Link
            href={PROTECTED_PAGES_URLS.CREATE_QUEST}
            className={buttonVariants({
              variant: 'secondary',
              size: 'xl',
            })}
          >
            Launch Airdrops
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
