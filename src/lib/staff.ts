export type StaffMember = {
  id: string
  name: string
  title: string
  description: string
  image?: string // optional path to photo in public/images
}

export const staff: StaffMember[] = [
  // Add team members here when available, e.g.:
  // {
  //   id: 'john-doe',
  //   name: 'John Doe',
  //   title: 'Head Tailor',
  //   description: 'Over 20 years of bespoke tailoring experience on Savile Row.',
  //   image: '/images/team/john-doe.jpg',
  // },
]