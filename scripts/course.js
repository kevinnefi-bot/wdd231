const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program structure.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'An introduction to writing functions and structured code.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'An introduction to Object-Oriented Programming principles.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Building dynamic web pages with JavaScript.',
        technology: ['JS', 'HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Advanced web development with modern APIs and frameworks.',
        technology: ['JS', 'CSS', 'HTML'],
        completed: false
    }
];

const container = document.querySelector('#course-container');
const totalCreditsEl = document.querySelector('#total-credits');

function displayCourses(courseList) {
    container.innerHTML = '';
    courseList.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'pending'}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>: ${course.title}`;
        container.appendChild(card);
    });

    // Reduce function to calculate dynamic credits based on visible courses
    const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
}

// Event Listeners for Filters
document.querySelector('#all-btn').addEventListener('click', () => displayCourses(courses));
document.querySelector('#wdd-btn').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'WDD'));
});
document.querySelector('#cse-btn').addEventListener('click', () => {
    displayCourses(courses.filter(course => course.subject === 'CSE'));
});

// Initial Render
displayCourses(courses);