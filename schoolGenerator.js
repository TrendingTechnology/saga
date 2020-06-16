var faker = require('faker')
var mth = require('mathjs')
var util = require('util')

// http://playcode.io/618191/ //

// console.log(util.inspect(school, { showHidden: false, depth: null }))
// console.log(searchPerson(`"course":"ITO"`, '', school))

/*
 * =//=//=//=//=//=//=//=//=
 * SCHOOL GENERATOR 3000000
 * =//=//=//=//=//=//=//=//=*/

//?? CONSTANTS ??//
// 37 courses which Temasek Poly offers.
const Courses = [
    ['ASC', 'Applied Science', 'CME', 'Chemical Engineering'],
    ['ASC', 'Applied Science', 'PHA', 'Pharmaceutical Science'],
    ['ASC', 'Applied Science', 'FNC', 'Food, Nutrition & Culinary Science'],
    ['ASC', 'Applied Science', 'VET', 'Veterinary Technology'],
    ['ASC', 'Applied Science', 'MED', 'Medical Biotechnology'],
    ['BUS', 'Business', 'ACF', 'Accountancy & Finance'],
    ['BUS', 'Business', 'BUS', 'Business'],
    ['BUS', 'Business', 'CMM', 'Communications & Media Management'],
    ['BUS', 'Business', 'CCM', 'Culinary & Catering Management'],
    ['BUS', 'Business', 'HTM', 'Hospitality & Tourism Management'],
    ['BUS', 'Business', 'LAW', 'Law & Management'],
    ['BUS', 'Business', 'LOM', 'Logistics & Operations Management'],
    ['BUS', 'Business', 'MKT', 'Marketing'],
    ['DES', 'Design', 'ADM', 'Apparel Design & Merchandising'],
    ['DES', 'Design', 'IAD', 'Interior Architeture & Design'],
    ['DES', 'Design', 'CMD', 'Communication Design'],
    ['DES', 'Design', 'PID', 'Product & Industrial Design'],
    ['DES', 'Design', 'DFT', 'Digital Film & Television'],
    ['ENG', 'Engineering', 'BSE', 'Business Process and System Engineering'],
    ['ENG', 'Engineering', 'AEL', 'Aerospace Electronics'],
    ['ENG', 'Engineering', 'CPE', 'Computer Engineering'],
    ['ENG', 'Engineering', 'AEN', 'Aerospace Engineering'],
    ['ENG', 'Engineering', 'ELE', 'Electronics'],
    ['ENG', 'Engineering', 'ATB', 'Architectural Technology & Building Services'],
    ['ENG', 'Engineering', 'IFM', 'Integrated Facility Management'],
    ['ENG', 'Engineering', 'AVM', 'Aviation Management'],
    ['ENG', 'Engineering', 'MEC', 'Mechatronics'],
    ['ENG', 'Engineering', 'BME', 'Biomedical Engineering'],
    ['HSS', 'Humanities & Social Sciences', 'ECD', 'Early Childhood Development & Education'],
    ['HSS', 'Humanities & Social Sciences', 'GER', 'Social Sciences in Gerontology'],
    ['HSS', 'Humanities & Social Sciences', 'PSY', 'Psychology Studies'],
    ['IIT', 'Informatics & I.T.', 'FBI', 'Financial Business Informatics'],
    ['IIT', 'Informatics & I.T.', 'AAI', 'Applied Artificial Intelligence'],
    ['IIT', 'Informatics & I.T.', 'GDD', 'Game Design & Development'],
    ['IIT', 'Informatics & I.T.', 'BDA', 'Big Data & Analytics'],
    ['IIT', 'Informatics & I.T.', 'ITO', 'Information Technology'],
    ['IIT', 'Informatics & I.T.', 'CDF', 'Cybersecurity & Digital Forensics']
]

// Prepare a JSON file to submit to the database
function prepareSchool(numClasses, numStudents, numTutors) {
    var courses = []
    for (var a in Courses) {
        var classes = []

        // Three academic years
        for (var b = 17; b++ < 20;) {
            // At most six classes per course
            for (var c = 0; c++ < numClasses;) {
                cls = [], tut = []
                for (var d = 0; d++ < numStudents;) cls.push(generateStudent(b, d))
                for (var d = 0; d++ < numTutors;) tut.push(generateStaff())
                var classID = Courses[a][0][0] + Courses[a][2] + b + zeropad(c)
                var careGroup = {
                    classID: classID,
                    carePerson: generateStaff(),
                    tutors: tut,
                    students: cls
                }
                classes.push(careGroup)
            }
        }

        var course = {
            school: Courses[a][0],
            schoolName: Courses[a][1],
            course: Courses[a][2],
            courseCode: Courses[a][3],
            classes: classes
        }
        courses.push(course)
    }

    return courses
}

