import InterviewCard from '@/components/InterviewCard';
import SuspenseWrapper, {
  InterviewCardSkeleton
} from '@/components/SuspenseWrapper';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewsByUserId } from '@/lib/actions/general.action';
import Image from 'next/image';
import Link from 'next/link';

async function page() {
  const user = await getCurrentUser();
  console.log(user?.id);

  const [userInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!)
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;

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
                <InterviewCard
                  key={interview.id}
                  id={interview.id}
                  userId={user?.id}
                  role={interview.role}
                  type={interview.type}
                  techstack={interview.techstack}
                  createdAt={interview.createdAt}
                />
              ))
            ) : (
              <p>You haven&apos;t generate any interviews yet</p>
            )}
          </SuspenseWrapper>
        </div>
      </section>
    </>
  );
}

export default page;
