'use client'

import Image from 'next/image'
import { staff, type StaffMember } from '@/lib/staff'
import { fallbackImage } from '@/lib/images'

export function MeetOurTeam() {
  const members = staff

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-ivory" aria-labelledby="team-heading">
      <div className="container-custom">
        <header className="text-center mb-16 max-w-3xl mx-auto">
          <h2
            id="team-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4"
          >
            Meet Our Team
          </h2>
          <p className="text-midnight/60 text-lg leading-relaxed">
            The master artisans and advisors behind every garment at Suit Galleria.
          </p>
        </header>

        {members.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-midnight/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="font-serif text-xl text-midnight mb-2">Team Coming Soon</h3>
            <p className="text-midnight/60 max-w-xs mx-auto">
              Our expert tailors and advisors will be introduced here shortly.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            role="list"
            aria-label="Team members"
          >
            {members.map((member: StaffMember) => (
              <article
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {member.image ? (
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={member.image}
                      alt={`${member.name}, ${member.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = fallbackImage
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square bg-midnight/5 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 text-midnight/20"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
                <div className="p-6 text-center">
                  <h3 className="font-serif text-xl font-medium text-midnight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-bronze text-sm tracking-widest uppercase mb-3">
                    {member.title}
                  </p>
                  <p className="text-midnight/70 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}