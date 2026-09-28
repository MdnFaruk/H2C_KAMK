function loadApp() {
    console.log("loading application");
  
    // Bind AJAX call to the click event of Button #load
    $('#load').click(function(event) {
      // TODO: Check what does event.preventDefault mean?
      event.preventDefault();
  
      // The server must be bind to localhost (for testing) as we don't have a FQDN or HTTP proxy available
      $.get("http://localhost:8080/api/v1/presidents", function(data) {
        console.log("Sending HTTP GET to server");
      })
      .done(function( data ) {
        console.log("response from server :", data);
        //TODO: the page is created below by going through every
        // every item from the loaded data.
        // Check manual for var value = document.getElementById()
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
        let presidents = document.getElementById('presidents').innerHTML = 
          '<table> \
          <tr> \
            <th>firstname</th> \
            <th>lastname</th> \
            <th>nickname</th> \
            <th>career</th> \
            <th>born</th> \
            <th>died</th> \
            <th>biography</th> \
            <th>img</th> \
          </tr>';
     
        data.forEach((element, index) => {
          presidents += '<tr>' + 
          '<td>' + element.firstname + '</td>' + 
          '<td>' + element.lastname + '</td>' +
          '<td>' + element.nickname + '</td>' +
          '<td>' + element.career + '</td>' +
          '<td>' + element.born + '</td>' +
          '<td>' + element.died + '</td>' +
          '<td><a href="' + element.biography + '">bio</a></td>' +
          '<td><img src="' + element.img + '"></td>' 
          + '</tr>'
          if(index == data.length) {
            presidents += '</table>';
          }
        });
  
        console.log("presidents", presidents);
  
        document.getElementById('presidents').innerHTML = presidents;
      })
      .fail(function(err) {
        console.log("error");
      })
      .always(function() {
        console.log("finished");
      });
    });
  }