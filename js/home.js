if (!localStorage.getItem('session')) {
    window.location.replace("login.html");
}

function logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    location.href = 'login.html';
}

function actionToggle() {
    let action = document.querySelector('.action');
    if (action) action.classList.toggle('active');
}

window.onload = function() {
    let user = JSON.parse(localStorage.getItem('user'));
    let innerHTML = `
    <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
        <div class="form">
        <h3>My Tasks</h3>
    `;
    let id = 0;
    if (user) {
        for (const task of user.tasks) {
            if (task['status'] == "in progress") innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_task(` + id + `)">
                <i></i>
            </label>`;
            else innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_task(` + id + `)" checked>
                <i></i>
            </label>`;

            innerHTML += `
            <div class="content">
                <h2 class="rank"><small>#</small>` + task['status'] + `</h2>
                <h4>` + task['title'] + `</h4>
                <p>` + task['description'] + `</p>
            </div>
        </div>
        `;
            id++;
        }
    }
    innerHTML += `
            <div class="box-clock">
                <div id="dycalendar"></div>
                </div>
        </div>
        <div class="action" onclick="actionToggle();">
            <span>+</span>
                <ul>
                    <li><img src="img/task.png" alt="" onclick="task_form()"></li>
                    <li><img src="img/event.png" alt="" onclick="event_form()"></li>
                    <li><img src="img/goal.png" alt="" onclick="goal_form()"></li>
                    <li><img src="img/reminder.png" alt="" onclick="reminder_form()"></li>
                </ul>
        </div>
    </div>
        `;

    document.getElementById('main-body').innerHTML = innerHTML;

    dycalendar.draw({
        target: '#dycalendar',
        type: 'month',
        dayformat: 'full',
        highlighttargetdate: true,
        prevnextbutton: 'show'
    })

}

/****** Tasks Functions ******/

function add_task() {
    //get elements
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;

    //check if all the fields are filled
    if (!title || !date) {
        alert("Title and date are mandatory for your tasks!");
        return;
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let tasks = [];
    tasks = user.tasks;

    var newtask = { 'title': title, 'date': date, 'description': description, 'status': 'in progress' };

    tasks.push(newtask);

    console.log(tasks);

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.tasks = [];
            u.tasks = tasks;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            tasks_home();
            return;
        }
    });

}

function task_form() {
    const parentEl = document.getElementById('main-body').innerHTML = `
        <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
            <div class="form">
                <h3>New Task</h3>
                <form action="">
                    <div class="inputBox">
                        <input type="text" id="title" placeholder="Title">
                    </div>
                    <div class="inputBox">
                        <input type="date" id="date">
                    </div>
                    <div class="inputBox">
                        <textarea id="description" cols="20" rows="5" placeholder="Describe your task here..."></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="add-action" onclick="add_task();">
        <span><img src="img/add.png"></span>
    </div>
    <div class="cancel-action" onclick="tasks_home();">
        <span><img src="img/cancel.png"></span>
    </div>
    </div>
    `
}

function complete_task(id) {
    let i = 0;
    let user = JSON.parse(localStorage.getItem('user'));

    for (var task of user.tasks) {
        if (i == id) {
            if (task['status'] == "done") task['status'] = "in progress";
            else task['status'] = "done";
            break;
        }
        i++;
    }

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.tasks = [];
            u.tasks = user.tasks;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            tasks_home();
            return;
        }
    });
}

function tasks_home() {
    window.location.replace("home.html");
}

/****** Events Functions ******/

function event_form() {
    const parentEl = document.getElementById('main-body').innerHTML = `
        <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
            <div class="form">
                <h3>New Event</h3>
                <form action="">
                    <div class="inputBox">
                        <input type="text" id="title" placeholder="Title">
                    </div>
                    <div class="inputBox">
                        <input type="date" id="date">
                    </div>
                    <div class="inputBox">
                        <textarea id="description" cols="20" rows="5" placeholder="Describe your event here..."></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="add-action" onclick="add_event();">
        <span><img src="img/add.png"></span>
    </div>
    <div class="cancel-action" onclick="events_home();">
        <span><img src="img/cancel.png"></span>
    </div>
    </div>
    `
}

function add_event() {
    //get elements
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;

    //check if all the fields are filled
    if (!title || !date) {
        alert("Title and date are mandatory for your events!");
        return;
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let events = [];
    events = user.events;

    var newevent = { 'title': title, 'date': date, 'description': description, 'status': 'scheduled' };

    events.push(newevent);

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.events = [];
            u.events = events;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            events_home();
            return;
        }
    });
}

