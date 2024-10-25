window.addEventListener("load", function () {
    visBilletter();

    const billettskjema = document.getElementById("billettskjema");

    billettskjema.addEventListener("submit", function (event) {
        event.preventDefault()
        billettRegistrering();


    })

}, false);

async function hentBilletter() {

    const respons = await axios.get("/hentAlleBilletter");
    return respons.data;

}

async function lagreBilletter(billett) {
    axios.post("/lagre", billett).then(function () {
        visBilletter();
    });
}

function billettRegistrering() {

    const filmInn = document.getElementById("filmer").value;
    const antallInn = document.getElementById("antall").value;
    const fornavnInn = document.getElementById("fornavn").value;
    const etternavnInn = document.getElementById("etternavn").value;
    const telefonInn = document.getElementById("telefonnr").value;
    const epostInn = document.getElementById("epost").value;

    if (antallValidering(antallInn, "feilmeldingAntall") &&
        tekstValidering(fornavnInn, "feilmeldingFornavn") &&
        tekstValidering(etternavnInn, "feilmeldingEtternavn") &&
        telefonValidering(telefonInn, "feilmeldingTelefon") &&
        tekstValidering(epostInn, "feilmeldingEpost")) {

        const billett = {
            film: filmInn,
            antall: antallInn,
            fornavn: fornavnInn,
            etternavn: etternavnInn,
            telefonnr: telefonInn,
            epost: epostInn
        };

        lagreBilletter(billett);
        fjernFeilmeldinger();
        tomSkjema();


    }
}

async function visBilletter() {

    const billettTabel = await hentBilletter();
    console.log(billettTabel);

    tomTabellen()
    const tabelBody = document.getElementById("billettTabell");
    billettTabel.forEach(billett => {
        const rad = document.createElement("tr");

        const filmKolonne = document.createElement("th");
        filmKolonne.textContent = billett.film;

        const antallKolonne = document.createElement("th");
        antallKolonne.textContent = billett.antall;

        const navnKolonne = document.createElement("th");
        navnKolonne.textContent = billett.fornavn + " " + billett.etternavn;

        const telefonKolonne = document.createElement("th");
        telefonKolonne.textContent = billett.telefonnr;

        const epostKolonne = document.createElement("th");
        epostKolonne.textContent = billett.epost;

        rad.appendChild(filmKolonne);
        rad.appendChild(antallKolonne);
        rad.appendChild(navnKolonne);
        rad.appendChild(telefonKolonne);
        rad.appendChild(epostKolonne);

        tabelBody.appendChild(rad);


    })
}

function tekstValidering(valideringstekst, feilmeldingsDiv) {

    if (valideringstekst.trim().length === 0) {
        document.getElementById(feilmeldingsDiv).innerText = "Du må skrive noe i feltet"
        return false;
    }
    return true;

}

function antallValidering(antall, feilmeldingsDiv) {
    if (isNaN(antall) || antall.length === 0) {
        document.getElementById(feilmeldingsDiv).innerText = "Du må skrive inn et tall mellom 1 og 10"
        return false;

    }
    if (antall >= 10 && antall < 1) {
        document.getElementById(feilmeldingsDiv).innerText = "Du kan kjøpe  fra 1 opp til 10 billetter"
        return false;
    }
    return true;


}

function telefonValidering(telefonNr, feilmeldingsDiv) {
    if (isNaN(telefonNr)) {
        document.getElementById(feilmeldingsDiv).innerText = "Du må skrive inn telefonnr bestående kun av tall"
        return false;
    }
    if (telefonNr.trim().length !== 8) {
        document.getElementById(feilmeldingsDiv).innerText = "Du må skrive telefonnr med 8 sifre"
        return false;
    }
    return true;
}

function fjernFeilmeldinger() {
    document.getElementById("feilmeldingAntall").innerText = "";
    document.getElementById("feilmeldingFornavn").innerText = "";
    document.getElementById("feilmeldingEtternavn").innerText = "";
    document.getElementById("feilmeldingTelefon").innerText = "";
    document.getElementById("feilmeldingEpost").innerText = "";
}

function tomSkjema() {
    document.getElementById("filmer").value = "Velg film her"
    document.getElementById("antall").value = "";
    document.getElementById("fornavn").value = "";
    document.getElementById("etternavn").value = "";
    document.getElementById("telefonnr").value = "";
    document.getElementById("epost").value = "";


}

function tomTabellen() {
    const tabelBody = document.getElementById("billettTabell");
    while (tabelBody.firstChild) {
        tabelBody.removeChild(tabelBody.firstChild)
    }
}

async function slettAlleBilletter() {
    await axios.delete("/slettAlleBilletter");
    tomTabellen()

}
