'use client';

import React, { Suspense } from 'react';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

/**
 * A wrapper component that provides Suspense boundaries for data-fetching components
 * to improve UX by showing loading states while data is being fetched.
 */
function SuspenseWrapper({ children, fallback }: SuspenseWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

/**
 * A loading skeleton for interview cards
 */
export function InterviewCardSkeleton() {
  return (
    <div className="card-border min-h-96 w-[360px] animate-pulse max-sm:w-full">
      <div className="card-interview">
        <div>
          <div className="bg-light-600/30 absolute top-0 right-0 h-8 w-20 rounded-bl-lg"></div>
          <div className="bg-light-600/30 size-[90px] rounded-full"></div>
          <div className="bg-light-600/30 mt-5 h-6 w-3/4 rounded"></div>
          <div className="mt-3 flex flex-row gap-5">
            <div className="flex flex-row gap-2">
              <div className="bg-light-600/30 size-[22px] rounded"></div>
              <div className="bg-light-600/30 h-5 w-20 rounded"></div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div className="bg-light-600/30 size-[22px] rounded"></div>
              <div className="bg-light-600/30 h-5 w-16 rounded"></div>
            </div>
          </div>
          <div className="bg-light-600/30 mt-5 h-16 w-full rounded"></div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-light-600/30 size-[30px] rounded"
              ></div>
            ))}
          </div>
          <div className="bg-light-600/30 h-10 w-32 rounded"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * A loading skeleton for feedback content
 */
export function FeedbackSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-light-600/30 mx-auto mb-6 h-8 w-3/4 rounded"></div>
      <div className="mb-8 flex flex-row justify-center gap-5">
        <div className="flex flex-row items-center gap-2">
          <div className="bg-light-600/30 size-[22px] rounded"></div>
          <div className="bg-light-600/30 h-5 w-40 rounded"></div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="bg-light-600/30 size-[22px] rounded"></div>
          <div className="bg-light-600/30 h-5 w-32 rounded"></div>
        </div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-light-600/30 h-24 w-full rounded"></div>
        ))}
      </div>
    </div>
  );
}

/**
 * A loading skeleton for interviewer content
 */

export function InterviewDetailsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-4 max-sm:flex-col">
          <div className="flex flex-row items-center gap-4">
            <div className="bg-light-600/30 size-[40px] rounded-full"></div>
            <div className="bg-light-600/30 h-6 w-32 rounded"></div>
          </div>
          <div className="flex flex-row gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-light-600/30 size-6 rounded"></div>
            ))}
          </div>
        </div>
        <div className="bg-light-600/30 h-10 w-24 rounded-lg"></div>
      </div>
      <div className="bg-light-600/30 mt-8 h-[500px] w-full rounded-xl"></div>
    </div>
  );
}

export default SuspenseWrapper;
