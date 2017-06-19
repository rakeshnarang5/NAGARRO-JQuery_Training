    var users = [];
    var defaultUsers = [];

    $.getJSON("http://jsonplaceholder.typicode.com/users", function(json) {
        if (users.length < 1) {
            users = json;
            defaultUsers = json;
        }
        createTable(users);
    })

    function createTable(json) {
        var table = "<table border=\"1px\">";
        table += createTableMarkup();
        for (var i = 0; i < json.length; i++) {
            table += createEntryMarkup(json[i], i + 1);
        }
        table += "</table>";
        $("#table_here").html(table);
        $("#currentlyEditing").val((users.length).toString());
        saveState();
    }

    function saveState() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function edit(id) {
        document.getElementById("overlay").style.display = "block";
        // $("#overlay").attr("style","display:block;");
       $("#btnSave").attr("value",id.toString());
        // $("#currentlyEditing").val(id.toString());
        $("#username").val(users[id].name);
        $("#emailId").val(users[id].email);
        $("#phoneno").val(users[id].phone);
        $("#website").val(users[id].website);
    }

    function deleteEntry(id) {
        var sure = confirm("Are you sure you want to delete this entry?");
        if (sure) {
            users.splice(id - 1, 1);
            createTable(users);
        } 
    }

    function createTableMarkup() {
        var retVal = "";
        retVal += "<tr><th>Actions</th><th>Name</th><th>Email</th><th>Phone</th><th>Website</th></tr>";
        return retVal;
    }

    function createEntryMarkup(entry, i) {
        var retVal = "";
        retVal += "<tr><td><div class=\"btnEdit\" id=\"editImg\" onclick=\"edit(" + i + ")\"></div><div class=\"btnDelete\" id=\"deleteImg\" onclick=\"deleteEntry("+ i +")\"></div></td><td>" + entry.name + "</td><td>" + entry.email + "</td><td>" + entry.phone + "</td><td>" + entry.website + "</td></tr>";
        // retVal += "<tr><td><img src=\"../res/img/edit.jpg\" id=\"editImg\" onclick=\"edit(" + (i - 1) + ")\"><img src=\"../res/img/delete.png\" id=\"deleteImg\" onclick=\"deleteEntry(" + i + ")\"></td><td>" + entry.name + "</td><td>" + entry.email + "</td><td>" + entry.phone + "</td><td>" + entry.website + "</td></tr>";
        return retVal;
    }

    function resetFormFields() {
        $("#username").val("");
        $("#emailId").val("");
        $("#phoneno").val("");
        $("#website").val("");
    }

    $(document).ready(function() {

        users = JSON.parse(localStorage.getItem("users"));

        $("#btnAdd").click(function() {
            $("#btnSave").attr("value",(users.length).toString());
            // $("#currentlyEditing").val((users.length).toString());
            document.getElementById("overlay").style.display = "block";
        });

        $("#btnClose").click(function(e) {
            document.getElementById("overlay").style.display = "none";
            resetFormFields();
            e.preventDefault();
        });


        $("#btnSave").click(function(e) {
            $username = $("#username").val();
            $emailId = $("#emailId").val();
            $phoneno = $("#phoneno").val();
            $website = $("#website").val();
            $currentlyEditing = $("#btnSave").attr("value");
            //$("#currentlyEditing").val();

            if ($username === "") {
                alert("username can't be blank");
                return;
            }

            if ($emailId === "") {
                alert("email id can't be blank");
                return;
            }

            if ($currentlyEditing < users.length) {
                users[$currentlyEditing].name = $username;
                users[$currentlyEditing].email = $emailId;
                users[$currentlyEditing].phoneno = $phoneno;
                users[$currentlyEditing].website = $website;
            } else {
                var newuser = {
                    id: users.length + 1,
                    name: $username,
                    username: null,
                    email: $emailId,
                    address: null,
                    phone: $phoneno,
                    website: $website,
                    company: null
                }
                users.push(newuser);
            }

            createTable(users);
            resetFormFields();
            e.preventDefault();
            document.getElementById("overlay").style.display = "none";
        });
    });