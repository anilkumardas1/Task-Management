//isloggedin
export const isloggedin = () => {
    let data = localStorage.getItem("task_management");

    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

//dologin=>set localstorage
export const dologin = (data, next) => {
    localStorage.setItem("task_management", JSON.stringify(data));
    next();
}

//dologout => remove from localstorage
export const dologout = (next) => {
    localStorage.removeItem("task_management");
    //localStorage.removeItem("clockin");
    next()
}


//get curent user data
export const getLocalStroageData = () => {
    if (isloggedin()) {
        return JSON.parse(localStorage.getItem("task_management"));
    } else {
        return undefined;
    }
}




// get token from local stroage
export const getToken = () => {
    if (isloggedin()) {
        return JSON.parse(localStorage.getItem("task_management")).token
    } else {
        return null;
    }
}

