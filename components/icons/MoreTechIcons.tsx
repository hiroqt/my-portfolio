interface IconProps {
  className?: string
  size?: number
}

// Simple geometric icons for technologies without specific logos
export const CodeIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.5 12L5 8.5L6.5 7L11.5 12L6.5 17L5 15.5L8.5 12ZM13 7H15V17H13V7Z"/>
  </svg>
)

export const DatabaseIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3C7.58 3 4 4.79 4 7S7.58 11 12 11 20 9.21 20 7 16.42 3 12 3M4 9V12C4 14.21 7.58 16 12 16S20 14.21 20 12V9C20 11.21 16.42 13 12 13S4 11.21 4 9M4 14V17C4 19.21 7.58 21 12 21S20 19.21 20 17V14C20 16.21 16.42 18 12 18S4 16.21 4 14Z"/>
  </svg>
)

export const APIIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 7H17V10H7V7M7 11H17V14H7V11M7 15H17V18H7V15M3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5M5 5H19V19H5V5Z"/>
  </svg>
)

export const AIIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
  </svg>
)

export const SecurityIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
  </svg>
)

export const PerformanceIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
  </svg>
)

export const DesignIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
  </svg>
)

export const ArchitectureIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L2,7L12,12L22,7L12,2M2,17L12,22L22,17L12,12L2,17Z"/>
  </svg>
)

export const SQLiteIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.678 5.1c-2.4-2.4-5.6-3.7-9-3.7s-6.6 1.3-9 3.7c-2.4 2.4-3.7 5.6-3.7 9s1.3 6.6 3.7 9c2.4 2.4 5.6 3.7 9 3.7s6.6-1.3 9-3.7c2.4-2.4 3.7-5.6 3.7-9s-1.3-6.6-3.7-9zm-9 15.9c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
  </svg>
)

export const SpatieIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
  </svg>
)

export const QRCodeIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H9V11M15,11H17V13H15V11M19,11H21V13H19V11M5,19H7V21H5V19M3,5H9V9H3V5M5,7V7H7V7H5M3,15H9V21H3V15M5,17V19H7V17H5M15,3H21V9H15V3M17,5V7H19V5H17M21,15H23V21H21V15M21,11H23V13H21V11M21,19H23V21H21V19M19,19H21V21H19V19M17,15H19V17H17V15M13,15H15V17H13V15M15,17H17V19H15V17M17,17H19V19H17V17M15,19H17V21H15V19M11,3H13V5H11V3M9,5H11V7H9V5M11,7H13V9H11V7M7,9H9V11H7V9M9,9H11V11H9V9M13,11H15V13H13V11M11,15H13V17H11V15M13,17H15V19H13V17M11,19H13V21H11V19Z"/>
  </svg>
)

export const MobileIcon = ({ className = "", size = 16 }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"/>
  </svg>
)