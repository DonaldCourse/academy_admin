export const formatDate = (date, isShowed = false) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    if (isShowed) {
        return [day, month, year].join('/');
    }
    return [year, month, day].join('-');
}

export const formatTime = (date) => {
    var d = new Date(date),
        hour = '' + d.getHours(),
        minute = '' + d.getMinutes(),
        second = '' + d.getSeconds();

    if (hour.length < 2) 
        hour = '0' + hour;
    if (minute.length < 2) 
        minute = '0' + minute;
    if (second.length < 2) 
        second = '0' + second;
    return [hour, minute, second].join(':');
}

export const formatDateTime = (date) => {
    return formatTime(date) + ' ' + formatDate(date, true);
}

export const formatValidDateForDate = (date) => {
    var dateArr = date.split("/");
    return  dateArr.reverse().join("-");
}

export const convertTimeStampFromPicker = (date, changeDays = 0, type) => {
    date = new Date(formatValidDateForDate(date) + 'T00:00:00');

    switch (type) {
        case 'add': {
            date = date.setDate(date.getDate()  + changeDays);
            return date / 1000;
        }
        case 'minus': {
            date = date.setDate(date.getDate()  - changeDays);
            return date / 1000;
        }
        default: 
            break;
    }

    return date.getTime() / 1000;
}