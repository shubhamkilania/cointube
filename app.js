let coins = 0;

function toggleMenu(){
    document.getElementById("sidebar")
    .classList.toggle("active");
}
referredBy = "SHUBH1411";

function generateReferralCode(name){

    let firstPart = name
        .substring(0,4)
        .toUpperCase();

    let randomPart = Math.floor(
        1000 + Math.random() * 9000
    );

    return firstPart + randomPart;
}

const OWNER_REFERRAL = "SHUBH1411";

if(referralInput === "SHUBH1411"){

    newUserCoins += 100;

    ownerCoins += 50;

}
