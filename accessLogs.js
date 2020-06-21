const fs = require('fs')

var dir = 'C:\\Users\\noelc\\Documents\\GitHub\\sentry\\data\\sentry.json'
var data = fs.readFileSync(dir, 'utf8')
var logs = getDailyLogs(data)

console.log(getEntryExitCounts(getDailyCheckptLogs(logs)))

function groupBy(arr, key) {
    return arr.reduce((res, val) => {
        (res[val[key]] = res[val[key]] || []).push(val);
        return res
    }, {});
}

function getEntryExitCounts(entries) {
    for (var entry of entries) {
        entry[1] = Object.entries(entry[1])
        var checkpts = entry[1]
        for (var checkpt of checkpts) {
            var key = checkpt[0]
            var value = getLogCount(checkpt[1])
            checkpt = [key, value]
        }
    }
    return entries
}

function getDailyCheckptLogs(logs) {
    var entries = Object.entries(logs)
    for (var entry of entries)
        entry[1] = groupBy(entry[1], "checkpt")
    return entries
}

function getDailyLogs(json) {
    return groupBy(getAllLogs(json), 'date')
}

function getCheckptLogs(json) {
    return groupBy(getAllLogs(json), 'checkpt')
}

function getLogCount(logs) {
    var entry = 0,
        exit = 0

    for (var i of logs) {
        var ee = i.entryExit
        if (ee == 'Entry') entry++
            else exit++
    }

    return {
        entries: entry,
        exits: exit
    }
}

// Todo: generate chart functions
function sortLogs(json) {
    var logs = getAllLogs(json),
        checkpts = []

    for (var i of logs) {
        var checkpt = i.checkpt.substr(0, 3)
        i.checkpt = checkpt
        checkpts.push(checkpt)
    }
    checkpts = checkpts.reduce((u, b) => u.includes(b) ? u : [...u, b], [])

    return checkpts
}

function countEntryExit(json) {
    var logs = JSON.parse(json),
        entries = 0,
        exits = 0

    for (var i of logs) {
        var ee = i.entryExit
        switch (ee) {
            case 'Entry':
                entries++
                break
            case 'Exit':
                exits++
                break
        }
    }

    var schools = ['MAI', 'EAS', 'WES'],
        checkpts = ['ASC', 'BUS', 'DES', 'ENG', 'HSS', 'IIT'],
        facilities = ['LIB', 'AUD', 'SHG', 'CAN']

    return {
        entries: entries,
        exits: exits
    }
}

function getClassIDs(json) {
    var sch = getAllClasses(json)
    var classIDs = []
    for (var c of sch) classIDs.push(c.classID)
    return classIDs
}

// Get all entry and exit logs
function getAllLogs(json) {
    var allMembers = [],
        personInfo = [],
        logRecords = []

    var allStudents = getAllStudents(json)
    var allStaff = getAllStaff(json)
    allPeople = [...allStudents, ...allStaff]

    for (var person of allPeople) {
        var type = person.role === undefined ? 'Student' : 'Staff'
        var id = type === 'Student' ? person.matricNo : person.staffID

        var name = person.name,
            clas = person.classID,
            logs = person.logs

        allMembers.push({
            type: type,
            id: id,
            name: name,
            classID: clas,
            logs: logs
        })
    }

    for (var person of allMembers) {
        for (var logRecord of person.logs) {
            logRecord.type = person.type
            logRecord.id = person.id
            logRecord.name = person.name
            logRecord.classID = person.classID
            personInfo.push(logRecord)
        }
    }

    for (var record of personInfo) {
        for (var logRecord of record.logs) {
            logRecord.date = record.date
            logRecord.type = record.type
            logRecord.id = record.id
            logRecord.name = record.name
            logRecord.classID = record.classID
            logRecords.push(logRecord)
        }
    }

    logRecords = logRecords.filter(i => (i.checkpt != undefined || null))
        .filter(i => !i.checkpt.includes('NaN'))

    for (var i of logRecords) {
        var checkpt = i.checkpt.substr(0, 3)
        i.checkpt = checkpt
    }

    return logRecords
}

// Get a list of all classes
function getAllClasses(json) {
    var sch = JSON.parse(json)

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
function getAllStudents(json) {
    var classArray = getAllClasses(json)

    var studentArray = []
    for (var cls of classArray) {
        var students = cls.students

        for (var student of students) {
            student.school = cls.school
            student.schoolName = cls.schoolName
            student.course = cls.course
            student.courseCode = cls.courseCode
            student.classID = cls.classID
        }

        studentArray.push(students)
    }

    return studentArray.flat()
}

// Get a list of all staff members
function getAllStaff(json) {
    var classArray = getAllClasses(json)

    var staffArray = []

    for (var cls of classArray) {
        var carePerson = cls.carePerson,
            tutors = cls.tutors

        for (var tutor of tutors) {
            tutor.school = cls.school
            tutor.schoolName = cls.schoolName
            tutor.course = cls.course
            tutor.courseCode = cls.courseCode
            tutor.classID = cls.classID
            tutor.role = 'Tutor/Lecturer'
        }

        var cp = carePerson
        cp.school = cls.school
        cp.schoolName = cls.schoolName
        cp.course = cls.course
        cp.courseCode = cls.courseCode
        cp.classID = cls.classID
        cp.role = 'Care Person'

        staffArray.push(tutors)
        staffArray.push(cp)
    }
    return staffArray.flat()
}

// Search for a person
function searchPerson(query, type, json) {
    var allStudents, allStaff, allPeople, res

    allStudents = getAllStudents(json)
    allStaff = getAllStaff(json)

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

// console.log(util.inspect(school, { showHidden: false, depth: null }))
// console.log(searchPerson(`"course":"ITO"`, '', school))
// console.log(util.inspect(school, { showHidden: false, depth: null }))
// console.log(searchPerson(`"course":"ITO"`, '', school))
