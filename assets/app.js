// A $( document ).ready() block.
$(document).ready(function() {
  console.log( "ready!" );

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBH-ZuBVEg-2rH0uXe3uegh2rN5h20uCR8",
    authDomain: "pars-8b45e.firebaseapp.com",
    databaseURL: "https://pars-8b45e.firebaseio.com",
    projectId: "pars-8b45e",
    storageBucket: "pars-8b45e.appspot.com",
    messagingSenderId: "937419290339"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

	$("#submit").on("click", function(event) {
		event.preventDefault();

		// prep item
		var item = $("#item").val().trim();
		// opening par
		var open = $("#open").val().trim();
		// mid-shift par
		var mid = $("#mid").val().trim();

		// Create local "temporary" object for prep item   
		var newItem = {     
			Item: item,     
      Open: open,
      Mid: mid
		};
		// console log to debug
		console.log(newItem);

		// Uploads employee data to the database   
		database.ref().push(newItem);

		// Clears all of the text-boxes   
		$("#item").val("");   
		$("#open").val("");   
		$("#mid").val("");   

	});

	// Create Firebase event for adding prep items to the database and a row in the html when a user adds an entry 
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {   
		console.log(childSnapshot.val());   
		// Store everything into a variable.   
		var item = childSnapshot.val().Item;   
		var open = childSnapshot.val().Open;   
		var mid = childSnapshot.val().Mid;   
	  
		// Add each prep items data into the table   
		$("#par-list > tbody").append("<tr><td class=\"col s4\">" + item + "</td><td class=\"col s3\">" + open + "</td><td class=\"col s1\"><i class=\"material-icons\">check_box_outline_blank</i></td><td class=\"col s3\">" + mid + "</td><td class=\"col s1\"><i class=\"material-icons\">check_box_outline_blank</i></td></tr>"); 
	});

  // //Generate PDF
  // function generatePDF() {
  //   window.scrollTo(0, 0);
 
  //   var pdf = new jsPDF('p', 'pt', [580, 630]);
 
  //   html2canvas($(".page1")[0], {
  //     onrendered: function(canvas) {
  //       document.body.appendChild(canvas);
  //       var ctx = canvas.getContext('2d');
  //       var imgData = canvas.toDataURL("image/png", 1.0);
  //       var width = canvas.width;
  //       var height = canvas.clientHeight;
  //       pdf.addImage(imgData, 'PNG', 20, 20, (width - 10), (height));
 
  //     }
  //   });
  //       // html2canvas($(".page2")[0], {
  //       //     allowTaint: true,
  //       //     onrendered: function(canvas) {
  //       //         var ctx = canvas.getContext('2d');
  //       //         var imgData = canvas.toDataURL("image/png", 1.0);
  //       //         var htmlH = $(".page2").height() + 100;
  //       //         var width = canvas.width;
  //       //         var height = canvas.clientHeight;
  //       //         pdf.addPage(580, htmlH);
  //       //         pdf.addImage(imgData, 'PNG', 20, 20, (width - 40), (height));
  //       //     }
  //       // });
  //       // html2canvas($(".page3")[0], {
  //       //     allowTaint: true,
  //       //     onrendered: function(canvas) {
  //       //         var ctx = canvas.getContext('2d');
  //       //         var imgData = canvas.toDataURL("image/png", 1.0);
  //       //         var htmlH = $(".page3").height() + 100;
  //       //         var width = canvas.width;
  //       //         var height = canvas.clientHeight;
  //       //         pdf.addPage(580, htmlH);
  //       //         pdf.addImage(imgData, 'PNG', 20, 20, (width - 40), (height));
  //       //     }
  //       // });
  //   setTimeout(function() {
 
  //     //jsPDF code to save file
  //     pdf.save('pizza-pars.pdf');
 
  //     //Generate BLOB object
  //     var blob = pdf.output("blob");
 
  //     //Getting URL of blob object
  //     var blobURL = URL.createObjectURL(blob);
 
  //     //Showing PDF generated in iFrame element
  //     var iframe = document.getElementById('sample-pdf');
  //     iframe.src = blobURL;
 
  //     //Setting download link
  //     var downloadLink = document.getElementById('pdf-download-link');
  //     downloadLink.href = blobURL;
  //   }, 2000);
  //  };
   
  //  generatePDF();

});