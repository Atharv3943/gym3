import React from 'react';

// Manually define icons used in the project to bypass broken lucide-react package
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Megaphone = (props: any) => (
  <svg {...iconProps} {...props}><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
);

export const CalendarDays = (props: any) => (
  <svg {...iconProps} {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
);

export const Sun = (props: any) => (
  <svg {...iconProps} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M6.34 17.66l-1.41 1.41" /><path d="M19.07 4.93l-1.41 1.41" /></svg>
);

export const Moon = (props: any) => (
  <svg {...iconProps} {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);

export const Calendar = (props: any) => (
  <svg {...iconProps} {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);

export const Menu = (props: any) => (
  <svg {...iconProps} {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

export const X = (props: any) => (
  <svg {...iconProps} {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

export const Dumbbell = (props: any) => (
  <svg {...iconProps} {...props}><path d="m6.5 6.5 11 11" /><path d="m10 10 5.5 5.5" /><path d="m3 21 8-8" /><path d="m9 22 2-2" /><path d="m2 15 2 2" /><path d="m21 3-8 8" /><path d="m15 2 2 2" /><path d="m22 9-2 2" /></svg>
);

export const Phone = (props: any) => (
  <svg {...iconProps} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);

export const Check = (props: any) => (
  <svg {...iconProps} {...props}><path d="M20 6 9 17l-5-5" /></svg>
);

export const ChevronRight = (props: any) => (
  <svg {...iconProps} {...props}><path d="m9 18 6-6-6-6" /></svg>
);

export const ChevronLeft = (props: any) => (
  <svg {...iconProps} {...props}><path d="m15 18-6-6 6-6" /></svg>
);

export const ChevronDown = (props: any) => (
  <svg {...iconProps} {...props}><path d="m6 9 6 6 6-6" /></svg>
);

export const ChevronUp = (props: any) => (
  <svg {...iconProps} {...props}><path d="m18 15-6-6-6 6" /></svg>
);

export const ArrowRight = (props: any) => (
  <svg {...iconProps} {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

export const Trash = (props: any) => (
  <svg {...iconProps} {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);

export const Plus = (props: any) => (
  <svg {...iconProps} {...props}><path d="M12 5v14" /><path d="M5 12h14" /></svg>
);

export const Search = (props: any) => (
  <svg {...iconProps} {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);

export const Settings = (props: any) => (
  <svg {...iconProps} {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const LogOut = (props: any) => (
  <svg {...iconProps} {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
);

export const User = (props: any) => (
  <svg {...iconProps} {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export const Mail = (props: any) => (
  <svg {...iconProps} {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);

export const MapPin = (props: any) => (
  <svg {...iconProps} {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);

export const Instagram = (props: any) => (
  <svg {...iconProps} {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

export const Twitter = (props: any) => (
  <svg {...iconProps} {...props}><path d="M22 4s-1 2.1-3 2.5c1 .5 2 1.5 3 3.5a13 13 0 0 1-7.6 7 13.5 13.5 0 0 1-10-2.3 8 8 0 0 0 4-5.5 4 4 0 0 1-3.3-3 4 4 0 0 0 1.8-.1 4 4 0 0 1-3.2-4 4 4 0 0 0 1.8.5 4 4 0 0 1-1.3-5.3" /></svg>
);

export const Youtube = (props: any) => (
  <svg {...iconProps} {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 103.38 103.38 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 103.38 103.38 0 0 1-15 0 2 2 0 0 1-2-2Z" /><path d="m10 15 5-3-5-3z" /></svg>
);

export const LayoutDashboard = (props: any) => (
  <svg {...iconProps} {...props}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
);

export const CalendarCheck = (props: any) => (
  <svg {...iconProps} {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="m9 16 2 2 4-4" /></svg>
);

export const Users = (props: any) => (
  <svg {...iconProps} {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export const BarChart3 = (props: any) => (
  <svg {...iconProps} {...props}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
);

// Extra ones commonly used
export const ArrowLeft = (props: any) => (
  <svg {...iconProps} {...props}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
);

export const RotateCw = (props: any) => (
  <svg {...iconProps} {...props}><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
);

export const RefreshCw = (props: any) => (
  <svg {...iconProps} {...props}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
);
