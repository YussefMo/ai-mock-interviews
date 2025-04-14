import { cn, getTechLogos } from '@/lib/utils';
import Image from 'next/image';

async function DisplayTechIcons({ techStack }: TechIconProps) {
  const techIcons = await getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          className={cn("group bg-dark-300 flex-center relative rounded-full p-2", index >= 1 && '-ml-3')}
          key={index}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={100}
            height={100}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
}

export default DisplayTechIcons;