// Generate a staff member
function generateStaff() {
    const genders = ['male', 'female']
    var gender = choice(genders)

    var birthYear = randint(1970, 2000),
        birthDate = randomDate(new Date(birthYear, 0, 1),
            new Date(birthYear, 11, 1)),
        icNo = toICNo(birthDate)
    var Phone = randint(8 * 10 ** 7, 10 ** 8 - 1).toString()

    var FirstName = faker.name.firstName(gender),
        LastName = faker.name.lastName(gender)
    var Email = faker.internet.email(FirstName, LastName).toLowerCase()
    var staffID = Email.split('@')[0]
    var SchoolEmail = staffID.toLowerCase() + '@tp.edu.sg'

    return {
        staffID: staffID,
        name: FirstName + ' ' + LastName,
        dob: birthDate.toLocaleDateString(),
        icNo: icNo,
        gender: gender.toTitleCase(),
        phone: Phone,
        email: Email,
        schoolEmail: SchoolEmail,
        status: 'Active',
        logs: entryExitLogs(from, to, 8, choice(['ASC', 'BUS', 'DES', 'ENG', 'HSS', 'IIT'])),
        flag: 'Non-Case',
        case: '',
        caseDate: '',
        recovery: ''
    }
}

// Generate a random student
function generateStudent(acadYear, regNo) {
    const genders = ['male', 'female']
    var gender = choice(genders)

    var birthYear = 2000 + acadYear - 17,
        birthDate = randomDate(new Date(birthYear, 0, 1),
            new Date(birthYear, 11, 1)),
        icNo = toICNo(birthDate)
    var Phone = randint(8 * 10 ** 7, 10 ** 8 - 1).toString()

    var MatricId = parseInt(acadYear + pad(randint(1, 9999), 5)),
        MatricNo = MatricId.toString() + matricChecksum(MatricId, 'ABCDEFGHIJ')

    var SchoolEmail = MatricNo.toLowerCase() + '@student.tp.edu.sg'
    var FirstName = faker.name.firstName(gender),
        LastName = faker.name.lastName(gender)
    var Email = faker.internet.email(FirstName, LastName).toLowerCase()

    return {
        matricNo: MatricNo,
        regNo: regNo.toString(),
        name: FirstName + ' ' + LastName,
        dob: birthDate.toLocaleDateString(),
        icNo: icNo,
        gender: gender.toTitleCase(),
        phone: Phone,
        email: Email,
        schoolEmail: SchoolEmail,
        status: 'Active',
        logs: entryExitLogs(from, to, 8, choice(['ASC', 'BUS', 'DES', 'ENG', 'HSS', 'IIT'])),
        flag: 'Non-Case',
        case: '',
        caseDate: '',
        recovery: ''
    }
}

//?? Access functions ??//
// Sort JSON data by class
function getAllClasses(jsonString) {
    var sch = JSON.parse(jsonString)

    var classes = []
    for (var clazz of sch) {
        var school = clazz.school,
            schoolName = clazz.schoolName,
            course = clazz.course,
            courseCode = clazz.courseCode,
            allClasses = clazz.classes

        for (var clasz of allClasses) {
            clasz.school = school
            clasz.schoolName = schoolName
            clasz.course = course
            clasz.courseCode = courseCode
        }

        classes.push(allClasses)
    }

    return classes.flat()
}

// Get a list of all students
function getAllStudents(jsonString) {
    var classArray = getAllClasses(jsonString)

    var studentArray = []
    for (var cls of classArray) {
        var classID = cls.classID,
            // carePerson = cls.carePerson,
            // tutors = cls.tutors,
            students = cls.students,
            school = cls.school,
            schoolName = cls.schoolName,
            course = cls.course,
            courseCode = cls.courseCode

        for (var student of students) {
            student.school = school
            student.schoolName = schoolName
            student.course = course
            student.courseCode = courseCode
            student.classID = classID
                // student.carePerson = carePerson
                // student.tutors = tutors
        }

        studentArray.push(students)
    }

    return studentArray.flat()
}

