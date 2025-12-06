export const communityCount = [
  {
    date: "24/08/2026",
    total: 3,
    role: "admin"

  },
  {
    date: "24/08/2026",
    total: 25,
    role: "Teachers"
  },
  {
    date: "24/08/2026",
    total: 500,
    role: "students"
  },
  {
    date: "24/08/2026",
    total: 357,
    role: "parents"
  },
]

// Male Female count each role
export const AdminPieChart = [
  // { role: "admins", male: 2, female: 1 },
  { role: "teachers", male: 14, female: 11 },
  { role: "students", male: 287, female: 213 },
  { role: "parents", male: 185, female: 172 },
]
// Student attendence Yearly
export const AdminBarChart = [
  { month: "January", present: 512, absent: 8 },
  { month: "February", present: 508, absent: 12 },
  { month: "March", present: 503, absent: 17 },
  { month: "April", present: 495, absent: 25 },
  { month: "May", present: 506, absent: 14 },
  { month: "June", present: 480, absent: 40 },
  { month: "July", present: 460, absent: 60 },
  { month: "August", present: 470, absent: 50 },
  { month: "September", present: 515, absent: 5 },
  { month: "October", present: 518, absent: 2 },
  { month: "November", present: 510, absent: 10 },
  { month: "December", present: 465, absent: 55 },
]
// Expense & Profit yearly
export const AdminLineChart = [
  { month: "January", expense: 125000, profit: 8000 },
  { month: "February", expense: 118000, profit: 5000 },
  { month: "March", expense: 150000, profit: -2000 },
  { month: "April", expense: 110000, profit: 12000 },
  { month: "May", expense: 98000, profit: 18000 },
  { month: "June", expense: 92000, profit: 2000 },
  { month: "July", expense: 135000, profit: -5000 },
  { month: "August", expense: 185000, profit: 52000 },
  { month: "September", expense: 142000, profit: 30000 },
  { month: "October", expense: 115000, profit: 12000 },
  { month: "November", expense: 122000, profit: 15000 },
  { month: "December", expense: 165000, profit: 40000 },
]
// Admission & Withdrawl
export const AdminRadarChart = [
  { month: "January", admissions: 5, withdrawals: 2 },
  { month: "February", admissions: 6, withdrawals: 3 },
  { month: "March", admissions: 7, withdrawals: 4 },
  { month: "April", admissions: 3, withdrawals: 5 },
  { month: "May", admissions: 4, withdrawals: 3 },
  { month: "June", admissions: 6, withdrawals: 8 },
  { month: "July", admissions: 20, withdrawals: 10 },
  { month: "August", admissions: 18, withdrawals: 6 },
  { month: "September", admissions: 10, withdrawals: 5 },
  { month: "October", admissions: 4, withdrawals: 3 },
  { month: "November", admissions: 3, withdrawals: 2 },
  { month: "December", admissions: 2, withdrawals: 1 },
]


