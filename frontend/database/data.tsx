
export const role:String = "admin";

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

//calendar Events
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
// Subjects
export const subjectsData = [
  {
    id: 1,
    name: "Math",
    teachers: ["Alice Phelps", "Russell Davidson"],
  },
  {
    id: 2,
    name: "English",
    teachers: ["Manuel Becker", "Eddie Chavez"],
  },
  {
    id: 3,
    name: "Physics",
    teachers: ["Lola Newman", "Darrell Delgado"],
  },
  {
    id: 4,
    name: "Chemistry",
    teachers: ["Nathan Kelly", "Benjamin Snyder"],
  },
  {
    id: 5,
    name: "Biology",
    teachers: ["Alma Benson", "Lina Collier"],
  },
  {
    id: 6,
    name: "History",
    teachers: ["Hannah Bowman", "Betty Obrien"],
  },
  {
    id: 7,
    name: "Geography",
    teachers: ["Lora French", "Sue Brady"],
  },
  {
    id: 8,
    name: "Art",
    teachers: ["Harriet Alvarado", "Mayme Keller"],
  },
  {
    id: 9,
    name: "Music",
    teachers: ["Gertrude Roy", "Rosa Singleton"],
  },
  {
    id: 10,
    name: "Literature",
    teachers: ["Effie Lynch", "Brett Flowers"],
  },
  {
    id: 11,
    name: "Computer Science",
    teachers: ["John Doe", "Jane Smith"],
  },
  {
    id: 12,
    name: "Physical Education",
    teachers: ["Mike Johnson", "Sarah Lee"],
  },
  {
    id: 13,
    name: "Economics",
    teachers: ["David Brown", "Emily Davis"],
  },
  {
    id: 14,
    name: "Psychology",
    teachers: ["Chris Wilson", "Anna Taylor"],
  },
  {
    id: 15,
    name: "Sociology",
    teachers: ["Paul Martinez", "Linda Garcia"],
  },
  {
    id: 16,
    name: "Philosophy",
    teachers: ["Robert Anderson", "Karen Thomas"],
  },
  {
    id: 17,
    name: "Environmental Science",
    teachers: ["Steven Jackson", "Lisa White"],
  },
  {
    id: 18,
    name: "Statistics",
    teachers: ["Daniel Harris", "Michelle Clark"],
  },
  {
    id: 19,
    name: "Drama",
    teachers: ["James Lewis", "Patricia Robinson"],
  },
  {
    id: 20,
    name: "Foreign Language - Spanish",
    teachers: ["Mark Walker", "Barbara Hall"],
  },
  {
    id: 21,
    name: "Foreign Language - French",
    teachers: ["George Allen", "Nancy Young"],
  },
  {
    id: 22,
    name: "Health Education",
    teachers: ["Edward King", "Donna Wright"],
  },
  {
    id: 23,
    name: "Ethics",
    teachers: ["Brian Lopez", "Cynthia Hill"],
  },
  {
    id: 24,
    name: "Astronomy",
    teachers: ["Ronald Green", "Sandra Adams"],
  },
  {
    id: 25,
    name: "Political Science",
    teachers: ["Timothy Baker", "Helen Nelson"],
  },
  {
    id: 26,
    name: "Anthropology",
    teachers: ["Jason Carter", "Sharon Mitchell"],
  },
  {
    id: 27,
    name: "Journalism",
    teachers: ["Jeffrey Perez", "Betty Roberts"],
  },
  {
    id: 28,
    name: "Graphic Design",
    teachers: ["Ryan Turner", "Amy Phillips"],
  },
  {
    id: 29,
    name: "Culinary Arts",
    teachers: ["Jacob Campbell", "Kimberly Parker"],
  },
  {
    id: 30,
    name: "Photography",
    teachers: ["Nicholas Evans", "Deborah Edwards"],
  },
  {
    id: 31,
    name: "Robotics",
    teachers: ["Zachary Collins", "Megan Stewart"],
  },
  {
    id: 32,
    name: "Debate",
    teachers: ["Alexander Sanchez", "Rebecca Morris"],
  },
  {
    id: 33,
    name: "Creative Writing",
    teachers: ["Tyler Rogers", "Julia Reed"],
  },
  {
    id: 34,
    name: "Film Studies",
    teachers: ["Brandon Cook", "Christina Morgan"],
  },
  {
    id: 35,
    name: "Entrepreneurship",
    teachers: ["Austin Bell", "Rachel Murphy"],
  },
  {
    id: 36,
    name: "Mythology",
    teachers: ["Cameron Bailey", "Laura Rivera"],
  },
  {
    id: 37,
    name: "Oceanography",
    teachers: ["Dylan Cooper", "Catherine Peterson"],
  },
  {
    id: 38,
    name: "Archaeology",
    teachers: ["Ethan Reed", "Frances Kelly"],
  },
  {
    id: 39,
    name: "Linguistics",
    teachers: ["Gabriel Howard", "Heather Cox"],
  },
  {
    id: 40,
    name: "Game Design",
    teachers: ["Isaac Ward", "Diane Ramirez"],
  },
  {
    id: 40,
    name: "Game Design",
    teachers: ["Isaac Ward", "Diane Ramirez"],
  },
  {
    id: 40,
    name: "Game Design",
    teachers: ["Isaac Ward", "Diane Ramirez"],
  },
];
// Classes
export const classesData = [
  {
    id: 1,
    name: "1A",
    capacity: 20,
    grade: 1,
    supervisor: "Joseph Padilla",
  },
  {
    id: 2,
    name: "2B",
    capacity: 22,
    grade: 2,
    supervisor: "Blake Joseph",
  },
  {
    id: 3,
    name: "3C",
    capacity: 20,
    grade: 3,
    supervisor: "Tom Bennett",
  },
  {
    id: 4,
    name: "4B",
    capacity: 18,
    grade: 4,
    supervisor: "Aaron Collins",
  },
  {
    id: 5,
    name: "5A",
    capacity: 16,
    grade: 5,
    supervisor: "Iva Frank",
  },
  {
    id: 5,
    name: "5B",
    capacity: 20,
    grade: 5,
    supervisor: "Leila Santos",
  },
  {
    id: 7,
    name: "7A",
    capacity: 18,
    grade: 7,
    supervisor: "Carrie Walton",
  },
  {
    id: 8,
    name: "6B",
    capacity: 22,
    grade: 6,
    supervisor: "Christopher Butler",
  },
  {
    id: 9,
    name: "6C",
    capacity: 18,
    grade: 6,
    supervisor: "Marc Miller",
  },
  {
    id: 10,
    name: "6D",
    capacity: 20,
    grade: 6,
    supervisor: "Ophelia Marsh",
  },
];
//lessons
export const lessonsData = [
  {
    id: 1,
    subject: "Math",
    class: "1A",
    teacher: "Tommy Wise",
  },
  {
    id: 2,
    subject: "English",
    class: "2A",
    teacher: "Rhoda Frank",
  },
  {
    id: 3,
    subject: "Science",
    class: "3A",
    teacher: "Della Dunn",
  },
  {
    id: 4,
    subject: "Social Studies",
    class: "1B",
    teacher: "Bruce Rodriguez",
  },
  {
    id: 5,
    subject: "Art",
    class: "4A",
    teacher: "Birdie Butler",
  },
  {
    id: 6,
    subject: "Music",
    class: "5A",
    teacher: "Bettie Oliver",
  },
  {
    id: 7,
    subject: "History",
    class: "6A",
    teacher: "Herman Howard",
  },
  {
    id: 8,
    subject: "Geography",
    class: "6B",
    teacher: "Lucinda Thomas",
  },
  {
    id: 9,
    subject: "Physics",
    class: "6C",
    teacher: "Ronald Roberts",
  },
  {
    id: 10,
    subject: "Chemistry",
    class: "4B",
    teacher: "Julia Pittman",
  },
];
//Exams
export const examsData = [
  {
    id: 1,
    subject: "Math",
    class: "1A",
    teacher: "Martha Morris",
    date: "2025-01-01",
  },
  {
    id: 2,
    subject: "English",
    class: "2A",
    teacher: "Randall Garcia",
    date: "2025-01-01",
  },
  {
    id: 3,
    subject: "Science",
    class: "3A",
    teacher: "Myrtie Scott",
    date: "2025-01-01",
  },
  {
    id: 4,
    subject: "Social Studies",
    class: "1B",
    teacher: "Alvin Swanson",
    date: "2025-01-01",
  },
  {
    id: 5,
    subject: "Art",
    class: "4A",
    teacher: "Mabelle Wallace",
    date: "2025-01-01",
  },
  {
    id: 6,
    subject: "Music",
    class: "5A",
    teacher: "Dale Thompson",
    date: "2025-01-01",
  },
  {
    id: 7,
    subject: "History",
    class: "6A",
    teacher: "Allie Conner",
    date: "2025-01-01",
  },
  {
    id: 8,
    subject: "Geography",
    class: "6B",
    teacher: "Hunter Fuller",
    date: "2025-01-01",
  },
  {
    id: 9,
    subject: "Physics",
    class: "7A",
    teacher: "Lois Lindsey",
    date: "2025-01-01",
  },
  {
    id: 10,
    subject: "Chemistry",
    class: "8A",
    teacher: "Vera Soto",
    date: "2025-01-01",
  },
];