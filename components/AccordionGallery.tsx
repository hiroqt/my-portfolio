'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const galleryData = [
  { id: 1, src: '/images/gallery/aws.jpg', title: 'AWS Event' },
  { id: 2, src: '/images/gallery/aws_bizzdev.jpg', title: 'AWS Business Dev' },
  { id: 3, src: '/images/gallery/aws_day3.jpg', title: 'AWS Day 3' },
  { id: 4, src: '/images/gallery/aws_day3_me.jpg', title: 'AWS Portrait' },
  { id: 5, src: '/images/gallery/aws_presentation_week2.jpg', title: 'AWS Presentation' },
  { id: 6, src: '/images/gallery/aws_quickflow.jpg', title: 'AWS QuickFlow' },
  { id: 7, src: '/images/gallery/aws_week2.jpg', title: 'AWS Week 2' },
  { id: 8, src: '/images/gallery/capstone_project.jpg', title: 'Capstone' },
  { id: 9, src: '/images/gallery/egov1.jpg', title: 'eGov 1' },
  { id: 10, src: '/images/gallery/egov2.jpg', title: 'eGov 2' },
  { id: 11, src: '/images/gallery/egov3.jpg', title: 'eGov 3' },
  { id: 12, src: '/images/gallery/egov4.jpg', title: 'eGov 4' },
  { id: 13, src: '/images/gallery/egov5.jpg', title: 'eGov 5' },
  { id: 14, src: '/images/gallery/egov6.jpg', title: 'eGov 6' },
  { id: 15, src: '/images/gallery/egov7.jpg', title: 'eGov 7' },
  { id: 16, src: '/images/gallery/internship.jpg', title: 'Internship' },
  { id: 17, src: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg', title: 'Presenting Queuing' },
  { id: 18, src: '/images/gallery/internship_presenting_to_sectionheads.jpg', title: 'Presenting' },
  { id: 19, src: '/images/gallery/pacementor_development.jpg', title: 'PaceMentor' },
  { id: 20, src: '/images/gallery/runclub_development.jpg', title: 'RunClub' },
];

export function AccordionGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div 
      className="w-full h-[350px] lg:h-[450px] flex gap-0.5 sm:gap-1 overflow-hidden rounded-2xl"
      onMouseLeave={() => setActive(null)}
    >
      {galleryData.map((item) => {
        const isActive = active === item.id;
        
        return (
          <motion.div
            key={item.id}
            layout
            onMouseEnter={() => setActive(item.id)}
            className="relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
            style={{ flex: isActive ? 20 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <img 
              src={item.src} 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            />
            {/* Overlay to dim inactive items */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? 'opacity-0' : (active === null ? 'opacity-30' : 'opacity-60')}`} />
            
            {/* Title Badge */}
            <motion.div 
              className="absolute bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-start"
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isActive && (
                <div className="bg-background/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg inline-block border border-border/50 max-w-full">
                  <p className="text-[10px] sm:text-xs font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.title}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
