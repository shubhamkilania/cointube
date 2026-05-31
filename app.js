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
