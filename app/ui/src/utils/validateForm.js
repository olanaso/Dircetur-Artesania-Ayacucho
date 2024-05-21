
export function  validarHTML5  (pidform, pFunction){

    var isvalidate = $("#" + pidform)[0].checkValidity();
    if (isvalidate) {
        pFunction()
    } else {
        return isvalidate
    }

}