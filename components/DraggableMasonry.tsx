'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projectsList = [
  { id: 1, src: '/images/tearsize.png', title: 'Tearsize' },
  { id: 2, src: '/images/egov.png', title: 'e Buddy' },
  { id: 3, src: '/images/pcaementor.png', title: 'PaceMentor' },
  { id: 4, src: '/images/hivesync.png', title: 'HiveSync VA' },
  { id: 5, src: '/images/vcm.png', title: 'VCM HRIS' },
  { id: 6, src: '/images/tmrc.png', title: 'TMRC' },
  { id: 7, src: '/images/presentpo.png', title: 'Present Po' },
  { id: 8, src: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg', title: 'Hospital Queuing' },
];

const galleryData = [
  ...projectsList,
  ...projectsList,
  ...projectsList
].map((item, index) => ({
  ...item,
  id: index + 1
}));

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
      tabIndex={0}
      aria-label="Interactive project screenshot gallery (drag or swipe to explore)"
      className="w-[full] h-[350px] lg:h-[450px] overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing relative bg-muted/10 border border-border/20 focus-visible:ring-2 focus-visible:ring-foreground"
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
                  alt={`${item.title} screenshot`} 
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
