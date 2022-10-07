let user = prompt ("Enter your username: ");


let passSaved = "fran";


function login() {
    let enter = false;

    for (let i=3; i>0 ; i--) {
        let passUser = prompt ("Enter your password: ");
        if (passSaved === passUser) {
            alert ('Hi' + " " + user + ' ' + 'Welcome to RockiesBank!')
            enter = true;
            break;
        }
        else {
            alert ("You enter a wrong password.");
        }

    }
    return enter;
}



if (login ()){

    let score = parseInt (450);

    let option = prompt ("Choose the loan you are interested in: \n1 - Personal Loan \n2 - Mortgage Loan \nPress x to return to homepage");

    while (option !="X" && option !="x"){
        switch (option) {
            case "1":
                if (score >= 400){
                    alert ("You are eligible to apply for a Personal Loan, please present yourself in the bank with your id.");
                }else {
                    alert ("You do not have enough score to apply for a Personal Loan")
                }
                break;
            case "2":
                if (score >= 500){
                    alert ("You are eligible to apply for a Mortgage Loan, please present yourself in the bank with your id.");
                }else {
                    alert ("You do not have enough score to apply for a Mortgage Loan")
                }
                break;
            default:
                alert ("You choose a wrong option")
                break;
        }
        option = prompt ("Choose the loan you are interested in: \n1 - Personal Loan \n2 - Mortgage Loan \nPress x to return to homepage");
        
    }
}    
else {
        alert("Your account has been blocked");
    }
    


alert ("Thank you for choosing Rockies Bank!");
