import { Suspense, type JSX, type ReactNode } from 'react';
import { ProfileNavbar } from '@root/src/components/profile/navbar/navbar';
import { ProfileNavbarSkeleton } from '@root/src/components/profile/navbar/skeleton';

function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <div className="flex w-full gap-16 px-4 py-28 md:px-16">
      <Suspense fallback={<ProfileNavbarSkeleton />}>
        <ProfileNavbar />
      </Suspense>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;