function events_home() {
    let user = JSON.parse(localStorage.getItem('user'));
    let innerHTML = `
    <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
        <div class="form">
        <h3>My Events</h3>
    `;
    let id = 0;
    if (user) {
        for (const event of user.events) {
            if (event['status'] == "scheduled") innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_event(` + id + `)">
                <i></i>
            </label>`;
            else innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_event(` + id + `)" checked>
                <i></i>
            </label>`;

            innerHTML += `
            <div class="content">
                <h2 class="rank"><small>#</small>` + event['status'] + `</h2>
                <h4>` + event['title'] + `</h4>
                <p>` + event['description'] + `</p>
            </div>
        </div>
        `;
            id++;
        }
    }
    innerHTML += `
            <div class="box-clock">
                <div id="dycalendar"></div>
                </div>
            </div>
            <div class="action" onclick="actionToggle();">
                <span>+</span>
                <ul>
                    <li><img src="img/task.png" alt="" onclick="task_form()"></li>
                    <li><img src="img/event.png" alt="" onclick="event_form()"></li>
                    <li><img src="img/goal.png" alt="" onclick="goal_form()"></li>
                    <li><img src="img/reminder.png" alt="" onclick="reminder_form()"></li>
                </ul>
            </div>
        </div>
        `;

    document.getElementById('main-body').innerHTML = innerHTML;

    dycalendar.draw({
        target: '#dycalendar',
        type: 'month',
        dayformat: 'full',
        highlighttargetdate: true,
        prevnextbutton: 'show'
    })
}

function complete_event(id) {
    let i = 0;
    let user = JSON.parse(localStorage.getItem('user'));

    for (var event of user.events) {
        if (i == id) {
            if (event['status'] == "attended") event['status'] = "scheduled";
            else event['status'] = "attended";
            break;
        }
        i++;
    }

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.events = [];
            u.events = user.events;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            events_home();
            return;
        }
    });
}

/****** Goals Functions ******/

function goal_form() {
    const parentEl = document.getElementById('main-body').innerHTML = `
        <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
            <div class="form">
                <h3>New Goal</h3>
                <form action="">
                    <div class="inputBox">
                        <input type="text" id="title" placeholder="Title">
                    </div>
                    <div class="inputBox">
                        <input type="date" id="date">
                    </div>
                    <div class="inputBox">
                        <textarea id="description" cols="20" rows="5" placeholder="Describe your goal here..."></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="add-action" onclick="add_goal();">
        <span><img src="img/add.png"></span>
    </div>
    <div class="cancel-action" onclick="goals_home();">
        <span><img src="img/cancel.png"></span>
    </div>
    </div>
    `
}

function add_goal() {
    //get elements
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;

    //check if all the fields are filled
    if (!title || !date) {
        alert("Title and date are mandatory for your goals!");
        return;
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let goals = [];
    goals = user.goals;

    var newgoal = { 'title': title, 'date': date, 'description': description, 'status': 'in progress' };

    goals.push(newgoal);

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.goals = [];
            u.goals = goals;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            goals_home();
            return;
        }
    });
}

function goals_home() {
    let user = JSON.parse(localStorage.getItem('user'));
    let innerHTML = `
    <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
        <div class="form">
        <h3>My Goals</h3>
    `;
    let id = 0;
    if (user) {
        for (const goal of user.goals) {
            if (goal['status'] == "in progress") innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_goal(` + id + `)">
                <i></i>
            </label>`;
            else innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_goal(` + id + `)" checked>
                <i></i>
            </label>`;

            innerHTML += `
            <div class="content">
                <h2 class="rank"><small>#</small>` + goal['status'] + `</h2>
                <h4>` + goal['title'] + `</h4>
                <p>` + goal['description'] + `</p>
            </div>
        </div>
        `;
            id++;
        }
    }
    innerHTML += `
            <div class="box-clock">
                <div id="dycalendar"></div>
                </div>
            </div>
            <div class="action" onclick="actionToggle();">
                <span>+</span>
                <ul>
                    <li><img src="img/task.png" alt="" onclick="task_form()"></li>
                    <li><img src="img/event.png" alt="" onclick="event_form()"></li>
                    <li><img src="img/goal.png" alt="" onclick="goal_form()"></li>
                    <li><img src="img/reminder.png" alt="" onclick="reminder_form()"></li>
                </ul>
            </div>
        </div>
        `;

    document.getElementById('main-body').innerHTML = innerHTML;

    dycalendar.draw({
        target: '#dycalendar',
        type: 'month',
        dayformat: 'full',
        highlighttargetdate: true,
        prevnextbutton: 'show'
    })
}

