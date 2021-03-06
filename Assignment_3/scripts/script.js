    var users = [];
    var defaultUsers = [];

    $.getJSON("http://jsonplaceholder.typicode.com/users", function(json) {
        if (users.length < 1) {
            users = json;
            defaultUsers = json;
        }
        createTable(users);
    })

    // creates table and sets it to the #table_here div
    function createTable(json) {
        var table = "<table border=\"1px\">";
        table += createTableMarkup();
        for (var i = 0; i < json.length; i++) {
            table += createEntryMarkup(json[i], i + 1);
        }
        table += "</table>";
        $("#table_here").html(table);
        $("#btnSave").attr("value", (users.length).toString());
        saveState();
    }

    // saves current state of the table in localstorage
    function saveState() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // this function executes when edit button is clicked
    function edit(id) {
        id--;
        $("#overlay").attr("style", "display:block;");
        $("#btnSave").attr("value", id.toString());
        $("#username").val(users[id].name);
        $("#emailId").val(users[id].email);
        $("#phoneno").val(users[id].phone);
        $("#website").val(users[id].website);
    }

    // this method executes  when delete button is clicked
    function deleteEntry(id) {
        var sure = confirm("Are you sure you want to delete this entry?");
        if (sure) {
            users.splice(id - 1, 1);
            createTable(users);
        }
    }

    // table's header is created
    function createTableMarkup() {
        var retVal = "";
        retVal += "<tr><th>Actions</th><th>Name</th><th>Email</th><th>Phone</th><th>Website</th></tr>";
        return retVal;
    }

    // markup for each entry is created here
    function createEntryMarkup(entry, i) {
        var retVal = "";
        retVal += "<tr><td><div class=\"btnEdit\" id=\"editImg\" onclick=\"edit(" + i + ")\"></div><div class=\"btnDelete\" id=\"deleteImg\" onclick=\"deleteEntry(" + i + ")\"></div></td><td>" + entry.name + "</td><td>" + entry.email + "</td><td>" + entry.phone + "</td><td>" + entry.website + "</td></tr>";
        return retVal;
    }

    // all fields of the form are reset to default value by this function
    function resetFormFields() {
        $("#username").val("");
        $("#emailId").val("");
        $("#phoneno").val("");
        $("#website").val("");
    }

    $(document).ready(function() {

        users = JSON.parse(localStorage.getItem("users"));

        // email validation
        function validateEmail($email) {
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test($email);
        }

        // web url validation
        function validateURL($website) {
            var urlReg = /[www]?\..*?\.(com|net|org)/;
            return urlReg.test($website);
        }

        $("#btnAdd").click(function() {
            $("#btnSave").attr("value", (users.length).toString());
            $("#overlay").attr("style", "display:block;");

        });

        $("#btnClose").click(function(e) {
            $("#overlay").attr("style", "display:none;");
            resetFormFields();
            e.preventDefault();
        });


        $("#btnSave").click(function(e) {
            $username = $("#username").val();
            $emailId = $("#emailId").val();
            $phoneno = $("#phoneno").val();
            $website = $("#website").val();
            $currentlyEditing = $("#btnSave").attr("value");

            if (!$username) {
                alert("username can't be blank");
            } else if (!validateEmail($emailId)) {
                alert("not a valid email");
            } else if ($phoneno.length !== 10) {
                alert("phone number has to be exactly 10 digits");
            } else if (!validateURL($website)) {
                alert("not a valid url");
            } else {
                if ($currentlyEditing < users.length) {
                    users[$currentlyEditing].name = $username;
                    users[$currentlyEditing].email = $emailId;
                    users[$currentlyEditing].phone = $phoneno;
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
            }

            createTable(users);
            resetFormFields();
            e.preventDefault();
            $("#overlay").attr("style", "display:none;");
        });
    });