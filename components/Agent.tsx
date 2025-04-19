/* eslint-disable no-unused-vars */
import { cn } from '@/lib/utils';
import Image from 'next/image';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}

function Agent({ userName }: AgentProps) {
  const callStatus = CallStatus.FINISHED;
  const isSpeaking = true;
  const messages = [
    'whats your name?',
    'my name is john doe, nice to meet you'
  ];
  const lastMassage = messages[messages.length - 1];

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="ai robot avatar vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="size-[120px] rounded-full object-cover"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMassage}
              className={cn(
                'opacity-0 transition-opacity duration-500',
                'animate-fadeIn opacity-100'
              )}
            >
              {lastMassage}
            </p>
          </div>
        </div>
      )}

      <div className="flex w-full justify-center">
        {callStatus !== 'ACTIVE' ? (
          <button className="btn-call relative">
            <span
              className={cn(
                'absolute animate-ping rounded-full opacity-75',
                (callStatus !== 'CONNECTING') & 'hidden'
              )}
            />
            <span>
              {' '}
              {callStatus === 'INACTIVE' || callStatus === 'FINISHED'
                ? 'Call'
                : '...'}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect cursor-pointer">END</button>
        )}
      </div>
    </>
  );
}

export default Agent;