function complete_goal(id) {
    let i = 0;
    let user = JSON.parse(localStorage.getItem('user'));

    for (var goal of user.goals) {
        if (i == id) {
            if (goal['status'] == "achieved") goal['status'] = "in progress";
            else goal['status'] = "achieved";
            break;
        }
        i++;
    }

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.goals = [];
            u.goals = user.goals;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            goals_home();
            return;
        }
    });
}

/****** Reminders Functions ******/

function reminder_form() {
    const parentEl = document.getElementById('main-body').innerHTML = `
        <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
            <div class="form">
                <h3>New Reminder</h3>
                <form action="">
                    <div class="inputBox">
                        <input type="text" id="title" placeholder="Title">
                    </div>
                    <div class="inputBox">
                        <input type="date" id="date">
                    </div>
                    <div class="inputBox">
                        <textarea id="description" cols="20" rows="5" placeholder="Describe your reminder here..."></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="add-action" onclick="add_reminder();">
        <span><img src="img/add.png"></span>
    </div>
    <div class="cancel-action" onclick="reminders_home();">
        <span><img src="img/cancel.png"></span>
    </div>
    </div>
    `
}

function add_reminder() {
    //get elements
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;

    //check if all the fields are filled
    if (!title || !date) {
        alert("Title and date are mandatory for your reminders!");
        return;
    }

    let user = JSON.parse(localStorage.getItem('user'));
    let reminders = [];
    reminders = user.reminders;

    var newreminder = { 'title': title, 'date': date, 'description': description, 'status': 'scheduled' };

    reminders.push(newreminder);

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.reminders = [];
            u.reminders = reminders;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            reminders_home();
            return;
        }
    });
}

function complete_reminder(id) {
    let i = 0;
    let user = JSON.parse(localStorage.getItem('user'));

    for (var reminder of user.reminders) {
        if (i == id) {
            if (reminder['status'] == "scheduled") reminder['status'] = "expired";
            else reminder['status'] = "scheduled";
            break;
        }
        i++;
    }

    let users = JSON.parse(localStorage.getItem('users'));

    users.every(u => {
        if (u.username == user.username) {
            u.reminders = [];
            u.reminders = user.reminders;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('user', JSON.stringify(user));
            reminders_home();
            return;
        }
    });
}

function reminders_home() {
    let user = JSON.parse(localStorage.getItem('user'));
    let innerHTML = `
    <div class="container">
        <header>
            <a href="#" class="logo">TO DO DOO</a>
            <ul>
                <li><a id="myLink" href="#" onclick="logout();return false;">Log Out</a></li>
            </ul>
        </header>
        <ul class="thumb">
            <li><img src="img/task.png" onclick="tasks_home()"></li>
            <li><img src="img/event.png" onclick="events_home()"></li>
            <li><img src="img/goal.png" onclick="goals_home()"></li>
            <li><img src="img/reminder.png" onclick="reminders_home()"></li>
        </ul>
        <div class="box">
        <div class="form">
        <h3>My Reminders</h3>
    `;
    let id = 0;
    if (user) {
        for (const reminder of user.reminders) {
            if (reminder['status'] == "scheduled") innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_reminder(` + id + `)">
                <i></i>
            </label>`;
            else innerHTML += `
        <div class="list">
            <label>
                <input type="checkbox" id="` + id + `" onclick="complete_reminder(` + id + `)" checked>
                <i></i>
            </label>`;

            innerHTML += `
            <div class="content">
                <h2 class="rank"><small>#</small>` + reminder['status'] + `</h2>
                <h4>` + reminder['title'] + `</h4>
                <p>` + reminder['description'] + `</p>
            </div>
        </div>
        `;
            id++;
        }
    }
    innerHTML += `
            <div class="box-clock">
                <div id="dycalendar"></div>
                </div>
            </div>
            <div class="action" onclick="actionToggle();">
                <span>+</span>
                <ul>
                    <li><img src="img/task.png" alt="" onclick="task_form()"></li>
                    <li><img src="img/event.png" alt="" onclick="event_form()"></li>
                    <li><img src="img/goal.png" alt="" onclick="goal_form()"></li>
                    <li><img src="img/reminder.png" alt="" onclick="reminder_form()"></li>
                </ul>
            </div>
        </div>
        `;

    document.getElementById('main-body').innerHTML = innerHTML;

    dycalendar.draw({
        target: '#dycalendar',
        type: 'month',
        dayformat: 'full',
        highlighttargetdate: true,
        prevnextbutton: 'show'
    })
}