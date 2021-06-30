export const formatUnit = (unit, isShowed = false) => {
    console.log(unit);
    switch (unit) {
        case "percent":
            return '%'        
        default:
            return 'hour'
    }
}
