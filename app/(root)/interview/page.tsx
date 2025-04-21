import Agent from '@/components/Agent';
import SuspenseWrapper, {
  InterviewDetailsSkeleton
} from '@/components/SuspenseWrapper';
import { getCurrentUser } from '@/lib/actions/auth.action';

async function Page() {
  const user = await getCurrentUser();

  return (
    <SuspenseWrapper fallback={<InterviewDetailsSkeleton />}>
      <h3>interview </h3>
      <Agent userName={user?.name} userId={user?.id} type="generate" />
    </SuspenseWrapper>
  );
}

export default Page;
