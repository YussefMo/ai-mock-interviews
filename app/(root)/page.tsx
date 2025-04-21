import InterviewCard from '@/components/InterviewCard';
import SuspenseWrapper, {
  InterviewCardSkeleton
} from '@/components/SuspenseWrapper';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getInterviewsByUserId,
  getLatestInterviews
} from '@/lib/actions/general.action';
import Image from 'next/image';
import Link from 'next/link';

async function page() {
  const user = await getCurrentUser();

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! })
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex max-w-lg flex-col gap-6">
          <h2>Get Interview-Ready With Ai-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice On Real InterView Questions & get Instant Feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className="max-lg:hidden"
        />
      </section>
      <section className="mt-8 flex flex-col gap-6">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          <SuspenseWrapper fallback={<InterviewCardSkeleton />}>
            {hasPastInterviews ? (
              userInterviews?.map((interview) => (
                <InterviewCard {...interview} key={interview.id} />
              ))
            ) : (
              <p>You haven&apos;t generate any interviews yet</p>
            )}
          </SuspenseWrapper>
        </div>
      </section>
      <section className="mt-8 flex flex-col gap-6">
        <h2>Take An Generated Interview By Others</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default page;
