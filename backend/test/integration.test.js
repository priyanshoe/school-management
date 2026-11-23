const http = require('http');
const app = require('../src/app');
const pool = require('../src/db/db');

async function runTests() {
  console.log('🚀 Starting Comprehensive Integration Tests...\n');

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api`;
  console.log(`📡 Test server running at ${baseUrl}`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const healthRes = await fetch(`http://localhost:${port}/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.message === 'server running', 'Health check endpoint returns 200');

    // 2. Sign In for all 4 roles
    // 2a. Admin Sign In
    let adminToken = '';
    const adminLoginRes = await fetch(`${baseUrl}/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@school.com', password: 'admin123' })
    });
    const adminLoginData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200 && adminLoginData.data.role === 'admin', 'Admin sign-in succeeds with role admin');
    const adminCookies = adminLoginRes.headers.get('set-cookie');
    if (adminCookies) {
      const match = adminCookies.match(/token=([^;]+)/);
      if (match) adminToken = match[1];
    }

    // 2b. Teacher Sign In
    const teacherLoginRes = await fetch(`${baseUrl}/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'john@doe.com', password: 'teacher123' })
    });
    const teacherLoginData = await teacherLoginRes.json();
    assert(teacherLoginRes.status === 200 && teacherLoginData.data.role === 'teacher', 'Teacher sign-in succeeds with role teacher');

    // 2c. Student Sign In
    const studentLoginRes = await fetch(`${baseUrl}/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'sarah@brewer.com', password: 'student123' })
    });
    const studentLoginData = await studentLoginRes.json();
    assert(studentLoginRes.status === 200 && studentLoginData.data.role === 'student', 'Student sign-in succeeds with role student');

    // 2d. Parent Sign In
    const parentLoginRes = await fetch(`${baseUrl}/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'parent@school.com', password: 'parent123' })
    });
    const parentLoginData = await parentLoginRes.json();
    assert(parentLoginRes.status === 200 && parentLoginData.data.role === 'parent', 'Parent sign-in succeeds with role parent');

    // 3. Invalid credentials test
    const invalidLoginRes = await fetch(`${baseUrl}/auth/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@school.com', password: 'wrongpassword' })
    });
    assert(invalidLoginRes.status === 401, 'Invalid password rejected with 401 Unauthorized');

    // 4. Session endpoint test
    const sessionRes = await fetch(`${baseUrl}/auth/session`, {
      headers: { 'Cookie': `token=${adminToken}` }
    });
    const sessionData = await sessionRes.json();
    assert(sessionRes.status === 200 && sessionData.data.role === 'admin', 'Protected session endpoint returns active admin session');

    // 5. Sign Up test
    const testEmail = `newstudent_${Date.now()}@test.com`;
    const signUpRes = await fetch(`${baseUrl}/auth/student/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Test Student',
        email: testEmail,
        password: 'password123',
        class_name: '1A'
      })
    });
    assert(signUpRes.status === 201, 'Public student sign-up creates new record (201 Created)');

    // 6. Duplicate registration test
    const dupRes = await fetch(`${baseUrl}/auth/student/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Student',
        email: testEmail,
        password: 'password123',
        class_name: '1A'
      })
    });
    assert(dupRes.status === 409, 'Duplicate email registration rejected with 409 Conflict');

    // 7. Restricted Admin Registration test (without admin key)
    const unauthorizedAdminRes = await fetch(`${baseUrl}/auth/admin/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Fake Admin',
        email: 'fakeadmin@test.com',
        password: 'password123'
      })
    });
    assert(unauthorizedAdminRes.status === 403, 'Admin registration without secret key rejected with 403 Forbidden');

    // 8. Restricted Admin Registration test (with admin key)
    const validAdminRes = await fetch(`${baseUrl}/auth/admin/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Second Admin',
        email: `admin_${Date.now()}@test.com`,
        password: 'password123',
        adminKey: 'adminsecret123'
      })
    });
    assert(validAdminRes.status === 201, 'Admin registration with valid adminKey succeeds (201 Created)');

    // 9. Existing API tests
    const teachersRes = await fetch(`${baseUrl}/teacher`);
    const teachersData = await teachersRes.json();
    assert(teachersRes.status === 200 && Array.isArray(teachersData) && teachersData.length > 0, 'GET /teacher returns array of teachers');

    const studentsRes = await fetch(`${baseUrl}/student`);
    const studentsData = await studentsRes.json();
    assert(studentsRes.status === 200 && Array.isArray(studentsData) && studentsData.length > 0, 'GET /student returns array of students');

    const classesRes = await fetch(`${baseUrl}/class`);
    const classesData = await classesRes.json();
    assert(classesRes.status === 200 && Array.isArray(classesData.data) && classesData.data.length > 0, 'GET /class returns classes');

    const subjectsRes = await fetch(`${baseUrl}/subject`);
    const subjectsData = await subjectsRes.json();
    assert(subjectsRes.status === 200 && Array.isArray(subjectsData.data) && subjectsData.data.length > 0, 'GET /subject returns subjects');

    const lessonsRes = await fetch(`${baseUrl}/lesson`);
    const lessonsData = await lessonsRes.json();
    assert(lessonsRes.status === 200 && Array.isArray(lessonsData.data), 'GET /lesson returns lessons');

    const examsRes = await fetch(`${baseUrl}/exam`);
    const examsData = await examsRes.json();
    assert(examsRes.status === 200 && Array.isArray(examsData.data), 'GET /exam returns exams');

    const assignmentsRes = await fetch(`${baseUrl}/assignment`);
    const assignmentsData = await assignmentsRes.json();
    assert(assignmentsRes.status === 200 && Array.isArray(assignmentsData.data), 'GET /assignment returns assignments');

    // 10. Newly implemented APIs test
    const resultsRes = await fetch(`${baseUrl}/result`);
    const resultsData = await resultsRes.json();
    assert(resultsRes.status === 200 && Array.isArray(resultsData.data), 'GET /result returns results');

    const eventsRes = await fetch(`${baseUrl}/event`);
    const eventsData = await eventsRes.json();
    assert(eventsRes.status === 200 && Array.isArray(eventsData.data), 'GET /event returns events');

    const announcementsRes = await fetch(`${baseUrl}/announcement`);
    const announcementsData = await announcementsRes.json();
    assert(announcementsRes.status === 200 && Array.isArray(announcementsData.data), 'GET /announcement returns announcements');

    const statsRes = await fetch(`${baseUrl}/stats`);
    const statsData = await statsRes.json();
    assert(statsRes.status === 200 && statsData.data && statsData.data.counts.admins >= 1, 'GET /stats returns dynamic counts from MySQL');

    // 11. RBAC on mutation endpoints
    // Anonymous user trying to create a class should be rejected (401)
    const unauthClassCreate = await fetch(`${baseUrl}/class/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'UnauthClass' })
    });
    assert(unauthClassCreate.status === 401, 'Anonymous attempt to create class rejected with 401');

    // Admin user creating a class should succeed
    const uniqueClassName = `TestClass_${Date.now()}`;
    const adminClassCreate = await fetch(`${baseUrl}/class/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${adminToken}`
      },
      body: JSON.stringify({ name: uniqueClassName })
    });
    assert(adminClassCreate.status === 201, 'Authorized Admin successfully creates class (201 Created)');

    // 12. Sign Out test
    const signOutRes = await fetch(`${baseUrl}/auth/signOut`, { method: 'POST' });
    assert(signOutRes.status === 200, 'SignOut successfully clears session');

  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  } finally {
    server.close();
    console.log(`\n================================`);
    console.log(`Total tests: ${passed + failed}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`================================\n`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
