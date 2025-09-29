import Image from 'next/image'

const features = [
  {
    title: 'Immersive Display Solution:',
    description: 'Transform information into actionable insight with quick data analysis facilitating informed decision-making.',
  },
  {
    title: 'Professional Consoles and Furniture:',
    description: 'Achieve optimal performance with ergonomic workstations for focused productivity.',
  },
  {
    title: 'Expandable Video Wall Solutions:',
    description: 'Monitor multiple data sources in real time and stay on top of critical information with unparalleled visibility.',
  },
  {
    title: 'Wireless Collaboration:',
    description: 'Foster real-time information sharing and seamless teamwork with our wireless collaboration features, enabling efficient communication.',
  },
]

export function ServiceContent() {
  return (
    <div className="bg-neutral-800/50 p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src="/images/bav-hero.jpg"
            alt="Service detail"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            Revolutionize operations and foster seamless collaboration across the organization.
          </h3>
          <p className="mt-2 text-neutral-300">
            Designed to optimize efficiency and facilitate seamless collaboration in mission-critical
            environments, our solutions are a game-changer for organizations. Harness the power of
            immersive displays, professional consoles, expandable video walls, and wireless
            collaboration, seamlessly integrated into a comprehensive solution.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <div key={i}>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 grid place-items-center text-sm font-bold">
                {i + 1}
              </div>
              <h4 className="font-semibold text-white">{feature.title}</h4>
            </div>
            <p className="mt-2 text-sm text-neutral-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
