import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import SuspenseWrapper, {
  InterviewDetailsSkeleton
} from '@/components/SuspenseWrapper';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewsDetailsById } from '@/lib/actions/general.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function Page({ params }: RouteParams) {
  const { id } = await params;
  const interview = await getInterviewsDetailsById(id);
  const user = await getCurrentUser();

  console.log(user?.id);

  if (!interview) redirect('/');

  return (
    <SuspenseWrapper fallback={<InterviewDetailsSkeleton />}>
      <>
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-row items-center gap-4 max-sm:flex-col">
            <div className="flex flex-row items-center gap-4">
              <Image
                src={getRandomInterviewCover()}
                alt="cover image"
                width={40}
                height={40}
                className="size-[40px] rounded-full object-cover"
              />
              <h3 className="capitalize">{interview.role} Interview</h3>
            </div>
            <DisplayTechIcons techStack={interview.techstack} />
          </div>
          <p className="bg-dark-200 h-fit rounded-lg px-4 py-2 capitalize">
            {interview.type}
          </p>
        </div>
        <Agent
          userName={user?.name}
          type="interview"
          interviewId={id}
          questions={interview.questions}
          userId={user?.id}
        />
      </>
    </SuspenseWrapper>
  );
}

export default Page;
