import { CalendarIcon, OfficeBuildingIcon } from '@heroicons/react/solid'

export const status = (bookings, spaceLength) => [
  {
    icon: CalendarIcon,
    d: 'BOOKINGS DONE',
    n: `${bookings}+`,
  },
  {
    icon: OfficeBuildingIcon,
    d: 'SPACES COVERED',
    n: `${spaceLength}+`,
  },
]

export const buildings = [
  {
    slug: 'lib',
    name: 'Library Building',
    spaces: '6',
    image: '/assets/images/lib.png',
  },
  {
    slug: 'oldacad',
    name: 'Old Academic Block',
    spaces: '10',
    image: '/assets/images/oldacad.png',
  },
  {
    slug: 'newacad',
    name: 'R&D Block',
    spaces: '4',
    image: '/assets/images/newacad.jpeg',
  },
  {
    slug: 'seminar',
    name: 'Seminar Block',
    spaces: '25',
    image: '/assets/images/seminar.png',
  },
  {
    slug: 'sportsblock',
    name: 'Sports Block',
    spaces: '12',
    image: '/assets/images/sportsblock.jpeg',
  },
  {
    slug: 'openspaces',
    name: 'Open Spaces',
    spaces: '5',
    image: '/assets/images/openspaces.png',
  },
  {
    slug: 'fms',
    name: 'FMS',
    spaces: '14',
    image: '/assets/images/fms.png',
  },
]
