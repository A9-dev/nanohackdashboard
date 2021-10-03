
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
$.getJSON('https://roomify.electrokid.co.uk/api/dashboard-data', function (data) {
    // JSON result in `data` variable
    console.log(data["rooms"]);
    var roomCount = Object.keys(data["rooms"]).length;
    var htmlToReplace = "";
    for (let i = 0; i < roomCount; i++) {
        var table = ""
        for (let j = 0; j < data["rooms"][(i + 1).toString()]["barcodes"].length; j++) {
            const e = data["rooms"][(i + 1).toString()]["barcodes"][j];
            table = table + `<tr>
            <th scope="row">${j + 1}</th>
            <td colspan="2">${e}</td>

        </tr>`
        }
        var coolNumber = numberToWords.toWords(i + 1).capitalize()
        htmlToReplace = htmlToReplace + `<div class="accordion-item">
        <h2 class="accordion-header" id="heading${coolNumber}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${coolNumber}" aria-expanded="true" aria-controls="collapse${coolNumber}">
                Room #${i + 1}
            </button>
        </h2>
        <div id="collapse${coolNumber}" class="accordion-collapse collapse" aria-labelledby="heading${coolNumber}"
            data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Barcode</th>

                        </tr>
                    </thead>
                    <tbody>
                       ${table}
                    </tbody>
                </table>
            </div>
        </div>
    </div>`
        $("div.accordion").html(htmlToReplace)
    }

});