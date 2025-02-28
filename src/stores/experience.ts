import { defineStore } from 'pinia'
import { type IExperience } from '@/interfaces/main'
import tsf from '@/assets/tsf.jpg'
import heavySonics from '@/assets/heavysonics.jpeg'
import echobox from '@/assets/echobox.png'
import peach from '@/assets/peach.webp'
import helastel from '@/assets/helastel.webp'

export const useExperienceStore = defineStore({
  id: 'experience',
  state: () => ({
    experience: [
      {
        role: 'Principal Consultant',
        company: 'The Scale Factory (Part of Ten10)',
        dates: 'August 2023 - Present',
        description:
          'Primarily my role at The Scale Factory (part of Ten10) is focused on the delivery of engagements to customers. I make sure that the lead/senior engineers are working toward the right solutions, whilst being a point of contact for key stakeholders. I also support the sales & hiring processes, carrying out workshops & healthcheck assessments. In November 2024 Ten10 acquired The Scale Factory, and I was involved in the integration of the two companies.',
        image: tsf
      },
      {
        role: 'Label Manager, Events Promoter, Co-Founder',
        company: 'Heavy Sonics',
        dates: 'August 2021 - Present',
        description:
          "I started the Heavy Sonics events brand as a way to help promote up-and-coming DJs. We've hosted events roughly every month, hosting some world-class headliner DJs along the way. By 2023 we were also receiving enough unsigned demos to warrant a record label to run alongside the events. My recent focus is more on the label side - sourcing new artists, managing contracts, looking after mastering & artwork for releases, and managing distribution & accounts.",
        image: heavySonics
      },
      {
        role: 'Principal DevOps Engineer',
        company: 'Echobox',
        dates: 'August 2021 - August 2023',
        description:
          'Moving from a long term role was exciting, and I very quickly jumped into a variety of new technologies, whilst bringing my own ideas and experience to the table. I was involved in developing a new versioning strategy and implementing the underlying build infrastructure. I oversaw the management of multiple production Kubernetes clusters, and all of the fun complexity that entails. I developed a use case for, and drove the implementation of a bug bounty program. I oversaw a large multi-account architecture within AWS, leveraging Organizations and CDK to provision resources in a secure, manageable and cost-effectice manner.',
        image: echobox
      },
      {
        role: 'Development Manager',
        company: 'Optimad Media Systems (now Peach Solutions)',
        dates: 'June 2013 - August 2021',
        description:
          'Joining as a DevOps engineer, I grew into several roles over my time at Optimad. Initially I was involved automating the provisioning of on-premises Linux servers. I carried out two migrations of industry-critical applications from on-premises into AWS, by implementing an infrastructure-as-code first approach. I also oversaw the implementation of a DR solution in AWS for an EC2-hosted Oracle database. I also underwent several cost-optimisation exercises, leveraging AWS a variety of AWS services.',
        image: peach
      },
      {
        role: 'Infrastructure Manager',
        company: 'Helastel',
        dates: 'June 2011 - June 2013',
        description:
          'Starting as an infrastructure support engineer, I was eventually responsible for the management and monitoring of a network of on-premises servers. This involved providing technical support and troubleshooting of PHP applications, DNS & domain management. I also handled the provisioning of email (Postfix), web (Apache) and database (MySQL) servers.',
        image: helastel
      }
    ] as IExperience[]
  }),
  getters: {},
  actions: {}
})
