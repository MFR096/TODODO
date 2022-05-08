class User{
    username;
    email;
    pswrd;
    tasks;
    events;
    goals;
    reminders;

    constructor(username, email, pswrd){
        this.username=username;
        this.email=email;
        this.pswrd=pswrd;
        this.tasks=[];
        this.events=[];
        this.goals=[];
        this.reminders=[];
    }

    get_Username(){
        return this.username;
    }

    get_Email(){
        return this.email;
    }

    get_Pswrd(){
        return this.pswrd;
    }

    set_pswrd(password){
        this.password = password;
    }

}