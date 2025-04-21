'use client';

import React from 'react';
import { InterviewCardSkeleton } from './SuspenseWrapper';

/**
 * A component that displays loading skeletons for interview sections
 */
function LoadingInterviews() {
  return (
    <div className="interviews-section">
      <div className="flex flex-wrap gap-6">
        {[1, 2, 3].map((i) => (
          <InterviewCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default LoadingInterviews;
