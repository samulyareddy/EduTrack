const mongoose = require("mongoose");
const Branch = require("../models/branch.model");
const AdminDetails = require("../models/details/admin-details.model");
const FacultyDetails = require("../models/details/faculty-details.model");
const StudentDetails = require("../models/details/student-details.model");
const Subject = require("../models/subject.model");
const Notice = require("../models/notice.model");
const Exam = require("../models/exam.model");
const Timetable = require("../models/timetable.model");
const Material = require("../models/material.model");
const Marks = require("../models/marks.model");

/**
 * Seeds default data if database is empty or missing essential documents.
 * Can also be forced to overwrite / re-seed via { force: true }.
 */
const seedDefaultData = async ({ force = false } = {}) => {
  try {
    const adminCount = await AdminDetails.countDocuments();
    const branchCount = await Branch.countDocuments();
    const facultyCount = await FacultyDetails.countDocuments();
    const studentCount = await StudentDetails.countDocuments();
    const subjectCount = await Subject.countDocuments();
    const noticeCount = await Notice.countDocuments();
    const examCount = await Exam.countDocuments();

    // Check if we need to seed or top up data
    const needsSeeding =
      force ||
      adminCount === 0 ||
      branchCount < 4 ||
      facultyCount < 4 ||
      studentCount < 10 ||
      subjectCount === 0 ||
      noticeCount === 0 ||
      examCount === 0;

    if (!needsSeeding) {
      console.log("Database already contains rich demo data. Auto-seeding skipped.");
      return;
    }

    console.log("Seeding rich default data into database...");

    // ==========================================
    // 1. Branches (6 Branches)
    // ==========================================
    const branchesData = [
      { branchId: "CSE", name: "Computer Science and Engineering" },
      { branchId: "ECE", name: "Electronics and Communication Engineering" },
      { branchId: "ME", name: "Mechanical Engineering" },
      { branchId: "IT", name: "Information Technology" },
      { branchId: "CE", name: "Civil Engineering" },
      { branchId: "AIDS", name: "Artificial Intelligence and Data Science" },
    ];

    const branchMap = {};
    for (const b of branchesData) {
      let doc = await Branch.findOne({ branchId: b.branchId });
      if (!doc) {
        doc = await Branch.create(b);
        console.log(`- Created Branch: ${b.branchId} (${b.name})`);
      }
      branchMap[b.branchId] = doc;
    }

    const cseBranch = branchMap["CSE"];
    const eceBranch = branchMap["ECE"];
    const itBranch = branchMap["IT"];
    const meBranch = branchMap["ME"];
    const ceBranch = branchMap["CE"];
    const aidsBranch = branchMap["AIDS"];

    // ==========================================
    // 2. Admin Accounts (2 Admins)
    // ==========================================
    const defaultAdmins = [
      {
        employeeId: 100001,
        firstName: "Admin",
        middleName: "System",
        lastName: "User",
        email: "admin@gmail.com",
        phone: "9876543210",
        profile: "default.png",
        address: "Admin Block, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "male",
        dob: new Date("1990-01-01"),
        designation: "Head Administrator",
        joiningDate: new Date("2020-01-01"),
        salary: 75000,
        status: "active",
        isSuperAdmin: true,
        emergencyContact: {
          name: "Admin Support",
          relationship: "Department",
          phone: "9876543211",
        },
        bloodGroup: "O+",
        password: "admin123",
      },
      {
        employeeId: 123456,
        firstName: "Sundar",
        middleName: "R",
        lastName: "Pichai",
        email: "sundar@gmail.com",
        phone: "9876543212",
        profile: "default.png",
        address: "123 Tech Boulevard",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500081",
        country: "India",
        gender: "male",
        dob: new Date("1992-06-10"),
        designation: "System Administrator",
        joiningDate: new Date("2021-03-15"),
        salary: 70000,
        status: "active",
        isSuperAdmin: true,
        emergencyContact: {
          name: "Emergency Contact",
          relationship: "Spouse",
          phone: "9876543213",
        },
        bloodGroup: "O+",
        password: "admin123",
      },
    ];

    for (const adminItem of defaultAdmins) {
      const existing = await AdminDetails.findOne({ email: adminItem.email });
      if (!existing) {
        await AdminDetails.create(adminItem);
        console.log(`- Created Admin: ${adminItem.email}`);
      }
    }

    // ==========================================
    // 3. Faculty Accounts (6 Faculty across departments)
    // ==========================================
    const defaultFaculty = [
      {
        employeeId: 200001,
        firstName: "John",
        lastName: "Doe",
        email: "teacher@gmail.com",
        phone: "9876543220",
        profile: "default.png",
        address: "Faculty Quarters, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "male",
        dob: new Date("1988-05-15"),
        designation: "Assistant Professor",
        joiningDate: new Date("2021-06-01"),
        salary: 60000,
        status: "active",
        branchId: cseBranch._id,
        emergencyContact: {
          name: "Jane Doe",
          relationship: "Spouse",
          phone: "9876543221",
        },
        bloodGroup: "A+",
        password: "teacher123",
      },
      {
        employeeId: 200002,
        firstName: "Sarah",
        lastName: "Jenkins",
        email: "sarah@gmail.com",
        phone: "9876543222",
        profile: "default.png",
        address: "Faculty Block B, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "female",
        dob: new Date("1991-03-22"),
        designation: "Associate Professor",
        joiningDate: new Date("2022-01-10"),
        salary: 65000,
        status: "active",
        branchId: cseBranch._id,
        emergencyContact: {
          name: "Mark Jenkins",
          relationship: "Brother",
          phone: "9876543223",
        },
        bloodGroup: "B+",
        password: "teacher123",
      },
      {
        employeeId: 200003,
        firstName: "Robert",
        lastName: "Miller",
        email: "robert@gmail.com",
        phone: "9876543224",
        profile: "default.png",
        address: "Staff Colony, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "male",
        dob: new Date("1985-09-18"),
        designation: "Professor & HOD",
        joiningDate: new Date("2019-08-15"),
        salary: 85000,
        status: "active",
        branchId: eceBranch._id,
        emergencyContact: {
          name: "Laura Miller",
          relationship: "Spouse",
          phone: "9876543225",
        },
        bloodGroup: "O+",
        password: "teacher123",
      },
      {
        employeeId: 200004,
        firstName: "Emily",
        lastName: "Davis",
        email: "emily@gmail.com",
        phone: "9876543226",
        profile: "default.png",
        address: "Faculty Block C, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "female",
        dob: new Date("1993-07-11"),
        designation: "Assistant Professor",
        joiningDate: new Date("2023-02-01"),
        salary: 58000,
        status: "active",
        branchId: itBranch._id,
        emergencyContact: {
          name: "James Davis",
          relationship: "Father",
          phone: "9876543227",
        },
        bloodGroup: "AB+",
        password: "teacher123",
      },
      {
        employeeId: 200005,
        firstName: "David",
        lastName: "Wilson",
        email: "david@gmail.com",
        phone: "9876543228",
        profile: "default.png",
        address: "Greenwood Colony, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "male",
        dob: new Date("1987-12-05"),
        designation: "Associate Professor",
        joiningDate: new Date("2020-09-15"),
        salary: 68000,
        status: "active",
        branchId: meBranch._id,
        emergencyContact: {
          name: "Grace Wilson",
          relationship: "Spouse",
          phone: "9876543229",
        },
        bloodGroup: "A+",
        password: "teacher123",
      },
      {
        employeeId: 200006,
        firstName: "Anita",
        lastName: "Sharma",
        email: "anita@gmail.com",
        phone: "9876543240",
        profile: "default.png",
        address: "AI Research Wing, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        gender: "female",
        dob: new Date("1990-04-19"),
        designation: "Assistant Professor",
        joiningDate: new Date("2022-08-01"),
        salary: 62000,
        status: "active",
        branchId: aidsBranch._id,
        emergencyContact: {
          name: "Vikram Sharma",
          relationship: "Spouse",
          phone: "9876543241",
        },
        bloodGroup: "O+",
        password: "teacher123",
      },
    ];

    const facultyDocs = [];
    for (const f of defaultFaculty) {
      let doc = await FacultyDetails.findOne({ email: f.email });
      if (!doc) {
        doc = await FacultyDetails.create(f);
        console.log(`- Created Faculty: ${f.email} (${f.firstName} ${f.lastName})`);
      }
      facultyDocs.push(doc);
    }

    // ==========================================
    // 4. Student Accounts (12 Students across branches & semesters)
    // ==========================================
    const defaultStudents = [
      {
        enrollmentNo: 300001,
        firstName: "Alex",
        middleName: "Kumar",
        lastName: "Sharma",
        email: "student@gmail.com",
        phone: "9876543230",
        semester: 4,
        branchId: cseBranch._id,
        gender: "male",
        dob: new Date("2003-08-20"),
        address: "Hostel Block A, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "B+",
        emergencyContact: {
          name: "Raj Sharma",
          relationship: "Father",
          phone: "9876543231",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300002,
        firstName: "Priya",
        middleName: "S",
        lastName: "Patel",
        email: "priya@gmail.com",
        phone: "9876543232",
        semester: 4,
        branchId: cseBranch._id,
        gender: "female",
        dob: new Date("2003-11-12"),
        address: "Hostel Block B, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "O+",
        emergencyContact: {
          name: "Kishore Patel",
          relationship: "Father",
          phone: "9876543233",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300003,
        firstName: "Rahul",
        middleName: "V",
        lastName: "Verma",
        email: "rahul@gmail.com",
        phone: "9876543234",
        semester: 4,
        branchId: cseBranch._id,
        gender: "male",
        dob: new Date("2003-05-18"),
        address: "Hostel Block A, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "A+",
        emergencyContact: {
          name: "Sanjay Verma",
          relationship: "Father",
          phone: "9876543235",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300004,
        firstName: "Sneha",
        middleName: "Rao",
        lastName: "Reddy",
        email: "sneha@gmail.com",
        phone: "9876543245",
        semester: 4,
        branchId: cseBranch._id,
        gender: "female",
        dob: new Date("2003-09-25"),
        address: "Hostel Block B, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "B+",
        emergencyContact: {
          name: "Venkat Reddy",
          relationship: "Father",
          phone: "9876543246",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300005,
        firstName: "Ananya",
        middleName: "K",
        lastName: "Roy",
        email: "ananya@gmail.com",
        phone: "9876543236",
        semester: 4,
        branchId: eceBranch._id,
        gender: "female",
        dob: new Date("2003-02-14"),
        address: "Hostel Block C, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "AB+",
        emergencyContact: {
          name: "Mihir Roy",
          relationship: "Father",
          phone: "9876543237",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300006,
        firstName: "Vikram",
        middleName: "Jeet",
        lastName: "Malhotra",
        email: "vikram@gmail.com",
        phone: "9876543247",
        semester: 4,
        branchId: eceBranch._id,
        gender: "male",
        dob: new Date("2003-07-30"),
        address: "Hostel Block A, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "O-",
        emergencyContact: {
          name: "Harish Malhotra",
          relationship: "Father",
          phone: "9876543248",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300007,
        firstName: "Rohan",
        middleName: "M",
        lastName: "Gupta",
        email: "rohan@gmail.com",
        phone: "9876543249",
        semester: 4,
        branchId: itBranch._id,
        gender: "male",
        dob: new Date("2003-04-10"),
        address: "Hostel Block D, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "A+",
        emergencyContact: {
          name: "Mahesh Gupta",
          relationship: "Father",
          phone: "9876543250",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300008,
        firstName: "Neha",
        middleName: "P",
        lastName: "Kapoor",
        email: "neha@gmail.com",
        phone: "9876543251",
        semester: 4,
        branchId: itBranch._id,
        gender: "female",
        dob: new Date("2003-10-08"),
        address: "Hostel Block B, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "B+",
        emergencyContact: {
          name: "Ramesh Kapoor",
          relationship: "Father",
          phone: "9876543252",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300009,
        firstName: "Arjun",
        middleName: "Dev",
        lastName: "Nair",
        email: "arjun@gmail.com",
        phone: "9876543253",
        semester: 4,
        branchId: meBranch._id,
        gender: "male",
        dob: new Date("2003-06-17"),
        address: "Hostel Block D, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "O+",
        emergencyContact: {
          name: "Gopal Nair",
          relationship: "Father",
          phone: "9876543254",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300010,
        firstName: "Kavya",
        middleName: "Laxmi",
        lastName: "Iyer",
        email: "kavya@gmail.com",
        phone: "9876543255",
        semester: 4,
        branchId: aidsBranch._id,
        gender: "female",
        dob: new Date("2003-01-28"),
        address: "Hostel Block C, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "A-",
        emergencyContact: {
          name: "Subramanian Iyer",
          relationship: "Father",
          phone: "9876543256",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300011,
        firstName: "Karan",
        middleName: "Singh",
        lastName: "Mehta",
        email: "karan@gmail.com",
        phone: "9876543257",
        semester: 2,
        branchId: cseBranch._id,
        gender: "male",
        dob: new Date("2004-03-14"),
        address: "Hostel Block A, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "B+",
        emergencyContact: {
          name: "Surendra Mehta",
          relationship: "Father",
          phone: "9876543258",
        },
        password: "student123",
      },
      {
        enrollmentNo: 300012,
        firstName: "Pooja",
        middleName: "Anand",
        lastName: "Joshi",
        email: "pooja@gmail.com",
        phone: "9876543259",
        semester: 6,
        branchId: cseBranch._id,
        gender: "female",
        dob: new Date("2002-09-03"),
        address: "Hostel Block B, Campus",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
        country: "India",
        profile: "default.png",
        status: "active",
        bloodGroup: "AB+",
        emergencyContact: {
          name: "Anand Joshi",
          relationship: "Father",
          phone: "9876543260",
        },
        password: "student123",
      },
    ];

    const studentDocs = [];
    for (const s of defaultStudents) {
      let doc = await StudentDetails.findOne({ email: s.email });
      if (!doc) {
        doc = await StudentDetails.create(s);
        console.log(`- Created Student: ${s.email} (${s.firstName} ${s.lastName})`);
      }
      studentDocs.push(doc);
    }

    // ==========================================
    // 5. Subjects (Comprehensive subjects across branches & semesters)
    // ==========================================
    const defaultSubjects = [
      // CSE Semester 4
      {
        name: "Database Management Systems",
        code: "CS401",
        branch: cseBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Operating Systems",
        code: "CS402",
        branch: cseBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Computer Networks",
        code: "CS403",
        branch: cseBranch._id,
        semester: 4,
        credits: 3,
      },
      {
        name: "Software Engineering",
        code: "CS404",
        branch: cseBranch._id,
        semester: 4,
        credits: 3,
      },

      // CSE Semester 2
      {
        name: "Data Structures & Algorithms",
        code: "CS201",
        branch: cseBranch._id,
        semester: 2,
        credits: 4,
      },
      {
        name: "Digital Logic Design",
        code: "CS202",
        branch: cseBranch._id,
        semester: 2,
        credits: 3,
      },

      // CSE Semester 6
      {
        name: "Machine Learning",
        code: "CS601",
        branch: cseBranch._id,
        semester: 6,
        credits: 4,
      },
      {
        name: "Cloud Computing",
        code: "CS602",
        branch: cseBranch._id,
        semester: 6,
        credits: 3,
      },

      // ECE Semester 4
      {
        name: "Signals and Systems",
        code: "EC401",
        branch: eceBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Microprocessors & Microcontrollers",
        code: "EC402",
        branch: eceBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Analog Communication",
        code: "EC403",
        branch: eceBranch._id,
        semester: 4,
        credits: 3,
      },

      // IT Semester 4
      {
        name: "Web Technologies & Frameworks",
        code: "IT401",
        branch: itBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Information & Network Security",
        code: "IT402",
        branch: itBranch._id,
        semester: 4,
        credits: 3,
      },

      // AIDS Semester 4
      {
        name: "Artificial Intelligence Foundations",
        code: "AI401",
        branch: aidsBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Data Mining & Data Warehousing",
        code: "AI402",
        branch: aidsBranch._id,
        semester: 4,
        credits: 3,
      },

      // ME Semester 4
      {
        name: "Applied Thermodynamics",
        code: "ME401",
        branch: meBranch._id,
        semester: 4,
        credits: 4,
      },
      {
        name: "Fluid Mechanics & Hydraulic Machines",
        code: "ME402",
        branch: meBranch._id,
        semester: 4,
        credits: 4,
      },
    ];

    const subjectDocs = [];
    for (const sub of defaultSubjects) {
      let doc = await Subject.findOne({ code: sub.code, branch: sub.branch });
      if (!doc) {
        doc = await Subject.create(sub);
        console.log(`- Created Subject: ${sub.code} - ${sub.name}`);
      }
      subjectDocs.push(doc);
    }

    // ==========================================
    // 6. Notices (6 Notices)
    // ==========================================
    const defaultNotices = [
      {
        title: "Semester 4 Mid-Term Examinations Schedule",
        description:
          "Mid-term examinations for all Semester 4 students will commence next Monday. Check the official timetable for room allotments and timings.",
        type: "both",
        link: "https://example.com/exam-schedule",
      },
      {
        title: "Annual Technical Symposium - InnoVision 2026",
        description:
          "Registrations are now open for InnoVision 2026 hackathons, robotics challenges, and paper presentations. Win cash prizes and internship opportunities!",
        type: "student",
        link: "https://example.com/innovision",
      },
      {
        title: "Faculty Academic Review & Curriculum Meeting",
        description:
          "All faculty members are invited to attend the curriculum upgrade and semester progress review meeting this Friday at 3:30 PM in Conference Hall A.",
        type: "faculty",
        link: "",
      },
      {
        title: "Campus Library Extended Hours for Examination Period",
        description:
          "The Central Library and Digital Reading Hall will remain open until 11:00 PM throughout the examination month for all students and faculty.",
        type: "both",
        link: "",
      },
      {
        title: "Campus Placement Drive - Leading Tech Companies",
        description:
          "Pre-placement talks and registration for upcoming summer internships and final placements start this week. Eligible students must update their profiles.",
        type: "student",
        link: "https://example.com/placements",
      },
      {
        title: "Faculty Development Program on Generative AI",
        description:
          "A 3-day faculty development workshop on LLMs and AI Integration in higher education will be hosted next month. Interested faculty can enroll with HOD.",
        type: "faculty",
        link: "https://example.com/fdp-ai",
      },
    ];

    for (const n of defaultNotices) {
      const existing = await Notice.findOne({ title: n.title });
      if (!existing) {
        await Notice.create(n);
        console.log(`- Created Notice: ${n.title}`);
      }
    }

    // ==========================================
    // 7. Exams
    // ==========================================
    const defaultExams = [
      {
        name: "Semester 4 Mid-Term Examinations",
        date: new Date(),
        semester: 4,
        examType: "mid",
        timetableLink: "https://example.com/exam-sem4-mid.pdf",
        totalMarks: 30,
      },
      {
        name: "Semester 4 End-Term Examinations",
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        semester: 4,
        examType: "end",
        timetableLink: "https://example.com/exam-sem4-end.pdf",
        totalMarks: 70,
      },
      {
        name: "Semester 2 Mid-Term Examinations",
        date: new Date(),
        semester: 2,
        examType: "mid",
        timetableLink: "https://example.com/exam-sem2-mid.pdf",
        totalMarks: 30,
      },
      {
        name: "Semester 6 Mid-Term Examinations",
        date: new Date(),
        semester: 6,
        examType: "mid",
        timetableLink: "https://example.com/exam-sem6-mid.pdf",
        totalMarks: 30,
      },
    ];

    const examDocs = [];
    for (const ex of defaultExams) {
      let doc = await Exam.findOne({ name: ex.name });
      if (!doc) {
        doc = await Exam.create(ex);
        console.log(`- Created Exam: ${ex.name}`);
      }
      examDocs.push(doc);
    }

    // ==========================================
    // 8. Timetables (Branches & Semesters)
    // ==========================================
    const defaultTimetables = [
      {
        link: "https://example.com/timetables/cse-semester-4.pdf",
        branch: cseBranch._id,
        semester: 4,
      },
      {
        link: "https://example.com/timetables/cse-semester-2.pdf",
        branch: cseBranch._id,
        semester: 2,
      },
      {
        link: "https://example.com/timetables/cse-semester-6.pdf",
        branch: cseBranch._id,
        semester: 6,
      },
      {
        link: "https://example.com/timetables/ece-semester-4.pdf",
        branch: eceBranch._id,
        semester: 4,
      },
      {
        link: "https://example.com/timetables/it-semester-4.pdf",
        branch: itBranch._id,
        semester: 4,
      },
      {
        link: "https://example.com/timetables/aids-semester-4.pdf",
        branch: aidsBranch._id,
        semester: 4,
      },
    ];

    for (const tt of defaultTimetables) {
      const existing = await Timetable.findOne({
        branch: tt.branch,
        semester: tt.semester,
      });
      if (!existing) {
        await Timetable.create(tt);
        console.log(`- Created Timetable for Sem ${tt.semester}`);
      }
    }

    // ==========================================
    // 9. Materials (Study Notes, Assignments, Syllabi)
    // ==========================================
    const dbmsSubject = subjectDocs.find((s) => s.code === "CS401");
    const osSubject = subjectDocs.find((s) => s.code === "CS402");
    const cnSubject = subjectDocs.find((s) => s.code === "CS403");
    const dsaSubject = subjectDocs.find((s) => s.code === "CS201");
    const mlSubject = subjectDocs.find((s) => s.code === "CS601");
    const sigSubject = subjectDocs.find((s) => s.code === "EC401");
    const webSubject = subjectDocs.find((s) => s.code === "IT401");

    const profJohn = facultyDocs.find((f) => f.email === "teacher@gmail.com") || facultyDocs[0];
    const profSarah = facultyDocs.find((f) => f.email === "sarah@gmail.com") || facultyDocs[0];
    const profRobert = facultyDocs.find((f) => f.email === "robert@gmail.com") || facultyDocs[0];
    const profEmily = facultyDocs.find((f) => f.email === "emily@gmail.com") || facultyDocs[0];

    const materialsList = [];

    if (dbmsSubject && profJohn) {
      materialsList.push({
        title: "DBMS Complete Lecture Notes & SQL Cheat Sheet",
        subject: dbmsSubject._id,
        faculty: profJohn._id,
        file: "dbms_complete_notes.pdf",
        semester: 4,
        branch: cseBranch._id,
        type: "notes",
      });
    }

    if (osSubject && profJohn) {
      materialsList.push({
        title: "Operating Systems Process Synchronization Assignment",
        subject: osSubject._id,
        faculty: profJohn._id,
        file: "os_assignment_sync.pdf",
        semester: 4,
        branch: cseBranch._id,
        type: "assignment",
      });
    }

    if (cnSubject && profSarah) {
      materialsList.push({
        title: "Computer Networks Lab Syllabus & Wireshark Guide",
        subject: cnSubject._id,
        faculty: profSarah._id,
        file: "cn_lab_syllabus.pdf",
        semester: 4,
        branch: cseBranch._id,
        type: "syllabus",
      });
    }

    if (dsaSubject && profSarah) {
      materialsList.push({
        title: "DSA Trees and Graphs Problem Set",
        subject: dsaSubject._id,
        faculty: profSarah._id,
        file: "dsa_problem_set.pdf",
        semester: 2,
        branch: cseBranch._id,
        type: "assignment",
      });
    }

    if (sigSubject && profRobert) {
      materialsList.push({
        title: "Fourier Transform & Laplace Quick Handbook",
        subject: sigSubject._id,
        faculty: profRobert._id,
        file: "signals_fourier_handbook.pdf",
        semester: 4,
        branch: eceBranch._id,
        type: "notes",
      });
    }

    if (webSubject && profEmily) {
      materialsList.push({
        title: "Modern Web Development with React & Node Guide",
        subject: webSubject._id,
        faculty: profEmily._id,
        file: "web_tech_guide.pdf",
        semester: 4,
        branch: itBranch._id,
        type: "notes",
      });
    }

    for (const mat of materialsList) {
      const existing = await Material.findOne({ title: mat.title });
      if (!existing) {
        await Material.create(mat);
        console.log(`- Created Material: ${mat.title}`);
      }
    }

    // ==========================================
    // 10. Marks (Mid-Term and End-Term for Students)
    // ==========================================
    const midExamSem4 = examDocs.find((e) => e.examType === "mid" && e.semester === 4);
    const endExamSem4 = examDocs.find((e) => e.examType === "end" && e.semester === 4);
    const midExamSem2 = examDocs.find((e) => e.examType === "mid" && e.semester === 2);

    const alex = studentDocs.find((s) => s.email === "student@gmail.com");
    const priya = studentDocs.find((s) => s.email === "priya@gmail.com");
    const rahul = studentDocs.find((s) => s.email === "rahul@gmail.com");
    const sneha = studentDocs.find((s) => s.email === "sneha@gmail.com");
    const ananya = studentDocs.find((s) => s.email === "ananya@gmail.com");
    const karan = studentDocs.find((s) => s.email === "karan@gmail.com");

    const se4Subject = subjectDocs.find((s) => s.code === "CS404");

    const sampleMarks = [];

    // Alex Sharma (CSE Sem 4)
    if (alex && midExamSem4 && dbmsSubject && osSubject && cnSubject && se4Subject) {
      sampleMarks.push(
        { studentId: alex._id, subjectId: dbmsSubject._id, marksObtained: 27, semester: 4, examId: midExamSem4._id },
        { studentId: alex._id, subjectId: osSubject._id, marksObtained: 28, semester: 4, examId: midExamSem4._id },
        { studentId: alex._id, subjectId: cnSubject._id, marksObtained: 25, semester: 4, examId: midExamSem4._id },
        { studentId: alex._id, subjectId: se4Subject._id, marksObtained: 29, semester: 4, examId: midExamSem4._id }
      );
      if (endExamSem4) {
        sampleMarks.push(
          { studentId: alex._id, subjectId: dbmsSubject._id, marksObtained: 63, semester: 4, examId: endExamSem4._id },
          { studentId: alex._id, subjectId: osSubject._id, marksObtained: 66, semester: 4, examId: endExamSem4._id },
          { studentId: alex._id, subjectId: cnSubject._id, marksObtained: 61, semester: 4, examId: endExamSem4._id },
          { studentId: alex._id, subjectId: se4Subject._id, marksObtained: 68, semester: 4, examId: endExamSem4._id }
        );
      }
    }

    // Priya Patel (CSE Sem 4)
    if (priya && midExamSem4 && dbmsSubject && osSubject && cnSubject) {
      sampleMarks.push(
        { studentId: priya._id, subjectId: dbmsSubject._id, marksObtained: 29, semester: 4, examId: midExamSem4._id },
        { studentId: priya._id, subjectId: osSubject._id, marksObtained: 28, semester: 4, examId: midExamSem4._id },
        { studentId: priya._id, subjectId: cnSubject._id, marksObtained: 27, semester: 4, examId: midExamSem4._id }
      );
      if (endExamSem4) {
        sampleMarks.push(
          { studentId: priya._id, subjectId: dbmsSubject._id, marksObtained: 68, semester: 4, examId: endExamSem4._id },
          { studentId: priya._id, subjectId: osSubject._id, marksObtained: 65, semester: 4, examId: endExamSem4._id }
        );
      }
    }

    // Rahul Verma (CSE Sem 4)
    if (rahul && midExamSem4 && dbmsSubject && osSubject) {
      sampleMarks.push(
        { studentId: rahul._id, subjectId: dbmsSubject._id, marksObtained: 24, semester: 4, examId: midExamSem4._id },
        { studentId: rahul._id, subjectId: osSubject._id, marksObtained: 26, semester: 4, examId: midExamSem4._id }
      );
    }

    // Sneha Reddy (CSE Sem 4)
    if (sneha && midExamSem4 && dbmsSubject && cnSubject) {
      sampleMarks.push(
        { studentId: sneha._id, subjectId: dbmsSubject._id, marksObtained: 28, semester: 4, examId: midExamSem4._id },
        { studentId: sneha._id, subjectId: cnSubject._id, marksObtained: 29, semester: 4, examId: midExamSem4._id }
      );
    }

    // Ananya Roy (ECE Sem 4)
    if (ananya && midExamSem4 && sigSubject) {
      sampleMarks.push(
        { studentId: ananya._id, subjectId: sigSubject._id, marksObtained: 27, semester: 4, examId: midExamSem4._id }
      );
    }

    // Karan Mehta (CSE Sem 2)
    if (karan && midExamSem2 && dsaSubject) {
      sampleMarks.push(
        { studentId: karan._id, subjectId: dsaSubject._id, marksObtained: 28, semester: 2, examId: midExamSem2._id }
      );
    }

    for (const m of sampleMarks) {
      const existing = await Marks.findOne({
        studentId: m.studentId,
        subjectId: m.subjectId,
        examId: m.examId,
      });
      if (!existing) {
        await Marks.create(m);
      }
    }
    console.log("- Ensured Sample Student Marks");

    console.log("\n==========================================================================");
    console.log("   EXPANDED DATA READY FOR PLAYAROUND (12 Students, 6 Faculty, 6 Branches)");
    console.log("==========================================================================");
    console.log("Admin:     admin@gmail.com   /  admin123  (Super Administrator)");
    console.log("Admin 2:   sundar@gmail.com  /  admin123  (System Administrator)");
    console.log("--------------------------------------------------------------------------");
    console.log("Faculty 1: teacher@gmail.com /  teacher123 (John Doe - Assistant Prof, CSE)");
    console.log("Faculty 2: sarah@gmail.com   /  teacher123 (Sarah Jenkins - Associate Prof, CSE)");
    console.log("Faculty 3: robert@gmail.com  /  teacher123 (Robert Miller - HOD, ECE)");
    console.log("Faculty 4: emily@gmail.com   /  teacher123 (Emily Davis - Assistant Prof, IT)");
    console.log("Faculty 5: david@gmail.com   /  teacher123 (David Wilson - Associate Prof, ME)");
    console.log("Faculty 6: anita@gmail.com   /  teacher123 (Anita Sharma - Assistant Prof, AIDS)");
    console.log("--------------------------------------------------------------------------");
    console.log("Student 1: student@gmail.com /  student123 (Alex Sharma - CSE, Sem 4)");
    console.log("Student 2: priya@gmail.com   /  student123 (Priya Patel - CSE, Sem 4)");
    console.log("Student 3: rahul@gmail.com   /  student123 (Rahul Verma - CSE, Sem 4)");
    console.log("Student 4: sneha@gmail.com   /  student123 (Sneha Reddy - CSE, Sem 4)");
    console.log("Student 5: ananya@gmail.com  /  student123 (Ananya Roy - ECE, Sem 4)");
    console.log("Student 6: vikram@gmail.com  /  student123 (Vikram Malhotra - ECE, Sem 4)");
    console.log("Student 7: rohan@gmail.com   /  student123 (Rohan Gupta - IT, Sem 4)");
    console.log("Student 8: neha@gmail.com    /  student123 (Neha Kapoor - IT, Sem 4)");
    console.log("Student 9: arjun@gmail.com   /  student123 (Arjun Nair - ME, Sem 4)");
    console.log("Student 10: kavya@gmail.com  /  student123 (Kavya Iyer - AIDS, Sem 4)");
    console.log("Student 11: karan@gmail.com  /  student123 (Karan Mehta - CSE, Sem 2)");
    console.log("Student 12: pooja@gmail.com  /  student123 (Pooja Joshi - CSE, Sem 6)");
    console.log("==========================================================================\n");
  } catch (error) {
    console.error("Error during default data seeding:", error);
  }
};

module.exports = seedDefaultData;