// Announcements
export const announcements = [
  {
    title: "School Assembly",
    desc: "Mandatory assembly for all students in the main hall",
    date: "2024-01-15",
    time: "9:00 - 10:00",
    priority: "high"
  },
  {
    title: "Math Exam Results",
    desc: "Mid-term math exam results will be announced today",
    date: "2024-01-15",
    time: "11:00 - 12:00",
    priority: "medium"
  },
  {
    title: "Sports Day Practice",
    desc: "All sports teams meet for practice at the ground",
    date: "2024-01-16",
    time: "2:00 - 3:30",
    priority: "low"
  },
  {
    title: "Parent-Teacher Meeting",
    desc: "Schedule a meeting with your child's teacher",
    date: "2024-01-17",
    time: "4:00 - 5:00",
    priority: "high"
  },
  {
    title: "Library Closure",
    desc: "Library will be closed for maintenance tomorrow",
    date: "2024-01-18",
    time: "All Day",
    priority: "low"
  },
  {
    title: "Science Fair Registration",
    desc: "Final day to register for the annual science fair",
    date: "2024-01-19",
    time: "10:00 - 2:00",
    priority: "high"
  },
  {
    title: "Holiday Notice",
    desc: "School will remain closed for national holiday",
    date: "2024-01-22",
    time: "All Week",
    priority: "medium"
  }
]
// Events
export const events = [
  {
    title: "Annual Sports Day",
    desc: "Inter-house sports competition with various events",
    date: "2024-01-25"
  },
  {
    title: "Graduation Ceremony",
    desc: "Class 12 students graduation and awards distribution",
    date: "2024-02-10"
  },
  {
    title: "Field Trip - Science Museum",
    desc: "Educational visit for science students to the museum",
    date: "2024-02-14"
  },
  {
    title: "Annual Cultural Fest",
    desc: "Showcase of student talents in music, dance, and drama",
    date: "2024-03-01"
  },
  {
    title: "Debate Competition",
    desc: "Inter-school debate championship on current topics",
    date: "2024-03-05"
  },
  {
    title: "Science Exhibition",
    desc: "Student projects and innovations on display",
    date: "2024-03-12"
  },
  {
    title: "Teacher Appreciation Day",
    desc: "Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers Special assembly to honor and celebrate teachers",
    date: "2024-03-15"
  }
]


export const calendarEvents = [
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 11, 1, 8, 0),
    end: new Date(2025, 11, 1, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 11, 1, 9, 0),
    end: new Date(2025, 11, 1, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 11, 1, 10, 0),
    end: new Date(2025, 11, 1, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 11, 1, 11, 0),
    end: new Date(2025, 11, 1, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 11, 1, 13, 0),
    end: new Date(2025, 11, 1, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 11, 1, 14, 0),
    end: new Date(2025, 11, 1, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 11, 2, 9, 0),
    end: new Date(2025, 11, 2, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 11, 2, 10, 0),
    end: new Date(2025, 11, 2, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 11, 2, 11, 0),
    end: new Date(2025, 11, 2, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 11, 2, 14, 0),
    end: new Date(2025, 11, 2, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 11, 3, 8, 0),
    end: new Date(2025, 11, 3, 8, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 11, 3, 10, 0),
    end: new Date(2025, 11, 3, 10, 45),
  },

  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 11, 3, 13, 0),
    end: new Date(2025, 11, 3, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 11, 3, 14, 0),
    end: new Date(2025, 11, 3, 14, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 11, 4, 9, 0),
    end: new Date(2025, 11, 4, 9, 45),
  },
  {
    title: "Biology",
    allDay: false,
    start: new Date(2025, 11, 4, 10, 0),
    end: new Date(2025, 11, 4, 10, 45),
  },
  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 11, 4, 11, 0),
    end: new Date(2025, 11, 4, 11, 45),
  },

  {
    title: "History",
    allDay: false,
    start: new Date(2025, 11, 4, 14, 0),
    end: new Date(2025, 11, 4, 14, 45),
  },
  {
    title: "Math",
    allDay: false,
    start: new Date(2025, 11, 5, 8, 0),
    end: new Date(2025, 11, 5, 8, 45),
  },
  {
    title: "English",
    allDay: false,
    start: new Date(2025, 11, 5, 9, 0),
    end: new Date(2025, 11, 5, 9, 45),
  },

  {
    title: "Physics",
    allDay: false,
    start: new Date(2025, 11, 5, 11, 0),
    end: new Date(2025, 11, 5, 11, 45),
  },
  {
    title: "Chemistry",
    allDay: false,
    start: new Date(2025, 11, 5, 13, 0),
    end: new Date(2025, 11, 5, 13, 45),
  },
  {
    title: "History",
    allDay: false,
    start: new Date(2025, 11, 5, 14, 0),
    end: new Date(2025, 11, 5, 14, 45),
  },
];