// Get a list of all staff members
function getAllStaff(jsonString) {
    var classArray = getAllClasses(jsonString)

    var staffArray = []

    for (var clazz of classArray) {
        var classID = clazz.classID,
            carePerson = clazz.carePerson,
            tutors = clazz.tutors,
            school = clazz.school,
            schoolName = clazz.schoolName,
            course = clazz.course,
            courseCode = clazz.courseCode

        for (var tutor of tutors) {
            tutor.school = school
            tutor.schoolName = schoolName
            tutor.course = course
            tutor.courseCode = courseCode
            tutor.classID = classID
            tutor.role = 'Tutor/Lecturer'
        }

        var cp = carePerson
        cp.school = school
        cp.schoolName = schoolName
        cp.course = course
        cp.courseCode = courseCode
        cp.classID = classID
        cp.role = 'Care Person'

        staffArray.push(tutors)
        staffArray.push(cp)
    }
    return staffArray.flat()
}

// Get a list of all faculty members
function getAllFaculty(jsonString) {
    var sch = JSON.parse(jsonString)
    return sch
}

// Search for a person
function searchPerson(query, type, jsonString) {
    var allStudents, allStaff, allPeople, res

    allStudents = getAllStudents(jsonString)
    allStaff = getAllStaff(jsonString)

    allStudents = allStudents.map(i => JSON.stringify(i))
    allStaff = allStaff.map(i => JSON.stringify(i))

    all = [...allStudents, ...allStaff]

    switch (type) {
        case 'student':
            res = allStudents.filter(i => i.includes(query))
            break
        case 'staff':
            res = allStaff.filter(i => i.includes(query))
            break
        default:
            res = all.filter(i => i.includes(query))
    }

    return res.map(i => JSON.parse(i))
}

//?? Matriculation ID and IC Number ??//
// Generate a matriculation number checksum
function matricChecksum(int, refs = 'ABCDEFGHIZJ') {
    var intString = int.toString(),
        l = intString.length,
        weight = l <= 1 ? [l] : [...[2], ...[...Array(l - 1).keys()].map(i => l - i)],
        totalSum = 0,
        length = refs.length

    for (var i = 0; i < l; i++)
        totalSum = totalSum + parseInt(intString[i]) * weight[i]
    index = length - 1 - totalSum % length
    return refs[index]
}

// Convert a date object to an IC number
function toICNo(dob) {
    var year = dob.getFullYear()

    var yearPrefix = year >= 2000 ? 'T' : 'S'
    yearPrefix += year.toString().substr(2)

    var doy = getDOY(dob),
        nd = isLeapYear(dob) ? 366 : 365
    var d5 = ~~(10 ** 5 / nd * doy) + randint(0, 10 ** 5 / nd)

    return yearPrefix + pad(d5, 5) + matricChecksum(5)
}

//?? Generation functions ??//
// Generate entry-exit logs for a student
function entryExitLogs(from, to, len, sch) {
    var dates = []
    for (var date of getDates(from, to))
        dates.push({
            date: date.toLocaleDateString(),
            logs: entryExitArray(entryExitPattern(len), sch)
        })

    return dates
}

// Generate entry exit pattern for one day
function entryExitPattern(len) {
    var k = Math.ceil(len / 2)
    var str = recursiveShuffle(k)
    str += rev(str.split('').map(i => i == 0 ? '1' : '0').join(''))
    str = '0' + str + '1'

    return str
}

// Parse this entry-exit pattern with JSON data
function entryExitArray(str, sch) {
    var newArr = [],
        checkPts = [],
        /* gates = ['MAI', 'EAS', 'WES'],
        checkpts = ['ASC', 'BUS', 'DES', 'ENG', 'HSS', 'IIT'], */
        facilities = ['LIB', 'AUD', 'SHG', 'CAN'],
        entryExit = str.split('').map(i => i == 0 ? 'Entry' : 'Exit')

    var times = generateTimes(str.length + 1, 7, 16)

    var totals = []
    var arr = str.split('').map(i => i == 1 ? -1 : 1)

    for (var i in str) {
        var total = sum(arr.slice(0, i))
        totals.push(total)
    }

    var rand = randint(1, 5)
    for (var i in totals) {
        switch (totals[i]) {
            case 1:
                checkPts.push(sch == 'ENG' ? 'WES' : 'BUSDES'.includes(sch) ? 'MAI' : 'EAS')
                break
            case 2:
                checkPts.push(sch)
                break
            case 3:
            case 4:
                checkPts.push(rand < 2 ? choice(facilities) : generateRoom(sch))
                break
            default:
                checkPts.push(choice(facilities))
        }
    }

    for (var i in totals) {
        newArr.push({
            entryExit: i == entryExit.length ? 'Exit' : entryExit[i],
            checkpt: checkPts[i],
            // level: totals[i],
            time: times[i]
        })
    }

    return newArr
}

