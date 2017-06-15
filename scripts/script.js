    var users = [];

    $.getJSON("http://jsonplaceholder.typicode.com/users", function(json) {
        //console.log(json);

        users = json;

        //console.log(users);

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

        //document.write(table);
    }

    //  $.getJSON( "http://jsonplaceholder.typicode.com/users", function( data ) {
    //      console.log(data);
    //   var items = [];
    //   $.each( data, function( key, val ) {
    //     items.push( "<li id='" + key + "'>" + val + "</li>" );
    //   });

    //   $( "<ul/>", {
    //     "class": "my-new-list",
    //     html: items.join( "" )
    //   }).appendTo( "body" );
    // });


    function edit(id) {
        alert("edit image invoked" + id);

    }

    function deleteEntry(id) {
        alert("deleting: " + id);
        users.splice(id - 1, 1);
        createTable(users);
    }


    function createTableMarkup() {
        var retVal = "";
        retVal += "<tr><th>Actions</th><th>Name</th><th>Email</th><th>Phone</th><th>Website</th></tr>";
        return retVal;
    }

    function createEntryMarkup(entry, i) {
        var retVal = "";
        retVal += "<tr><td><img src=\"../res/img/edit.jpg\" id=\"editImg\" onclick=\"edit(" + entry.id + ")\"><img src=\"../res/img/delete.png\" id=\"editImg\" onclick=\"deleteEntry(" + i + ")\"></td><td>" + entry.name + "</td><td>" + entry.email + "</td><td>" + entry.phone + "</td><td>" + entry.website + "</td></tr>";
        return retVal;
    }