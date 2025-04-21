import FeedbackDisplay from '@/components/FeedbackDisplay';
import SuspenseWrapper, {
  FeedbackSkeleton
} from '@/components/SuspenseWrapper';
import { getCurrentUser } from '@/lib/actions/auth.action';
import {
  getFeedbackByInterviewID,
  getInterviewsDetailsById
} from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';

async function Page({ params }: RouteParams) {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewsDetailsById(id);
  if (!interview) redirect('/');
  const feedback = await getFeedbackByInterviewID({
    interviewId: id,
    userId: user?.id!
  });
  return (
    <SuspenseWrapper fallback={<FeedbackSkeleton />}>
      <FeedbackDisplay
        interview={interview}
        feedback={feedback}
        interviewId={id}
      />
    </SuspenseWrapper>
  );
}

export default Page;