// Generate a classroom room number
function generateRoom(school) {
    schools = ['ASC', 'BUS', 'DES', 'ENG', 'HSS', 'IIT']

    var minBlock, maxBlock, minLevel = 1,
        maxLevel = 8,
        randBlock = '1A'

    switch (school) {
        case 'ASC':
            minBlock = 5, maxBlock = 9
            randBlock = randint(minBlock, maxBlock)
            minLevel = 2
            break
        case 'BUS':
            minBlock = 26, maxBlock = 27
            randBlock = randint(minBlock, maxBlock)
            minLevel = 2
            break
        case 'DES':
            var rand = randint(0, 2)
            randBlock = rand == 1 ? 28 : '28A'
            minLevel = 2
            break
        case 'ENG':
            minBlock = 10, maxBlock = 26
            randBlock = randint(minBlock, maxBlock)
            break
        case 'HSS':
            minBlock = '1A', maxBlock = '1A'
            minLevel = 2
            break
        case 'IIT':
            minBlock = 1, maxBlock = 5
            randBlock = randint(minBlock, maxBlock)
            minLevel = 2
            break
        default:
            minBlock = 0, maxBlock = 0,
                randBlock = randint(minBlock, maxBlock),
                maxLevel = 3
    }

    var levelNo = randint(minLevel, maxLevel)
    var roomNo = pad(randint(1, 100), 2)

    return school + randBlock + '-' + levelNo + '-' + roomNo
}

// Generate a pattern recursively
function recursiveShuffle(len) {
    len = Math.ceil(len / 2)
    var str = '01'.repeat(len - 1)
    str = '0' + shuffle(str) + '1'

    var totals = []
    var arr = str.split('').map(i => i == 1 ? -1 : 1)

    for (var i in str) {
        var total = sum(arr.slice(0, i))
        totals.push(total)
    }

    for (var i in totals)
        if (totals[i] <= 0) return recursiveShuffle(len * 2)

    if (str.match(/(0){3,}|(1){3,}/g)) return recursiveShuffle(len * 2)
    return str
}

//?? Helper and Stack Overflow functions ??// 
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

function getDates(startDate, stopDate) {
    var dateArray = new Array()
    var currentDate = startDate
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = currentDate.addDays(1)
    }
    return dateArray
}

function isLeapYear(date) {
    var year = date.getFullYear()
    return year & 3 != 0 ? false : year % 100 != 0 || year % 400 == 0
}

function getDOY(date) {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    var mn = date.getMonth()
    var dn = date.getDate()
    var dayOfYear = dayCount[mn] + dn
    if (mn > 1 && isLeapYear(date)) dayOfYear++
        return dayOfYear
}

function randomTime(format, minh = 0, maxh = 24) {
    var h, m, s, fh, fm, fs, ampm

    h = randint(minh, maxh)
    m = ~~(Math.random() * 60)
    s = ~~(Math.random() * 60)

    h12 = h % 12 == 0 ? 12 : h % 12

    fh = pad(h, 2)
    fm = pad(m, 2)
    fs = pad(s, 2)

    ampm = h < 12 ? 'AM' : 'PM'

    switch (format) {
        default: return `${fh}:${fm}:${fs}`
        case '12h':
                return `${h12}:${fm}:${fs} ${ampm}`
    }
}

function generateTimes(len, min = 0, max = 24) {
    var times = [...Array(len).keys()].map(i => randomTime('', min, max))
    return times.sort((a, b) => a.localeCompare(b))
}

function shuffle(str) {
    var a = str.split(''),
        n = a.length

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var tmp = a[i]
        a[i] = a[j]
        a[j] = tmp
    }
    return a.join('')
}

function sample(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

function rev(s) {
    if (s === '') return ''
    else return rev(s.substr(1)) +
        s.charAt(0)
}

function pad(num, size, str = '0') {
    var s = num + ""
    while (s.length < size) s = str + s
    return s
}

function zeropad(number) {
    return ((number < 10) ? "0" : "") + number.toString()
}

function randint(min, max) {
    min = Math.ceil(min), max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function choice(arr) {
    return arr[randint(0, arr.length)]
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function sum(xs) {
    return xs.reduce((a, x) => a + x, 1)
}

function product(xs) {
    return xs.reduce((a, x) => a * x, 1)
}

String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

//?? Important Contents ??//
const from = new Date(2020, 7, 24)
const to = new Date(2020, 7, 24)
var school = prepareSchool(6, 24, 7)

console.log(JSON.stringify(school))

// console.log(util.inspect(school, { showHidden: false, depth: null }))
