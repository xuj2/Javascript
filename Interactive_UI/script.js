url = "http://flip3.engr.oregonstate.edu:7495/"

window.onload = loadTable();

function loadTable() {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            makeTable(response.rows);
        }
    });
    req.send(null);
}

document.getElementById("submit").addEventListener("click", function(e) {
    var req = new XMLHttpRequest();
    var name = document.getElementById("name").value;
    var reps = document.getElementById("reps").value;
    var weight = document.getElementById("weight").value;
    var date = document.getElementById("date").value;
    var radio = document.getElementsByName("unit");
    var unit;
    if (radio[0].checked) {
        unit = 0;
    } else {
        unit = 1;
    }
    if (name.length == 0 || reps.length == 0 || weight.length == 0 || date.length == 0) {
        return ;
    }
    var request = JSON.stringify({"name": name, "reps": reps, "weight": weight, "unit": unit, "date": date});
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            addRow(response.rows[response.rows.length - 1]);
        };
    })
    req.send(request);
    event.preventDefault();
})

document.getElementById("reset").addEventListener("click", function() {
    var req =  new XMLHttpRequest();
    req.open("GET", url + "reset-table", false);
    req.send(null);
})

table = document.getElementsByTagName("table")[0];
table.addEventListener("click", function(event) {
    var target = event.target;
    if (target.id == "update") {
        updateRow(target.parentElement.children);
    } else if (target.id == "delete") {
        deleteRow(target.parentElement.children);
    } else {
        return ;
    }
});

function updateRow(row) {
    window.location.href = "http://web.engr.oregonstate.edu/~xuj2/update.html"
    localStorage.setItem("id", row[0].innerHTML);
    localStorage.setItem("name", row[1].innerHTML);
    localStorage.setItem("reps", row[2].innerHTML);
    localStorage.setItem("weight", row[3].innerHTML);
    localStorage.setItem("unit", row[4].innerHTML);
    localStorage.setItem("date", row[5].innerHTML);
}

function deleteRow(row) {
    var req = new XMLHttpRequest();
    var id = row[0].innerHTML;
    req.open("DELETE", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            removeRow(id);
            location.reload();
        };
    });
    req.send(JSON.stringify({"id": id}));
}

function addRow(row) {
    var tableRow = document.createElement("tr");
    var td0 = document.createElement("td");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var id = document.createTextNode(row.id);
    var name = document.createTextNode(row.name);
    var reps = document.createTextNode(row.reps);
    var weight = document.createTextNode(row.weight);
    var int = row.unit;
    var unit;
    if (int == 1) {
        unit = document.createTextNode("kgs");
    } else {
        unit = document.createTextNode("lbs");
    }
    var str = row.date.split("T");
    var date = document.createTextNode(str[0]);
    td0.appendChild(id);
    td1.appendChild(name);
    td2.appendChild(reps);
    td3.appendChild(weight);
    td4.appendChild(unit);
    td5.appendChild(date);
    tableRow.appendChild(td0);
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);
    tableRow.appendChild(td3);
    tableRow.appendChild(td4);
    tableRow.appendChild(td5);
    var update = document.createElement("button");
    update.id = "update";
    update.innerHTML = "Update";
    var del = document.createElement("button");
    del.id = "delete";
    del.innerHTML = "Delete";
    tableRow.appendChild(update);
    tableRow.appendChild(del);
    table.appendChild(tableRow);
}

function removeRow(id) {
    var children = table.children;
    console.log(children[1])
    for (var i = 1; i < children.length; i++) {
        if (children[i][0] == id) {
            table.deleteRow(i);
        }
    }
}

function makeTable(rows){
    for (var i = 0 in rows) {
        addRow(rows[i]);
    }
};
