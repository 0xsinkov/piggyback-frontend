import Link from 'next/link';
import { type JSX } from 'react';
import { buttonVariants } from '@root/src/components/ui/button';
import {
  PROTECTED_PAGES_URLS,
  PUBLIC_PAGES_URLS,
} from '@root/src/constants/routes.constants';

function Page(): JSX.Element {
  return (
    <>
      <div className="bg-purple-light relative w-full bg-none bg-right bg-no-repeat xl:bg-[url(/shared/hero-bg.svg)]">
        <div className="mx-auto flex min-h-[600px] flex-col items-center justify-center gap-8 px-4 py-20 md:px-16 xl:items-start">
          <h1 className="text-center text-5xl leading-tight font-bold text-black md:text-6xl xl:text-left xl:text-7xl">
            PiggyBank
            <br /> Engage. Grow. Earn.
          </h1>
          <p className="text-center text-lg text-black/80 md:text-xl xl:max-w-[60%] xl:text-left">
            PiggyBank is where social media interaction finally makes sense.
            Brands and creators boost their reach through guaranteed quests, and
            users earn real USD-backed rewards by supporting content they
            believe in. Simple, fair, and built for everyone!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
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
      <div className="bg-purple-light min-h-[20vh] w-full" />
    </>
  );
}

export default Page;
