'use client';

import { useState, useEffect } from 'react';

const galleryData = [
  { src: '/images/gallery/aws_bizzdev.jpg', caption: 'AWS Business Development Event' },
  { src: '/images/gallery/aws_day3.jpg', caption: 'AWS Training Day 3' },
  { src: '/images/gallery/aws_day3_me.jpg', caption: 'AWS Training Day 3 - Individual' },
  { src: '/images/gallery/aws_presentation_week2.jpg', caption: 'AWS Presentation Week 2' },
  { src: '/images/gallery/aws_quickflow.jpg', caption: 'AWS QuickFlow Architecture' },
  { src: '/images/gallery/aws_week2.jpg', caption: 'AWS Training Week 2' },
  { src: '/images/gallery/capstone_project.jpg', caption: 'VCM HRIS Capstone Project' },
  { src: '/images/gallery/internship.jpg', caption: 'Internship at General Emilio Aguinaldo Memorial Hospital' },
  { src: '/images/gallery/internship_presenting_queuing_to_sectionheads.jpg', caption: 'Presenting Queuing System to Section Heads' },
  { src: '/images/gallery/internship_presenting_to_sectionheads.jpg', caption: 'Presenting Solutions to Section Heads' },
  { src: '/images/gallery/pacementor_development.jpg', caption: 'Developing PaceMentor Mobile App' },
  { src: '/images/gallery/runclub_development.jpg', caption: 'Developing TMRC Run Club Platform' }
];

export function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden border border-terminal-border bg-terminal-bg">
        {galleryData.map((item, index) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.caption}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}
        <div className="absolute bottom-2 right-2 z-20 bg-terminal-bg/80 border border-terminal-border px-2 py-1 text-[10px] text-terminal-fg font-mono">
          [{currentIndex + 1}/{galleryData.length}]
        </div>
      </div>
      
      <div className="mt-3 px-2 min-h-[40px] flex items-center justify-center text-center">
        <p className="text-xs text-terminal-fg leading-relaxed">
          &gt; &quot;{galleryData[currentIndex].caption}&quot;
        </p>
      </div>
    </div>
  );
}
