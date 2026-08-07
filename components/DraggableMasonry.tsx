'use client';

import { useRef, useState, useEffect } from 'react';
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

// Simple pseudo-random shuffle to maintain hydration safety by not depending on Math.random() strictly,
// or we can just use a fixed seed/pre-shuffled layout for consistent hydration.
function getShuffledData() {
  const arr1 = [...galleryData].reverse();
  const arr2 = [...galleryData];
  arr2.push(arr2.shift()!);
  arr2.push(arr2.shift()!);
  const arr3 = [...galleryData].reverse();
  arr3.push(arr3.shift()!);
  const arr4 = [...galleryData];
  arr4.unshift(arr4.pop()!);
  
  return [...arr1, ...arr2, ...arr3, ...arr4];
}

export function DraggableMasonry() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use state to handle hydration safely if needed, though statically shuffling is fine.
  const [data, setData] = useState<typeof galleryData>([]);
  
  useEffect(() => {
    setData(getShuffledData());
  }, []);

  return (
    <div 
      className="w-full h-[350px] lg:h-[450px] overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing relative bg-muted/10 border border-border/20"
      ref={containerRef}
    >
      {data.length > 0 && (
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          // Start in the middle
          initial={{ x: -250, y: -250 }}
          className="absolute"
          style={{
            width: 'max(1200px, 250%)',
          }}
        >
          <div className="columns-3 sm:columns-4 md:columns-5 lg:columns-6 xl:columns-7 gap-3 sm:gap-4 p-4 sm:p-6 w-full">
            {data.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="break-inside-avoid mb-3 relative group">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full rounded-xl object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                  draggable={false}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-end p-3 pointer-events-none">
                  <span className="text-white text-[10px] sm:text-xs font-semibold drop-shadow-md truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Edges fade effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]" />
    </div>
  );
}
