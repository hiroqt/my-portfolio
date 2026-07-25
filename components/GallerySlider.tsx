'use client';

import { useState, useEffect } from 'react';

const galleryData = [
  { src: '/images/gallery/aws.jpg', caption: 'AWS Event' },
  { src: '/images/gallery/aws_bizzdev.jpg', caption: 'AWS Business Development Event' },
  { src: '/images/gallery/aws_day3.jpg', caption: 'AWS Training Day 3' },
  { src: '/images/gallery/aws_day3_me.jpg', caption: 'AWS Training Day 3 - Individual' },
  { src: '/images/gallery/aws_presentation_week2.jpg', caption: 'AWS Presentation Week 2' },
  { src: '/images/gallery/aws_quickflow.jpg', caption: 'AWS QuickFlow Architecture' },
  { src: '/images/gallery/aws_week2.jpg', caption: 'AWS Training Week 2' },
  { src: '/images/gallery/capstone_project.jpg', caption: 'VCM HRIS Capstone Project' },
  { src: '/images/gallery/egov1.jpg', caption: 'eGov PH App Implementation' },
  { src: '/images/gallery/egov2.jpg', caption: 'eGov PH App Assistance' },
  { src: '/images/gallery/egov3.jpg', caption: 'eGov PH App Registration' },
  { src: '/images/gallery/egov4.jpg', caption: 'eGov PH App Event' },
  { src: '/images/gallery/egov5.jpg', caption: 'eGov PH App Launch' },
  { src: '/images/gallery/egov6.jpg', caption: 'eGov PH App Campaign' },
  { src: '/images/gallery/egov7.jpg', caption: 'eGov PH App Outreach' },
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
      <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden border border-border bg-background">
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
        <div className="absolute bottom-2 right-2 z-20 bg-background/80 border border-border px-2 py-1 text-[10px] text-foreground font-mono">
          [{currentIndex + 1}/{galleryData.length}]
        </div>
      </div>
      
      <div className="mt-3 px-2 min-h-[40px] flex items-center justify-center text-center">
        <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
          &quot;{galleryData[currentIndex].caption}&quot;
        </p>
      </div>
    </div>
  );
}
