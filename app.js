let coins = 0;

function toggleMenu(){
    document.getElementById("sidebar")
    .classList.toggle("active");
}
function generateReferralCode(name){

    let cleanName = name
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase();

    let firstPart = cleanName.substring(0,5);

    let randomPart = Math.floor(
        100 + Math.random() * 900
    );

    return firstPart + randomPart;
}
const fullName = document.getElementById("fullName").value;

const referralCode = generateReferralCode(fullName);

console.log(referralCode);
function generateReferralCode(name){

    let firstPart = name
        .replace(/[^a-zA-Z]/g,"")
        .substring(0,5)
        .toUpperCase();

    let randomPart =
        Math.floor(1000 + Math.random()*9000);

    return firstPart + randomPart;
}

function registerUser(){

    alert(
        "Registration logic will be connected to Firebase next."
    );

}
