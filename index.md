---
layout: home
---

## Course Objectives

Web technologies change at a rapid rate. Between the time that I wrote this and the time that you are reading it for the first time, it is likely that some hot new technology will have sprung up. As a software developer/computer scientist, how will you assess the latest technology and decide for yourself or your company whether it will fit in with the libraries and frameworks you are already using or whether it is a passing fad?

Our goal in this course is to learn about the fundamental underlying concepts of the protocols, languages, and architectures that make up web programming. These underlying general concepts will allow us to compare different approaches to building web applications and will give us the tools to evaluate new technologies as they come along.

## Learning outcomes

Upon successful completion of this course, students will be able to:

1. describe the components of a web application
1. explain the basic architecture of a web server
1. compare different frameworks from a software architecture point of view, highlighting similarities and differences
1. write and debug programs that manipulate the DOM
1. use browser developer tools to analyze and debug a web application
1. describe and use multiple models for communication between web server and client
1. build a web application using a variety of JavaScript libraries and frameworks

## Prerequisite

No assumptions are made about prior exposure to web development. Students should be confortable with programming, learning new programming languages and frameworks on their own. 

For specific prerequisite requirements see the UTSC Registrar.

## Course Staff

We encourage you to post questions regarding course materials and assignments on Piazza. However, if you need extended support, the course staff will hold office hours.

<div class="grid">
    <div class="hrow row">
        <div class="hcolumn column3"></div>
        <div class="column3">Office Hours</div>
        <div class="column3">Location</div>
        <div class="column3">Contact</div>
    </div>
    <div class="row">
        <div class="hcolumn column3">Thierry Sans</div>
        <div class="column3">{{site.data.settings.instructor.hours}}</div>
        <div class="column3">{{site.data.settings.instructor.location}}</div>
        <div class="column3">{{site.data.settings.instructor.contact}}</div>
    </div>
    {% for a in site.data.settings.assistants %}
    <div class="row">
        <div class="hcolumn column3">{{a.name}}</div>
        <div class="column3">{{a.hours}}</div>
        <div class="column3">{{a.location}}</div>
        <div class="column3">{{a.contact}}</div>
    </div>
    {% endfor %}
</div>

## Course Timing

<div class="grid">
    <div class="hrow row">
        <div class="hcolumn column3"></div>
        <div class="column3">Time</div>
        <div class="column3">Location</div>
        <div class="column3">Instructor</div>
    </div>
    {% for t in site.data.settings.timings %}
    <div class="row">
        <div class="hcolumn column3">{{t.section}}</div>
        <div class="column3">{{t.time}}</div>
        <div class="column3">{{t.location}}</div>
        <div class="column3">{{t.instructor}}</div>
    </div>
    {% endfor %}
</div>

## Course Information

- The [course website]({{site.data.settings.website}}) and its [Github repository]({{site.data.settings.github}})

	One of the nice things about using Github for the course website is that you can contribute to the course website. If you see something on the course website that should be fixed, or want to improve the UI, please feel free to submit a pull request. 

- [The Piazza discussion Board]({{ site.data.settings.piazza }})

	The discussion board is the best place to ask technical questions, and general questions about the course, assignments and labs. For personal issues, please use private posts. I try to respond by the end of the next day. However, due to volume, it may take longer, especially on weekends.

- The [anonymous feedback form]({{site.data.settings.feedback}})

	If you have feedback about the course, you can send an anonymous feedback to the course instructor (you also have the *option* of including your name). Since the sender cannot be determined, comments sent through the feedback form are considered public, and they may receive a response at the beginning of class or on the discussion board.

## Marking Scheme

The numeric marks of labs, assignments, project and final exam will be used to compute a composite numeric score that will determine your final letter grade for the course:

- **Lab Exercises:** For each lab, you will be asked to turn in a small piece of work during the practical session. Many of these will be directly related to the assignments. We will take the best 5 only.

- **Assignments:** Over the term, you will complete 3 individual assignments (worth 10% each).

- **Project:** As a team, you will develop a web application of your choice and present it the last week of class. 

- **Final Exam:** The final exam is comprehensive, 3 hours, and held during the exam period.

The weighting of course work is set as:

<div class="grid">
    <div class="hrow row">
        <div class="hcolumn column4"></div>
        <div class="column4">Weight</div>
    </div>
    <div class="row">
        <div class="hcolumn column4">Labs</div>
        <div class="column4">5%</div>
    </div>
    <div class="row">
        <div class="hcolumn column4">Assignments</div>
        <div class="column4">30%</div>
    </div>
    <div class="row">
        <div class="hcolumn column4">Project</div>
        <div class="column4">40%</div>
    </div>
    <div class="row">
        <div class="hcolumn column4">Final Exam</div>
        <div class="column4">25%</div>
    </div>
</div>

Marks of **at least 50% on the project AND at least 50% on the final exam** are required to pass the course. If you receive less than 50% on either the project or the final exam, your overall course grade will be capped at 49.

## Submission and Grading Policy

For each piece of work done for this class (either a lab, an assignment or the project), the student or the team will be required to submit the source code on the Github repository (student repository for individual work, team repository for the project). 

For group work, the instructor reserves the right to assign different grades to each of the team members based on their individual contributions made to the team repository. 

For your work to be graded, it must meet the minimum standards of a professional computer scientist. **All** files required to build the program must be committed to the repository, and the program must work. Last minute difficulties with git can easily be avoided by ensuring all files are added to the repository well before the deadline, and that you know how to commit them. **Your submission may receive a grade of 0, if we cannot get any part of it to work.**

No late submissions will be accepted for any course work, and no make-up assignments will be provided for missed/poorly completed work. It is your responsibility to ensure that all work is completed on time and to the best of your ability.

If an emergency arises that prevents you from being able to complete any piece of work, or attend an exam, contact one of the instructors immediately. You will need to have a properly completed Illness Verification Form signed by a registered doctor in order to be given special consideration.

If a piece of work has been mis-marked or if you believe the rubric used to evaluate the work is not appropriate, you may request a re-mark. For a re-mark to succeed, you must clearly and concisely express what you believe was mis-marked. To request a re-mark, please contact your TA. Requests must be submitted *within 1 week* of the marks being returned.

## Academic Integrity

You are expected to comply with the [Code of Behaviour on Academic Matters](http://www.governingcouncil.utoronto.ca/Assets/Governing+Council+Digital+Assets/Policies/PDF/ppjun011995.pdf). 

Assignment solutions must be prepared individually, except where an assignment handout allows working with a partner. Note that working with a partner may be restricted to just part of an assignment, such as programming task, whereas the rest of the assignment must be solved by an individual.

For group work, you are fully responsible for the piece of work you submit to the team repository as your contribution to the group work. 

When the assignment handout allows you to use snippets of code or third-party library from the web, you should cite the source in the source code. As a rule of thumb, any piece of code larger than 5 lines that has been copied and re-used as is or even slightly modified must be clearly referenced.

You may discuss assignments with other students, for example to clarify the requirements of an assignment, to work through examples that help you understand the technology used for an assignment, or to learn how to configure your system to run a supporting piece of software used in an assignment. However, collaboration at the level of answering written questions or designing and writing code, is strictly forbidden. Written problems and programming assignments must be answered, designed and coded by you alone, using the text, your own notes, and other texts and Web sources as aids.

Do not let other students look at your assignment solutions, since this can lead to copying. Remember you are in violation of the UTSC Academic Code whether you copy someone else's work or allow someone else to copy your work. These rules are meant to ensure that all students understand their solutions well enough to prepare the solutions themselves. If challenged you must be able to reproduce and explain your work.

You are not allowed to ask for help outside of the course Piazza. Asking for help anywhere else online or in private chat groups (unless the private group chat was setup between the group members of the same group project) will be considered as unauthorized help. 

The course staff reserves the right to use code and text analysis tools to compare your submission with others to verify that no improper collaboration has occurred.

Failure to comply with these guidelines is a serious academic offence. In past academic offense cases, the Associate Dean has imposed penalties for code violations that range from a mark of zero on plagiarized assignments to academic suspension from the University.

## Accessibility Needs

The University of Toronto is committed to accessibility. If you require accommodations for a disability, or have any accessibility concerns about the course, the classroom or course materials, please contact Accessibility Services as soon as possible: <https://www.utsc.utoronto.ca/ability/welcome-accessability-services>
