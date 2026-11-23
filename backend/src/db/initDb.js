const pool = require('./db');
const bcrypt = require('bcrypt');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database tables...');

    // 1. Admins table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        admin_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Teachers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        teacher_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        photo TEXT,
        phone VARCHAR(50),
        address VARCHAR(255),
        dob VARCHAR(50),
        blood_group VARCHAR(10),
        bio TEXT,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Classes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes (
        class_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        class_teacher INT NULL,
        capacity INT DEFAULT 20,
        grade INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_class_teacher (class_teacher)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Subjects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subjects (
        subject_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Subjects_Teachers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subjects_teachers (
        subject_id INT NOT NULL,
        teacher_id INT NOT NULL,
        PRIMARY KEY (subject_id, teacher_id),
        INDEX idx_st_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 6. Classes_Teachers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS classes_teachers (
        class_id INT NOT NULL,
        teacher_id INT NOT NULL,
        PRIMARY KEY (class_id, teacher_id),
        INDEX idx_ct_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 7. Students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        student_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        photo TEXT,
        phone VARCHAR(50),
        class_id INT NULL,
        address VARCHAR(255),
        dob VARCHAR(50),
        blood_group VARCHAR(10),
        bio TEXT,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_student_class (class_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 8. Subjects_Students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS subjects_students (
        subject_id INT NOT NULL,
        student_id INT NOT NULL,
        PRIMARY KEY (subject_id, student_id),
        INDEX idx_ss_student (student_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 9. Parents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parents (
        parent_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        address VARCHAR(255),
        dob VARCHAR(50),
        blood_group VARCHAR(10),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 10. Parents_Students table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS parents_students (
        parent_id INT NOT NULL,
        student_id INT NOT NULL,
        PRIMARY KEY (parent_id, student_id),
        INDEX idx_ps_student (student_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 11. Lessons table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lessons (
        lessons_id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        class_id INT NOT NULL,
        teacher_id INT NOT NULL,
        INDEX idx_lesson_subject (subject_id),
        INDEX idx_lesson_class (class_id),
        INDEX idx_lesson_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 12. AssignmentData table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS assignmentData (
        assignment_id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        dueDate VARCHAR(50),
        class_id INT NOT NULL,
        teacher_id INT NOT NULL,
        INDEX idx_assignment_subject (subject_id),
        INDEX idx_assignment_class (class_id),
        INDEX idx_assignment_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 13. ExamData table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS examData (
        exam_id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        date VARCHAR(50),
        class_id INT NOT NULL,
        teacher_id INT NOT NULL,
        INDEX idx_exam_subject (subject_id),
        INDEX idx_exam_class (class_id),
        INDEX idx_exam_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 14. Results table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        result_id INT AUTO_INCREMENT PRIMARY KEY,
        subject_id INT NOT NULL,
        class_id INT NOT NULL,
        teacher_id INT NOT NULL,
        student_id INT NOT NULL,
        date VARCHAR(50),
        type VARCHAR(50) DEFAULT 'exam',
        score INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_result_student (student_id),
        INDEX idx_result_subject (subject_id),
        INDEX idx_result_class (class_id),
        INDEX idx_result_teacher (teacher_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 15. Announcements table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        announcement_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        \`desc\` TEXT,
        class_name VARCHAR(50) NULL,
        date VARCHAR(50) NOT NULL,
        time VARCHAR(50) DEFAULT 'All Day',
        priority VARCHAR(20) DEFAULT 'medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 16. Events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        event_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        \`desc\` TEXT,
        class_name VARCHAR(50) NULL,
        date VARCHAR(50) NOT NULL,
        startTime VARCHAR(20) DEFAULT '10:00',
        endTime VARCHAR(20) DEFAULT '11:00',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('✅ Tables created or verified.');

    // Seed default admin if not existing
    const [admins] = await pool.query("SELECT * FROM admins WHERE email = 'admin@school.com'");
    if (admins.length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admins (name, email, phone, password) VALUES (?, ?, ?, ?)',
        ['System Admin', 'admin@school.com', '1234567890', hash]
      );
      console.log('✅ Default admin seeded: admin@school.com / admin123');
    }

    // Seed default classes if none exist
    const [existingClasses] = await pool.query('SELECT count(*) as count FROM classes');
    if (existingClasses[0].count === 0) {
      const initialClasses = [
        ['1A', 20, 1], ['2A', 20, 2], ['2B', 22, 2], ['3A', 20, 3],
        ['3B', 20, 3], ['3C', 20, 3], ['4A', 18, 4], ['4B', 18, 4],
        ['4C', 18, 4], ['5A', 16, 5], ['5B', 20, 5], ['6A', 22, 6],
        ['6B', 22, 6], ['6C', 18, 6], ['6D', 20, 6], ['7A', 18, 7],
        ['8A', 20, 8], ['8C', 20, 8], ['1B', 20, 1], ['1C', 20, 1]
      ];
      for (const [name, cap, grade] of initialClasses) {
        await pool.query('INSERT IGNORE INTO classes (name, capacity, grade) VALUES (?, ?, ?)', [name, cap, grade]);
      }
      console.log('✅ Initial classes seeded.');
    }

    // Seed default subjects if none exist
    const [existingSubjects] = await pool.query('SELECT count(*) as count FROM subjects');
    if (existingSubjects[0].count === 0) {
      const initialSubjects = [
        'Math', 'English', 'Physics', 'Chemistry', 'Biology',
        'History', 'Geography', 'Art', 'Music', 'Literature',
        'Computer Science', 'Physical Education', 'Economics', 'Science', 'Social Studies'
      ];
      for (const name of initialSubjects) {
        await pool.query('INSERT IGNORE INTO subjects (name) VALUES (?)', [name]);
      }
      console.log('✅ Initial subjects seeded.');
    }

    // Seed sample teachers if none exist
    const [existingTeachers] = await pool.query('SELECT count(*) as count FROM teachers');
    if (existingTeachers[0].count === 0) {
      const sampleTeachers = [
        {
          name: 'John Doe',
          email: 'john@doe.com',
          phone: '1234567890',
          photo: 'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '1985-05-15',
          blood_group: 'O+',
          bio: 'Experienced math educator with 15 years of teaching experience',
          subjects: ['Math'],
          classes: ['1A', '2B']
        },
        {
          name: 'Jane Doe',
          email: 'jane@doe.com',
          phone: '1234567891',
          photo: 'https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '1988-08-22',
          blood_group: 'A+',
          bio: 'Passionate science teacher dedicated to hands-on learning',
          subjects: ['Physics', 'Chemistry'],
          classes: ['3C', '4B']
        },
        {
          name: 'Mike Geller',
          email: 'mike@geller.com',
          phone: '1234567892',
          photo: 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '1990-03-10',
          blood_group: 'B+',
          bio: 'Biology specialist with research background',
          subjects: ['Biology'],
          classes: ['5A']
        },
        {
          name: 'Jay French',
          email: 'jay@gmail.com',
          phone: '1234567893',
          photo: 'https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '1987-11-30',
          blood_group: 'AB+',
          bio: 'History teacher passionate about cultural heritage',
          subjects: ['History'],
          classes: ['6A']
        }
      ];

      const defaultPass = await bcrypt.hash('teacher123', 10);
      for (const t of sampleTeachers) {
        const [res] = await pool.query(
          `INSERT INTO teachers (name, email, photo, phone, address, dob, blood_group, bio, password)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [t.name, t.email, t.photo, t.phone, t.address, t.dob, t.blood_group, t.bio, defaultPass]
        );
        const tId = res.insertId;

        // Link subjects
        for (const sName of t.subjects) {
          const [s] = await pool.query('SELECT subject_id FROM subjects WHERE name = ?', [sName]);
          if (s.length > 0) {
            await pool.query('INSERT IGNORE INTO subjects_teachers (subject_id, teacher_id) VALUES (?, ?)', [s[0].subject_id, tId]);
          }
        }
        // Link classes
        for (const cName of t.classes) {
          const [c] = await pool.query('SELECT class_id FROM classes WHERE name = ?', [cName]);
          if (c.length > 0) {
            await pool.query('INSERT IGNORE INTO classes_teachers (class_id, teacher_id) VALUES (?, ?)', [c[0].class_id, tId]);
          }
        }
      }
      console.log('✅ Sample teachers seeded (password: teacher123).');
    }

    // Link class teacher
    const [c1A] = await pool.query("SELECT class_id FROM classes WHERE name = '1A'");
    const [tJohn] = await pool.query("SELECT teacher_id FROM teachers WHERE email = 'john@doe.com'");
    if (c1A.length > 0 && tJohn.length > 0) {
      await pool.query('UPDATE classes SET class_teacher = ? WHERE class_id = ?', [tJohn[0].teacher_id, c1A[0].class_id]);
    }

    // Seed sample students if none exist
    const [existingStudents] = await pool.query('SELECT count(*) as count FROM students');
    if (existingStudents[0].count === 0) {
      const defaultPass = await bcrypt.hash('student123', 10);
      const sampleStudents = [
        {
          name: 'Sarah Brewer',
          email: 'sarah@brewer.com',
          phone: '1234567894',
          class_name: '1A',
          photo: 'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '2010-05-15',
          blood_group: 'O+',
          bio: 'Enthusiastic student interested in mathematics and sports'
        },
        {
          name: 'Cecilia Bradley',
          email: 'cecilia@bradley.com',
          phone: '1234567895',
          class_name: '2B',
          photo: 'https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '2010-08-22',
          blood_group: 'A+',
          bio: 'Creative student with passion for arts and literature'
        },
        {
          name: 'Fanny Caldwell',
          email: 'fanny@caldwell.com',
          phone: '1234567896',
          class_name: '3C',
          photo: 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200',
          address: '123 Main St, Anytown, USA',
          dob: '2010-03-10',
          blood_group: 'B+',
          bio: 'Science enthusiast with excellent analytical skills'
        }
      ];

      for (const s of sampleStudents) {
        const [c] = await pool.query('SELECT class_id FROM classes WHERE name = ?', [s.class_name]);
        const classId = c.length > 0 ? c[0].class_id : null;
        const [sRes] = await pool.query(
          `INSERT INTO students (name, email, photo, phone, class_id, address, dob, blood_group, bio, password)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [s.name, s.email, s.photo, s.phone, classId, s.address, s.dob, s.blood_group, s.bio, defaultPass]
        );
        const [sub] = await pool.query('SELECT subject_id FROM subjects LIMIT 2');
        for (const sb of sub) {
          await pool.query('INSERT IGNORE INTO subjects_students (subject_id, student_id) VALUES (?, ?)', [sb.subject_id, sRes.insertId]);
        }
      }
      console.log('✅ Sample students seeded (password: student123).');
    }

    // Seed sample parents if none exist
    const [existingParents] = await pool.query('SELECT count(*) as count FROM parents');
    if (existingParents[0].count === 0) {
      const defaultPass = await bcrypt.hash('parent123', 10);
      const sampleParents = [
        {
          name: 'Robert Brewer',
          email: 'parent@school.com',
          phone: '1234567897',
          address: '123 Main St, Anytown, USA',
          dob: '1978-02-14',
          blood_group: 'O+',
          studentEmail: 'sarah@brewer.com'
        },
        {
          name: 'Martha Bradley',
          email: 'martha@bradley.com',
          phone: '1234567898',
          address: '456 Oak St, Anytown, USA',
          dob: '1980-06-20',
          blood_group: 'A+',
          studentEmail: 'cecilia@bradley.com'
        }
      ];

      for (const p of sampleParents) {
        const [pRes] = await pool.query(
          'INSERT INTO parents (name, email, phone, address, dob, blood_group, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.email, p.phone, p.address, p.dob, p.blood_group, defaultPass]
        );
        const [st] = await pool.query('SELECT student_id FROM students WHERE email = ?', [p.studentEmail]);
        if (st.length > 0) {
          await pool.query('INSERT IGNORE INTO parents_students (parent_id, student_id) VALUES (?, ?)', [pRes.insertId, st[0].student_id]);
        }
      }
      console.log('✅ Sample parents seeded (password: parent123).');
    }

    // Seed sample lessons, assignments, exams if none exist
    const [existingLessons] = await pool.query('SELECT count(*) as count FROM lessons');
    if (existingLessons[0].count === 0) {
      const [subs] = await pool.query('SELECT subject_id, name FROM subjects');
      const [cls] = await pool.query('SELECT class_id, name FROM classes');
      const [tchs] = await pool.query('SELECT teacher_id, email FROM teachers');

      if (subs.length > 0 && cls.length > 0 && tchs.length > 0) {
        await pool.query(
          'INSERT INTO lessons (subject_id, class_id, teacher_id) VALUES (?, ?, ?)',
          [subs[0].subject_id, cls[0].class_id, tchs[0].teacher_id]
        );
        await pool.query(
          'INSERT INTO assignmentData (subject_id, dueDate, class_id, teacher_id) VALUES (?, ?, ?, ?)',
          [subs[0].subject_id, '2026-03-30', cls[0].class_id, tchs[0].teacher_id]
        );
        await pool.query(
          'INSERT INTO examData (subject_id, date, class_id, teacher_id) VALUES (?, ?, ?, ?)',
          [subs[0].subject_id, '2026-04-15', cls[0].class_id, tchs[0].teacher_id]
        );
      }
    }

    // Seed sample announcements if none exist
    const [existingAnnouncements] = await pool.query('SELECT count(*) as count FROM announcements');
    if (existingAnnouncements[0].count === 0) {
      const announcementsList = [
        ['School Assembly', 'Mandatory assembly for all students in the main hall', 'All Classes', '2026-03-01', '9:00 - 10:00', 'high'],
        ['Math Exam Results', 'Mid-term math exam results announced today', '1A', '2026-03-02', '11:00 - 12:00', 'medium'],
        ['Sports Day Practice', 'All sports teams meet for practice at the ground', 'All Classes', '2026-03-03', '2:00 - 3:30', 'low'],
        ['Parent-Teacher Meeting', 'Schedule a meeting with child teacher', 'All Classes', '2026-03-05', '4:00 - 5:00', 'high']
      ];
      for (const [title, desc, cls, date, time, priority] of announcementsList) {
        await pool.query(
          'INSERT INTO announcements (title, `desc`, class_name, date, time, priority) VALUES (?, ?, ?, ?, ?, ?)',
          [title, desc, cls, date, time, priority]
        );
      }
      console.log('✅ Sample announcements seeded.');
    }

    // Seed sample events if none exist
    const [existingEvents] = await pool.query('SELECT count(*) as count FROM events');
    if (existingEvents[0].count === 0) {
      const eventsList = [
        ['Annual Sports Day', 'Inter-house sports competition with various events', 'All Classes', '2026-03-25', '10:00', '15:00'],
        ['Science Exhibition', 'Student projects and innovations on display', '3C', '2026-04-10', '09:00', '13:00'],
        ['Graduation Ceremony', 'Class graduation and awards distribution', 'All Classes', '2026-05-01', '11:00', '14:00']
      ];
      for (const [title, desc, cls, date, startTime, endTime] of eventsList) {
        await pool.query(
          'INSERT INTO events (title, `desc`, class_name, date, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)',
          [title, desc, cls, date, startTime, endTime]
        );
      }
      console.log('✅ Sample events seeded.');
    }

    // Seed sample results if none exist
    const [existingResults] = await pool.query('SELECT count(*) as count FROM results');
    if (existingResults[0].count === 0) {
      const [subs] = await pool.query('SELECT subject_id FROM subjects LIMIT 1');
      const [cls] = await pool.query('SELECT class_id FROM classes LIMIT 1');
      const [tchs] = await pool.query('SELECT teacher_id FROM teachers LIMIT 1');
      const [sts] = await pool.query('SELECT student_id FROM students LIMIT 1');
      if (subs.length > 0 && cls.length > 0 && tchs.length > 0 && sts.length > 0) {
        await pool.query(
          'INSERT INTO results (subject_id, class_id, teacher_id, student_id, date, type, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [subs[0].subject_id, cls[0].class_id, tchs[0].teacher_id, sts[0].student_id, '2026-02-15', 'exam', 95]
        );
      }
      console.log('✅ Sample results seeded.');
    }

    console.log('🎉 Database initialization complete!');
  } catch (err) {
    console.error('❌ Database initialization error:', err);
    throw err;
  }
}

module.exports = initializeDatabase;
